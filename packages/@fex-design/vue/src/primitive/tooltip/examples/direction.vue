<script setup lang="ts">
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from '@fex-design/vue/primitive/tooltip'
import { Button } from '@fex-design/vue/ui/button'
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex justify-center" dir="ltr">
      <TooltipRoot placement="topLeft" :avoid-collisions="false"
        ><TooltipTrigger v-slot="trigger"
          ><Button v-bind="trigger.props" :ref="trigger.ref">查看中文提示</Button></TooltipTrigger
        ><TooltipPortal
          ><TooltipContent dir="ltr"
            >这是从起始侧对齐的中文提示<TooltipArrow /></TooltipContent></TooltipPortal
      ></TooltipRoot>
    </div>
    <div class="flex justify-center" dir="rtl">
      <TooltipRoot placement="topLeft" :avoid-collisions="false"
        ><TooltipTrigger v-slot="trigger"
          ><Button v-bind="trigger.props" :ref="trigger.ref">تلميح</Button></TooltipTrigger
        ><TooltipPortal
          ><TooltipContent dir="rtl"
            >تلميح عربي بمحاذاة جهة البداية<TooltipArrow /></TooltipContent></TooltipPortal
      ></TooltipRoot>
    </div>
  </div>
</template>
