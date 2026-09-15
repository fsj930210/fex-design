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
const container = ref<HTMLDivElement | null>(null)
const cases = [
  { label: '挂载到 body', options: {} },
  {
    label: '在框内打开浮层',
    options: {
      getPopupContainer: () => container.value ?? document.body,
    },
  },
] satisfies DemoCase[]
</script>

<template>
  <div class="w-full flex items-center justify-center min-h-[360px] py-16">
    <div class="grid gap-4">
      <div
        ref="container"
        class="relative w-full h-96 overflow-auto rounded-lg border-2 border-dashed p-6"
      >
        <p>自定义挂载区域：浮层插入此虚线框，仍以按钮为定位参照。</p>
        <div class="flex min-h-[560px] justify-center gap-4 pt-24">
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
  </div>
</template>
