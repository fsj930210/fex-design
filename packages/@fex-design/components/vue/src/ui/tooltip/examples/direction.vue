<script setup lang="ts">
import { Tooltip } from '@fex-design/vue/ui/tooltip'
import { Button } from '@fex-design/vue/ui/button'
</script>
<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex justify-center" dir="ltr">
      <Tooltip
        dir="ltr"
        placement="topLeft"
        :avoid-collisions="false"
        title="这是从起始侧对齐的中文提示"
        ><Button>查看中文提示</Button></Tooltip
      >
    </div>
    <div class="flex justify-center" dir="rtl">
      <Tooltip
        dir="rtl"
        placement="topLeft"
        :avoid-collisions="false"
        title="تلميح عربي بمحاذاة جهة البداية"
        ><Button>تلميح</Button></Tooltip
      >
    </div>
  </div>
</template>
