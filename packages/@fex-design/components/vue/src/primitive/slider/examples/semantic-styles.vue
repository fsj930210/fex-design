<script setup lang="ts">
import {
  SliderRoot,
  SliderTrack,
  SliderRange,
  SliderMark,
  SliderThumb,
} from '@fex-design/vue/primitive/slider'
</script>
<template>
  <div class="grid w-full max-w-xl gap-3">
    <SliderRoot :default-value="[55]" :marks="[25, 75]" class="rounded-lg bg-muted p-6"
      ><SliderTrack class="bg-amber-200"
        ><SliderRange class="bg-violet-600"></SliderRange
        ><SliderMark :value="25" class="text-violet-700">低</SliderMark
        ><SliderMark :value="75" class="text-violet-700">高</SliderMark></SliderTrack
      ><SliderThumb
        :index="0"
        aria-label="滑块 1"
        class="border-violet-600"
        :style="{ boxShadow: '0 0 0 4px rgb(124 58 237 / 20%)' }"
      ></SliderThumb
    ></SliderRoot>
    <p class="text-sm text-muted-foreground">
      紫色轨道与刻度由 classNames 定制，Thumb 外圈由 styles 定制。
    </p>
  </div>
</template>
