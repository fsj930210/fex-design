<script setup lang="ts">
import { ref } from 'vue'
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from '@fex-design/vue/primitive/tooltip'
import { Button } from '@fex-design/vue/primitive/button'
const open = ref(false)
</script>
<template>
  <div class="flex min-h-64 items-center justify-center gap-3">
    <Button @click="open = !open">外部{{ open ? '关闭' : '打开' }}</Button
    ><TooltipRoot :open="open" @open-change="open = $event"
      ><TooltipTrigger v-slot="trigger"
        ><Button v-bind="trigger.props" :ref="trigger.ref" variant="outlined"
          >受控提示</Button
        ></TooltipTrigger
      ><TooltipPortal
        ><TooltipContent>状态由调用方管理<TooltipArrow /></TooltipContent></TooltipPortal
    ></TooltipRoot>
  </div>
</template>
