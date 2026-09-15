<script setup lang="ts">
import { computed, ref } from 'vue'
import type { FloatingPlacement, PopoverOptions } from '@fex-design/core/popover/types'
import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverTitle,
} from '@fex-design/vue/primitive/popover'
import { Button } from '@fex-design/vue/ui/button'

type DemoCase = { label: string; options: PopoverOptions }
const cases = [
  { label: 'Hover 悬停', options: { trigger: ['hover'] } },
  { label: 'Focus 聚焦', options: { trigger: ['focus'] } },
  { label: 'Click 点击', options: { trigger: ['click'] } },
  { label: 'Context menu 右键', options: { trigger: ['context-menu'] } },
  { label: 'Hover + Focus', options: { trigger: ['hover', 'focus'] } },
  { label: 'Hover + Click', options: { trigger: ['hover', 'click'] } },
  { label: 'Focus + Click', options: { trigger: ['focus', 'click'] } },
  {
    label: '悬停延迟 300ms / 400ms',
    options: { trigger: ['hover'], hoverOpenDelay: 300, hoverCloseDelay: 400 },
  },
] satisfies DemoCase[]
</script>

<template>
  <div class="w-full flex items-center justify-center min-h-[360px] py-16">
    <div class="grid gap-4">
      <div class="flex flex-wrap items-center gap-3">
        <div v-for="item in cases" :key="item.label">
          <Popover v-bind="item.options" v-slot="{ close }">
            <PopoverTrigger v-slot="trigger">
              <Button v-bind="trigger.props" :ref="trigger.ref">{{ item.label }}</Button>
            </PopoverTrigger>
            <PopoverPortal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader><PopoverTitle>提示信息</PopoverTitle></PopoverHeader>
                <p>这里可以放置说明和交互内容。</p>
              </PopoverContent>
            </PopoverPortal>
          </Popover>
        </div>
      </div>
    </div>
  </div>
</template>
