<script setup lang="ts">
import { Input } from '@fex-design/vue/ui/input'
</script>
<template>
  <div class="grid w-full gap-3">
    <Input placeholder="请输入内容" /><Input default-value="可清除内容" clearable />
  </div>
</template>
