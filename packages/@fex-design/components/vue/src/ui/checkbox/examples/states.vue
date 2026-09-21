<script setup lang="ts">
import { Checkbox, CheckboxGroup } from '@fex-design/vue/ui/checkbox'
</script>

<template>
  <div class="grid gap-3">
    <Checkbox>未选中</Checkbox><Checkbox default-checked>已选中</Checkbox
    ><Checkbox indeterminate>中间状态</Checkbox><Checkbox disabled>禁用</Checkbox
    ><Checkbox default-checked disabled>禁用且已选中</Checkbox>
  </div>
</template>
