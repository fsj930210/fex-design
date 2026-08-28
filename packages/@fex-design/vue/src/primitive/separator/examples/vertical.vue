<script setup lang="ts">
import { Separator } from '@fex-design/vue/primitive/separator'
const items = [
  ['Workspace', 'Fex Design'],
  ['Plan', 'Team'],
  ['Region', 'Asia Pacific'],
]
</script>
<template>
  <div class="flex w-full justify-center h-5 items-center gap-2">
      <span>Blog</span><Separator orientation="vertical" /><span>Docs</span
      ><Separator orientation="vertical" /><span>Source</span>
    </div>
</template>
