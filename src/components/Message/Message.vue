<script setup lang="ts">
import { ref,onMounted,watch } from 'vue';
import type { MessageProps } from './types';
import RenderVnode from '../Common/RenderVnode';
import Icon from '../Icon/Icon.vue';

const visible = ref(false);

// 组件挂载时
onMounted(() => {
  visible.value = true;
  startTimer();
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
});

</script>

<template>
  <div
    class="xx-message"
    v-show="visible"
    role="alert"
    :class="{
      [`xx-message--${type}`]: true,
      'is-close': showClose
  }">
    <div class="xx-message__content">
      <slot>
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
