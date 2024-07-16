<script setup lang="ts">
import { ref,onMounted,watch, computed, nextTick } from 'vue';
import type { MessageProps } from './types';
import RenderVnode from '../Common/RenderVnode';
import Icon from '../Icon/Icon.vue';
import { getLastBottomOffset } from './method';
import useEventListener  from '@/hooks/useEventListener';

const visible = ref(false);
const messageRef = ref<HTMLDivElement>();
// 计算偏移高度
const height = ref(0);
// 上一个实例的最下面的bottomOffset，第一个是0
const lastOffset = computed(() => getLastBottomOffset(props.id));
// 当前实例的topOffset
const topOffset = computed(() => props.offset + lastOffset.value)
// 这个元素为下一个元素预留的offset，也就是当前元素最低端bottomOffset的值
const bottomOffset = computed(() => topOffset.value + height.value)
// 根据值设置css
const cssStyle = computed(() => ({
  top: `${topOffset.value}px`,
  zIndex: props.zIndex
}))

// 组件挂载时
onMounted(async() => {
  visible.value = true;
  startTimer();
  await nextTick();
  height.value = messageRef.value!.getBoundingClientRect().height;
})

// 当visible为false时，销毁节点
watch(visible, (newValue) => {
  if (!newValue) {
    props.onDestory()
  }
})

// ToDo: 定时关闭message
function startTimer() {
  if (props.duration === 0) return;
  setTimeout(() => {
    visible.value = false;
  }, props.duration);
}

// 声明接受父组件的参数-withDefaults:设置props的默认值
const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
});

// 键盘触发事件
const keydown = (e: Event) => {
  const event = e as KeyboardEvent;
  if (event.code === 'Escape') {
    visible.value = false;
  }
}

// 监听键盘触发事件
useEventListener(document, 'keydown', keydown)

// 向外暴露属性
defineExpose({
  bottomOffset,
  visible,
})

</script>

<template>
  <div
    class="xx-message"
    v-show="visible"
    role="alert"
    ref="messageRef"
    :class="{
      [`xx-message--${type}`]: true,
      'is-colse': showClose
    }"
    :style="cssStyle"
  >
    <div class="xx-message__content">
      <slot>
        {{ offset }} - {{topOffset}} - {{ height }} - {{ bottomOffset }}
        <RenderVnode v-if="message" :vNode="message" />
      </slot>
    </div>
    <!-- 关闭按钮 -->
     <div class="xx-message__close" v-if="showClose">
      <Icon @click.stop="visible = false" icon="xmark"/>
     </div>
  </div>
</template>

<style>
  .xx-message {
    width: max-content;
    position: fixed;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    border: 1px solid blue;
  }
</style>