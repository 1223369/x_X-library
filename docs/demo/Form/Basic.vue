<script setup>
import Form from "@/components/Form/Form.vue";
import FormItem from "@/components/Form/FormItem.vue";
import Button from "@/components/Button/Button.vue";
import Input from "@/components/Input/Input.vue";
import { reactive,ref } from "vue";

const model = reactive({
  email: "",
  password: "",
  confirPwd: ""
})

const formRef = ref()

const rules = {
  email: [{ type: 'email', required: true, trigger: "blur" }],
  password: [{ type: 'string', required: true, trigger: "blur", min: 3, max: 5 }],
  confirPwd: [{ type: 'string', required: true, trigger: "blur" }, {
    validator: (rule, value) => value === model.password, trigger: "blur", message: "两次密码输入不一致"
  }]
}

const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('pass!!')
  } catch (error) {
    console.log('error', error)
  }
}

const reset = () => {
  formRef.value.resetField()
}

</script>

<template>
  <div>
    <Form :model="model" :rules="rules" ref="formRef">
      <FormItem label="email" prop="email">
        <Input v-model="model.email"/>
      </FormItem>
      <FormItem label="password" prop="password">
        <Input v-model="model.password"/>
      </FormItem>
      <FormItem label="confirPwd" prop="confirPwd">
        <Input v-model="model.confirPwd"/>
      </FormItem>
      <div>
        <Button type="primary" @click.prevent="submit">Submit</Button>
        <Button @click.prevent="reset">Reset</Button>
      </div>
    </Form>
    <p>
      form value:
      <pre>{{ model }}</pre>
    </p>
  </div>
</template>

<style></style>
