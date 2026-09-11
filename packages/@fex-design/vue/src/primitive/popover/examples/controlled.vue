<script setup lang="ts">
import { computed, ref } from 'vue'
import type { FloatingPlacement, PopoverOptions } from '@fex-design/core/popover/types'
import { Popover, PopoverTrigger, PopoverPortal, PopoverContent, PopoverArrow, PopoverHeader, PopoverTitle } from '@fex-design/vue/primitive/popover'
import { Button } from '@fex-design/vue/ui/button'

type DemoCase = { label: string; options: PopoverOptions }
const open = ref(false)
const cases = computed<DemoCase[]>(() => [
  { label: '受控表单', options: { open: open.value, onOpenChange: (next) => { open.value = next } } },
  { label: '非受控：关闭保留草稿', options: {} },
  { label: '关闭销毁：重新填写', options: { destroyOnHidden: true } },
  { label: '提前挂载，关闭保留', options: { lazyMount: false } },
  { label: '提前挂载，关闭销毁', options: { lazyMount: false, destroyOnHidden: true } },
])
</script>

<template>
  <div class="w-full flex items-center justify-center min-h-[360px] py-16">
  <div class="grid gap-4">
    <Button @click="open = !open">外部切换：{{ open ? '打开' : '关闭' }}</Button>
    <div class="flex flex-wrap items-center gap-3">
      <div v-for="item in cases" :key="item.label">
        <Popover v-bind="item.options" v-slot="{ close }">
          <PopoverTrigger v-slot="trigger">
            <Button v-bind="trigger.props" :ref="trigger.ref">{{ item.label }}</Button>
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader><PopoverTitle>{{ item.label }}</PopoverTitle></PopoverHeader>
              <div class="grid gap-3">
              <label>备注
                <input aria-label="备注" class="block rounded border p-2" placeholder="关闭后再打开检查草稿" />
              </label>
              <Button @click="close()">在浮层内关闭</Button>
            </div>
            </PopoverContent>
          </PopoverPortal>
        </Popover>
      </div>
      
    </div>
  </div>
  </div>
</template>
