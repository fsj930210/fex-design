<script setup lang="ts">
import type { TagPresetColor, TagVariant } from '@fex-design/core/tag/types'
import { Tag } from '@fex-design/vue/ui/tag'
const presets: readonly TagPresetColor[] = ['primary', 'success', 'warning', 'danger', 'info']
const customColors = ['#f50', '#2db7f5', '#87d068', '#108ee9'] as const
const variants: readonly TagVariant[] = ['filled', 'solid', 'outlined']
</script>
<template><div class="grid gap-4"><section v-for="variant in variants" :key="variant" class="grid gap-2"><h4 class="text-sm font-medium">预设颜色（{{ variant }}）</h4><div class="flex flex-wrap gap-2"><Tag v-for="color in presets" :key="color" :color="color" :variant="variant">{{ color }}</Tag></div></section><section v-for="variant in variants" :key="`custom-${variant}`" class="grid gap-2"><h4 class="text-sm font-medium">自定义颜色（{{ variant }}）</h4><div class="flex flex-wrap gap-2"><Tag v-for="color in customColors" :key="color" :color="color" :variant="variant">{{ color }}</Tag></div></section></div></template>
