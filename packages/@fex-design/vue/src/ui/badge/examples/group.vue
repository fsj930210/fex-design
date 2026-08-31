<script setup lang="ts">
import { Badge, BadgeGroup } from '@fex-design/vue/ui/badge'
const items = ['Vue', 'React', 'Solid', 'Svelte', 'Angular']
</script>
<template>
  <BadgeGroup :max-count="3"
    ><Badge v-for="item in items" :key="item" color="info">{{ item }}</Badge></BadgeGroup
  >
</template>
