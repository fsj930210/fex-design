<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@fex-design/vue/primitive/alert'
</script>

<template>
  <div class="grid w-full gap-3">
    <Alert><AlertTitle>这是一条提示信息</AlertTitle></Alert>
    <Alert><AlertTitle>系统更新通知</AlertTitle><AlertDescription>系统将在今晚进行例行维护，请提前保存正在编辑的内容。</AlertDescription></Alert>
  </div>
</template>
