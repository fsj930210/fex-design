<script setup lang="ts">
import { Popover } from '@fex-design/vue/ui/popover'
import { popoverStyleDemo as demo } from '@fex-design/docs-shared/popover-demo'
import { Button } from '@fex-design/vue/ui/button'
defineOptions({ name: 'PopoverSemanticStylesExample' })
const rootStyle = demo.variables
</script>
<template>
  <div class="w-full flex items-center justify-center min-h-[360px] py-16">
    <Popover
      arrow
      :title="demo.title"
      :content="demo.content"
      :class-names="demo.classNames"
      :styles="{ root: rootStyle }"
      ><Button>{{ demo.trigger }}</Button></Popover
    >
  </div>
</template>
