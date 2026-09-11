<script setup lang="ts">
import { computed, ref } from 'vue'
import type { FloatingPlacement, PopoverOptions } from '@fex-design/core/popover/types'
import { Popover } from '@fex-design/vue/ui/popover'
import { Button } from '@fex-design/vue/ui/button'

type DemoCase = { label: string; options: PopoverOptions }
const sideOffset = ref(12)
const alignOffset = ref(0)
const cases = computed<DemoCase[]>(() => (['start', 'center', 'end'] as const).map((align) => ({ label: align, options: { side: 'bottom', align, arrow: true, avoidCollisions: false, sideOffset: sideOffset.value, alignOffset: alignOffset.value } })))
</script>

<template>
  <div class="w-full flex items-center justify-center min-h-[480px] py-16">
  <div class="grid gap-4">
    <label>浮层与触发元素距离 {{ sideOffset }}px <input v-model.number="sideOffset" type="range" min="0" max="40" /></label>
    <label>面板与触发元素对齐偏移 {{ alignOffset }}px <input v-model.number="alignOffset" type="range" min="-40" max="40" /></label>
    <div class="flex flex-wrap justify-center gap-16 pt-12 pb-24">
      <div v-for="item in cases" :key="item.label">
        <Popover v-bind="item.options" title="提示信息">
          <Button>{{ item.label }}</Button>
          <template #content="{ close }">
            <p>这里可以放置说明和交互内容。</p>
          </template>
        </Popover>
      </div>
      
    </div>
  </div>
  </div>
</template>
