<script setup lang="ts">
import { listboxGroupLabelClassName } from '@fex-design/components-styles/listbox'
import { cn } from '@fex-design/utils'
import { useAttrs } from 'vue'
import { ListboxGroupLabel } from '@fex-design/vue/primitive/listbox/listbox'
defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
</script>
<template>
  <ListboxGroupLabel
    v-bind="attrs"
    :class="cn(listboxGroupLabelClassName, attrs.class as string | undefined)"
    ><slot
  /></ListboxGroupLabel>
</template>
