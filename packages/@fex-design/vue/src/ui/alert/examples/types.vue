<script setup lang="ts">
import { Alert } from '@fex-design/vue/ui/alert'
</script>

<template>
  <div class="grid w-full gap-3">
    <Alert type="success" show-icon title="操作成功" />
    <Alert type="info" show-icon title="信息提示" />
    <Alert type="warning" show-icon title="请注意当前配置" />
    <Alert type="error" show-icon title="操作失败" />
    <Alert show-icon title="自定义颜色" style="--alert-color:#7c3aed;--alert-color-background:#f5f3ff;--alert-color-border:#c4b5fd" />
  </div>
</template>
