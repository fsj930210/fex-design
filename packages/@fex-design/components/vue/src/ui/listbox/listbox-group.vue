<script setup lang="ts">
import { listboxGroupClassName } from '@fex-design/components-styles/listbox'
import { cn } from '@fex-design/utils'
import { useAttrs } from 'vue'
import { ListboxGroup } from '@fex-design/vue/primitive/listbox/listbox'
defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
</script>
<template>
  <ListboxGroup v-bind="attrs" :class="cn(listboxGroupClassName, attrs.class as string | undefined)"
    ><slot
  /></ListboxGroup>
</template>
