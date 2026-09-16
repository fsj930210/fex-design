<script setup lang="ts">
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from '@fex-design/vue/primitive/tooltip'
import { Button } from '@fex-design/vue/ui/button'
const colors = [
  { label: '品牌蓝', value: '#1677ff' },
  { label: '紫色', value: '#722ed1' },
  { label: '暖红色', value: '#d4380d' },
]
</script>
<template>
  <div class="flex flex-wrap items-center justify-center gap-4">
    <TooltipRoot v-for="item in colors" :key="item.value"
      ><TooltipTrigger v-slot="trigger"
        ><Button v-bind="trigger.props" :ref="trigger.ref">{{ item.label }}</Button></TooltipTrigger
      ><TooltipPortal
        ><TooltipContent :color="item.value"
          >{{ item.label }} Tooltip<TooltipArrow /></TooltipContent></TooltipPortal
    ></TooltipRoot>
  </div>
</template>
