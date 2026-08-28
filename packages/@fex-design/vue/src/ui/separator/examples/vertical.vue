<script setup lang="ts">
import { Separator } from '@fex-design/vue/ui/separator'
import Card from '@fex-design/vue/ui/card'
const items = [
  ['Workspace', 'Fex Design'],
  ['Plan', 'Team'],
  ['Region', 'Asia Pacific'],
]
</script>
<template>
  <Card title="Vertical" description="Use vertical separators between compact inline items."
    ><div class="flex h-5 items-center gap-2">
      <span>Blog</span><Separator orientation="vertical" /><span>Docs</span
      ><Separator orientation="vertical" /><span>Source</span>
    </div></Card
  >
</template>
