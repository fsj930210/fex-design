<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@fex-design/vue/primitive/alert'
</script>

<template>
  <div class="grid w-full gap-3">
    <Alert
      class="[--alert-color:#6d28d9] [--alert-color-background:#f5f3ff] [--alert-color-border:#c4b5fd] [--alert-radius:12px]"
      ><AlertTitle
        class="[--alert-color:#6d28d9] [--alert-color-background:#f5f3ff] [--alert-color-border:#c4b5fd] [--alert-radius:12px]"
        >这是一条提示信息</AlertTitle
      ></Alert
    >
    <Alert
      class="[--alert-color:#6d28d9] [--alert-color-background:#f5f3ff] [--alert-color-border:#c4b5fd] [--alert-radius:12px]"
      ><AlertTitle
        class="[--alert-color:#6d28d9] [--alert-color-background:#f5f3ff] [--alert-color-border:#c4b5fd] [--alert-radius:12px]"
        >系统更新通知</AlertTitle
      ><AlertDescription
        class="[--alert-color:#6d28d9] [--alert-color-background:#f5f3ff] [--alert-color-border:#c4b5fd] [--alert-radius:12px]"
        >系统将在今晚进行例行维护，请提前保存正在编辑的内容。</AlertDescription
      ></Alert
    >
  </div>
</template>
