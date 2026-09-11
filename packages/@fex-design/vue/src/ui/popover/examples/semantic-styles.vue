<script setup lang="ts">
import { computed, ref } from 'vue'
import type { FloatingPlacement, PopoverOptions } from '@fex-design/core/popover/types'
import { Popover } from '@fex-design/vue/ui/popover'
import { Button } from '@fex-design/vue/ui/button'

type DemoCase = { label: string; options: PopoverOptions }
const cases = [{ label: '按部位自定义样式', options: { arrow: true } }]
</script>

<template>
  <div class="w-full flex items-center justify-center min-h-[360px] py-16">
  <div class="grid gap-4">
    
    <div class="flex flex-wrap items-center gap-3">
      <div v-for="item in cases" :key="item.label">
        <Popover v-bind="item.options" title="提示信息"
          :class-names="{ title: 'text-blue-700 font-semibold', content: 'text-sm' }"
          :styles="{ root: { '--popover-background': 'var(--muted-background)', '--popover-border': 'var(--color-blue-500)', '--popover-radius': '12px', '--popover-arrow-size': '16px' }, title: { fontWeight: 700 } }">
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
