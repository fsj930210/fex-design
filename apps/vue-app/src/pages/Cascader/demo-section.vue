<script setup lang="ts">
import Card from '@fex-design/vue/ui/card'
defineProps<{ title: string; description: string }>()
</script>
<template>
  <Card :title="title" :description="description"
    ><div class="max-w-xl space-y-2"><slot /></div
  ></Card>
</template>
