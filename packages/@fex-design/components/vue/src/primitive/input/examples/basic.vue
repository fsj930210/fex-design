<script setup lang="ts">
import { InputClear, InputControl, InputRoot } from '@fex-design/vue/primitive/input'
</script>
<template>
  <div class="grid w-full gap-3">
    <InputRoot><InputControl placeholder="请输入内容" /></InputRoot
    ><InputRoot default-value="可清除内容"><InputControl /><InputClear /></InputRoot>
  </div>
</template>
