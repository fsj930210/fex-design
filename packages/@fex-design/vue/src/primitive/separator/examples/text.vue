<script setup lang="ts">
import { Separator } from '@fex-design/vue/primitive/separator'
const items = [
  ['Workspace', 'Fex Design'],
  ['Plan', 'Team'],
  ['Region', 'Asia Pacific'],
]
</script>
<template>
  <div class="grid w-full max-w-xl gap-4">
      <div
        v-for="placement in ['Start', 'Center', 'End']"
        :key="placement"
        class="flex items-center gap-2"
      >
        <Separator :class="placement === 'Start' ? 'w-12' : 'flex-1'" /><span
          class="shrink-0 text-sm text-muted-foreground"
          >{{ placement }}</span
        ><Separator :class="placement === 'End' ? 'w-12' : 'flex-1'" />
      </div></div
  >
</template>
