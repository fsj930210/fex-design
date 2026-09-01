<script setup lang="ts">
import { Tag, TagClose } from '@fex-design/vue/primitive/tag'
</script>
<template>
  <div class="flex flex-wrap items-center gap-2">
    <Tag size="sm">小型标签</Tag><Tag>默认标签</Tag><Tag size="lg">大型标签</Tag>
    <Tag color="primary">可关闭标签<TagClose aria-label="删除可关闭标签" /></Tag>
    <Tag disabled>禁用标签<TagClose disabled aria-label="删除禁用标签" /></Tag>
  </div>
</template>
