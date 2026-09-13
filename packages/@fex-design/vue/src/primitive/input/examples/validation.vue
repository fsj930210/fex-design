<script setup lang="ts">
import { InputControl, InputRoot } from '@fex-design/vue/primitive/input'
</script>

<template>
  <div class="grid w-full gap-2">
    <InputRoot default-value="不完整的邮箱地址">
      <InputControl aria-invalid="true" aria-describedby="email-error" />
    </InputRoot>
    <p id="email-error" class="text-sm text-danger">请输入完整的邮箱地址。</p>
  </div>
</template>
