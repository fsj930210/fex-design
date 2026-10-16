<script setup lang="ts">
import { datePickerPresetClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { normalizeClass, useAttrs } from 'vue'
import Button from '../button/button.vue'

defineOptions({ name: 'DatePickerPreset', inheritAttrs: false })

const attrs = useAttrs()
function nativeAttrs() { const { class: className, ...rest } = attrs; return rest }
</script>

<template>
  <Button data-slot="date-picker-preset" v-bind="nativeAttrs()" type="button" :class="cn(datePickerPresetClassName, normalizeClass(attrs.class))">
    <slot />
  </Button>
</template>
