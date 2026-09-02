<script setup lang="ts">
import { Alert, AlertIcon, AlertTitle } from '@fex-design/vue/primitive/alert'
import { CircleCheckIcon } from '@fex-design/vue/icon/circle-check'
import { CircleErrorIcon } from '@fex-design/vue/icon/circle-error'
import { CircleInfoIcon } from '@fex-design/vue/icon/circle-info'
import { CircleWarningIcon } from '@fex-design/vue/icon/circle-warning'

const items = [
  { type: 'success', title: '操作成功', icon: CircleCheckIcon },
  { type: 'info', title: '信息提示', icon: CircleInfoIcon },
  { type: 'warning', title: '请注意当前配置', icon: CircleWarningIcon },
  { type: 'error', title: '操作失败', icon: CircleErrorIcon },
] as const
</script>

<template>
  <div class="grid w-full gap-3">
    <Alert v-for="item in items" :key="item.type" :type="item.type">
      <AlertIcon><component :is="item.icon" /></AlertIcon><AlertTitle>{{ item.title }}</AlertTitle>
    </Alert>
    <Alert style="--alert-color:#7c3aed;--alert-color-background:#f5f3ff;--alert-color-border:#c4b5fd">
      <AlertIcon><CircleInfoIcon /></AlertIcon><AlertTitle>自定义颜色</AlertTitle>
    </Alert>
  </div>
</template>
