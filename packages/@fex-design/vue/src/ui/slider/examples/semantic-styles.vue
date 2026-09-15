<script setup lang="ts">
import { Slider } from '@fex-design/vue/ui/slider'
</script>
<template>
  <div class="grid w-full max-w-xl gap-3">
    <Slider
    :default-value="55"
    :marks="[
      { value: 25, label: '低' },
      { value: 75, label: '高' },
    ]"
    :class-names="{
      root: 'rounded-lg bg-muted p-6',
      track: 'bg-amber-200',
      range: 'bg-violet-600',
      thumb: 'border-violet-600',
      mark: 'text-violet-700',
    }"
    :styles="{ thumb: { boxShadow: '0 0 0 4px rgb(124 58 237 / 20%)' } }"
    />
    <p class="text-sm text-muted-foreground">紫色轨道与刻度由 classNames 定制，Thumb 外圈由 styles 定制。</p>
  </div>
</template>
