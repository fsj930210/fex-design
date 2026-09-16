<script setup lang="ts">
import { Tooltip } from '@fex-design/vue/ui/tooltip'
import { Button } from '@fex-design/vue/ui/button'
</script>
<template>
  <div class="flex min-h-64 items-center justify-center">
    <Tooltip
      title="CSS Variables 同时控制颜色、宽度和动效时长。"
      style="
        --tooltip-background: #164e63;
        --tooltip-foreground: #ecfeff;
        --tooltip-content-max-width: 180px;
        --tooltip-motion-duration: 300ms;
      "
      ><Button>CSS Variables</Button></Tooltip
    >
  </div>
</template>
