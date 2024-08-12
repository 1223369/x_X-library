<script setup>
  import Form from '@/components/Form/Form.vue';
  import FormItem from '@/components/Form/FormItem.vue';
  import Button from "@/components/Button/Button.vue";
  import Input from "@/components/Input/Input.vue";
</script>

<template>
  <div>
    <Form>
      <FormItem label="email">
        <Input />
      </FormItem>
      <FormItem label="password">
        <template #label="{ label }">
          <Button>{{ label }}</Button>
        </template>
        <Input />
      </FormItem>
      <div>
        <Button type="primary">Submit</Button>
        <Button>Reset</Button>
      </div>
    </Form>
  </div>
</template>

<style>
</style>

