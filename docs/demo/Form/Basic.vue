<script setup>
import Form from "@/components/Form/Form.vue";
import FormItem from "@/components/Form/FormItem.vue";
import Button from "@/components/Button/Button.vue";
import Input from "@/components/Input/Input.vue";
import { reactive,ref } from "vue";

const model = reactive({
  email: "",
  password: "",
})

const formRef = ref()

const rules = {
  email: [{ type: 'email', required: true, trigger: "blur" },{ type: 'string', required: true, trigger: "input" }],
  password: [{ type: 'string', required: true, trigger: "blur", min: 3, max: 5 }]
}

const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('pass!!')
  } catch (error) {
    console.log('error', error)
  }
}

</script>

<template>
  <div>
    <Form :model="model" :rules="rules" ref="formRef">
      <FormItem label="email" prop="email">
        <Input v-model="model.email"/>
      </FormItem>
      <FormItem label="password" prop="password">
        <template #label="{ label }">
          <Button>{{ label }}</Button>
        </template>
        <Input v-model="model.password"/>
      </FormItem>

      <div>
        <Button type="primary" @click.prevent="submit">Submit</Button>
        <Button>Reset</Button>
      </div>
    </Form>
    <p>
      form value:
      <pre>{{ model }}</pre>
    </p>
  </div>
</template>

<style></style>
