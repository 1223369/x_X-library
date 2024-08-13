<script setup>
import Form from "@/components/Form/Form.vue";
import FormItem from "@/components/Form/FormItem.vue";
import Button from "@/components/Button/Button.vue";
import Input from "@/components/Input/Input.vue";
import { reactive } from "vue";

const model = reactive({
  email: "",
  password: "",
})

const rules = {
  email: [{ type: 'email', required: true, trigger: "blur" },{ type: 'string', required: true, trigger: "input" }],
  password: [{ type: 'string', required: true, trigger: "blur", min: 3, max: 5 }]
}
</script>

<template>
  <div>
    <Form :model="model" :rules="rules">
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
        <Button type="primary">Submit</Button>
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
