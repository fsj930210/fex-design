<script setup lang="ts">
import { listboxRootClassName } from '@fex-design/components-styles/listbox'
import { cn } from '@fex-design/utils'
import { useAttrs } from 'vue'
import { ListboxRoot } from '@fex-design/vue/primitive/listbox/listbox'
defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
</script>
<template>
  <ListboxRoot
    v-bind="attrs"
    :class="cn(listboxRootClassName({}), attrs.class as string | undefined)"
    ><slot
  /></ListboxRoot>
</template>
