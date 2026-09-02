<script setup lang="ts">
import { tagActionClassName } from '@fex-design/styles/tag'
import { cn } from '@fex/utils'
import { useAttrs } from 'vue'
import { CloseIcon } from '../../icon/close'

defineOptions({ name: 'TagAction', inheritAttrs: false })
const attrs = useAttrs()
</script>

<template>
  <button
    v-bind="attrs"
    type="button"
    data-slot="tag-action"
    :aria-label="attrs['aria-label'] as string | undefined"
    :class="cn(tagActionClassName, attrs.class as string | undefined)"
  >
    <slot><CloseIcon aria-hidden="true" /></slot>
  </button>
</template>
