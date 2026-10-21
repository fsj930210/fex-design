<script setup lang="ts">
import { Alert } from '@fex-design/vue/ui/alert'
</script>

<template>
  <div class="grid w-full gap-3">
    <Alert
      class="[--alert-color:#6d28d9] [--alert-color-background:#f5f3ff] [--alert-color-border:#c4b5fd] [--alert-radius:12px]"
      title="这是一条提示信息"
    />
    <Alert
      class="[--alert-color:#6d28d9] [--alert-color-background:#f5f3ff] [--alert-color-border:#c4b5fd] [--alert-radius:12px]"
      title="系统更新通知"
      description="系统将在今晚进行例行维护，请提前保存正在编辑的内容。"
    />
  </div>
</template>
