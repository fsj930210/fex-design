<script setup lang="ts">
import type { VNodeChild } from 'vue'
import { MenuGroup as PrimitiveGroup, MenuGroupLabel } from '@fex-design/vue/primitive/menu'
import { MenuValue } from './menu-value'
defineOptions({ name: 'MenuGroup', inheritAttrs: false })
withDefaults(defineProps<{ label?: VNodeChild }>(), { label: undefined })
</script>
<template>
  <PrimitiveGroup v-bind="$attrs"
    ><MenuGroupLabel v-if="$slots.label || label != null"
      ><slot name="label"><MenuValue :value="label" /></slot></MenuGroupLabel
    ><slot
  /></PrimitiveGroup>
</template>
