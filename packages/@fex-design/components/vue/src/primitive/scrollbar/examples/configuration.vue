<script setup lang="ts">
import { scrollbarConfigurationLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ref } from 'vue'
import { InputNumber } from '@fex-design/vue/ui/input-number'
import { Select } from '@fex-design/vue/ui/select'
import { Checkbox } from '@fex-design/vue/ui/checkbox'
import { ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb, type ScrollbarAutoHide } from '@fex-design/vue/primitive/scrollbar'
const mode = ref<ScrollbarAutoHide>('scroll')
const delay = ref(600)
const disabled = ref(false)
const top = ref(0)
const modes = [{"value":"never","label":"持续显示"},{"value":"scroll","label":"滚动时显示"},{"value":"move","label":"移动时显示"},{"value":"leave","label":"离开后隐藏"}]
function changeMode(value: unknown) { if (value === 'never' || value === 'scroll' || value === 'move' || value === 'leave') mode.value = value }
</script>
<template>
  <div class="grid w-full max-w-md gap-4">
    <div class="flex items-center gap-3"><span class="text-sm">自动隐藏</span><Select class="w-40" :options="modes" :value="mode" @change="changeMode" :input-props="{ 'aria-label': '自动隐藏模式' }" /></div>
    <div class="flex items-center gap-3"><span class="text-sm">隐藏延迟（ms）</span><InputNumber class="w-40" :value="delay" :min="0" :max="3000" :step="100" @change="(_event, value) => delay = value ?? 0" /></div>
    <Checkbox :checked="disabled" @change="disabled = ($event.target as HTMLInputElement).checked">禁用自定义滚动条交互</Checkbox>
    <ScrollbarRoot class="h-48 w-72 rounded-md border" :auto-hide="mode" :disabled="disabled" :auto-hide-delay="delay" :overflow="{ x: 'hidden' }" @scroll-change="top = Math.round($event.scrollTop)">
      <ScrollbarViewport :overflow="{ y: 'auto' }">
        <div class="grid gap-3 p-4">
        <p v-for="line in scrollbarConfigurationLines" :key="line">{{ line }}</p>
      </div>
      </ScrollbarViewport>
      <ScrollbarBar axis="y"><ScrollbarTrack axis="y"><ScrollbarThumb axis="y" class="bg-primary" /></ScrollbarTrack></ScrollbarBar>
    </ScrollbarRoot>
    <output>滚动位置： {{ top }}</output>
  </div>
</template>
