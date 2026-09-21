<script setup lang="ts">
import { listboxItemIndicatorClassName } from '@fex-design/components-styles/listbox'
import { cn } from '@fex-design/utils'
import { useAttrs } from 'vue'
import { CheckIcon } from '@fex-design/vue/icons/check'
import { ListboxItemIndicator } from '@fex-design/vue/primitive/listbox/listbox'
defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
</script>
<template>
  <ListboxItemIndicator
    v-bind="attrs"
    :class="cn(listboxItemIndicatorClassName, attrs.class as string | undefined)"
    ><slot><CheckIcon /></slot
  ></ListboxItemIndicator>
</template>
