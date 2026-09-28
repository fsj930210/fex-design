<script setup lang="ts">
import { Progress, ProgressRange, ProgressTrack, ProgressValue } from "@fex-design/vue/primitive/progress"
const items = [['pending', 0], ['active', 40], ['active', 60], ['success', 100], ['error', 80]] as const
</script>
<template><div class="grid w-full max-w-md gap-3"><Progress v-for="([status, value], index) in items" :key="`${status}-${index}`" :value="value" :status="status" class="flex w-full flex-col"><div class="flex w-full items-center"><ProgressTrack class="min-w-0 flex-1"><ProgressRange /></ProgressTrack><ProgressValue class="ms-2 shrink-0 text-sm font-medium">{{ value }}%</ProgressValue></div></Progress></div></template>
