<script setup lang="ts">
import { Tooltip } from '@fex-design/vue/ui/tooltip'
import { Button } from '@fex-design/vue/ui/button'
</script>
<template>
  <div class="flex min-h-64 items-center justify-center">
    <Tooltip title="将鼠标移到这段提示上仍会保持显示"><Button>悬停或聚焦</Button></Tooltip>
  </div>
</template>
