<script setup lang="ts">
import { computed, ref } from 'vue'
import type { FloatingPlacement, PopoverOptions } from '@fex-design/core/popover/types'
import { Popover } from '@fex-design/vue/ui/popover'
import { Button } from '@fex-design/vue/ui/button'

type DemoCase = { label: string; options: PopoverOptions }
const cases = [
  { label: '不显示箭头', options: { arrow: false, placement: 'bottomLeft' } },
  { label: '箭头距面板边缘 16px', options: { arrow: true, placement: 'bottomLeft' } },
  { label: '箭头距面板边缘 28px', options: { arrow: true, arrowPadding: 28, placement: 'bottomLeft' } },
] satisfies DemoCase[]
</script>

<template>
  <div class="w-full flex items-center justify-center min-h-[360px] py-16">
  <div class="grid gap-4">
    
    <div class="flex flex-wrap items-center gap-3">
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
