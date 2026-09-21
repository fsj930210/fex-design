<script setup lang="ts">
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from '@fex-design/vue/primitive/tooltip'
import { Button } from '@fex-design/vue/primitive/button'
</script>
<template>
  <div class="flex min-h-64 items-center justify-center">
    <TooltipRoot
      ><TooltipTrigger v-slot="trigger"
        ><Button v-bind="trigger.props" :ref="trigger.ref">悬停或聚焦</Button></TooltipTrigger
      ><TooltipPortal
        ><TooltipContent
          >将鼠标移到这段提示上仍会保持显示<TooltipArrow /></TooltipContent></TooltipPortal
    ></TooltipRoot>
  </div>
</template>
