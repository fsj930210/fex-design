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
  <div class="flex min-h-64 items-center justify-center">
    <TooltipRoot>
      <TooltipTrigger v-slot="trigger"
        ><Button v-bind="trigger.props" :ref="trigger.ref">CSS Variables</Button></TooltipTrigger
      >
      <TooltipPortal
        ><TooltipContent
          style="
            --tooltip-background: #164e63;
            --tooltip-foreground: #ecfeff;
            --tooltip-content-max-width: 180px;
            --tooltip-motion-duration: 300ms;
          "
          >CSS Variables 同时控制颜色、宽度和动效时长。<TooltipArrow /></TooltipContent
      ></TooltipPortal>
    </TooltipRoot>
  </div>
</template>
