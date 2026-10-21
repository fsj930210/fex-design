<script setup lang="ts">
import { Tag, TagAction } from '@fex-design/vue/primitive/tag'
defineOptions({ name: 'TagSemanticStylesExample' })
</script>
<template>
  <Tag
    color="primary"
    class="border-dashed"
    :style="{
      maxWidth: 280,
      backgroundColor: '#f3e8ff',
      borderColor: '#9333ea',
      color: '#6b21a8',
      fontSize: 16,
      fontWeight: 700,
    }"
    >使用结构化样式定制的标签<TagAction
      aria-label="Close"
      class="hover:opacity-80 rounded text-violet-700 hover:bg-violet-200"
      :style="{
        marginInlineStart: 8,
        borderRadius: 999,
        backgroundColor: '#7e22ce',
        color: '#fff',
      }"
    ></TagAction
  ></Tag>
</template>
