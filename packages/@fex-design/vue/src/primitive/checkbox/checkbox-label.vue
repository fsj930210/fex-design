<script setup lang="ts">
import { checkboxLabelClassName } from '@fex-design/styles/checkbox'
import { cn } from '@fex/utils'
import { inject, useAttrs } from 'vue'
import { checkboxRootKey } from './context'
defineOptions({ name: 'CheckboxLabel', inheritAttrs: false })
const attrs = useAttrs()
const root = inject(checkboxRootKey)
</script>
<template>
  <label
    v-bind="attrs"
    :for="(attrs.for as string | undefined) ?? root?.controlId"
    data-slot="checkbox-label"
    :class="cn(checkboxLabelClassName, attrs.class as string | undefined)"
    ><slot
  /></label>
</template>
