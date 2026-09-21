<script setup lang="ts">
import { Badge } from '@fex-design/vue/ui/badge'
import type { BadgeSize } from '@fex-design/core'

const sizes: readonly BadgeSize[] = ['sm', 'md', 'lg']
</script>

<template>
  <div class="grid gap-3">
    <div v-for="size in sizes" :key="size" class="flex items-center gap-4">
      <span class="w-6 text-sm text-muted-foreground">{{ size }}</span>
      <Badge :count="8" :size="size" />
      <Badge dot color="success" :size="size" />
    </div>
  </div>
</template>
