<script setup lang="ts">
import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverTitle,
} from '@fex-design/vue/primitive/popover'
import { popoverStyleDemo as demo } from '@fex-design/docs-shared/popover-demo'
import { Button } from '@fex-design/vue/primitive/button'
defineOptions({ name: 'PopoverSemanticStylesExample' })
const rootStyle = demo.variables
</script>
<template>
  <div class="w-full flex items-center justify-center min-h-[360px] py-16">
    <Popover arrow
      ><PopoverTrigger v-slot="binding"
        ><Button v-bind="binding.props" :ref="binding.ref">{{
          demo.trigger
        }}</Button></PopoverTrigger
      ><PopoverPortal
        ><PopoverContent :class="demo.classNames.root" :style="rootStyle"
          ><PopoverArrow /><PopoverHeader
            ><PopoverTitle :class="demo.classNames.title">{{
              demo.title
            }}</PopoverTitle></PopoverHeader
          >
          <div data-slot="popover-body" :class="demo.classNames.content">
            {{ demo.content }}
          </div></PopoverContent
        ></PopoverPortal
      ></Popover
    >
  </div>
</template>
