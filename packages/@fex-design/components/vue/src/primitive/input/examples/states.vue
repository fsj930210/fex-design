<script setup lang="ts">
import { InputControl, InputRoot } from '@fex-design/vue/primitive/input'
</script>
<template>
  <div class="grid w-full gap-3">
    <InputRoot disabled default-value="禁用"><InputControl /></InputRoot
    ><InputRoot read-only default-value="只读"><InputControl /></InputRoot
    ><InputRoot default-value="输入有误"><InputControl aria-invalid="true" /></InputRoot>
  </div>
</template>
