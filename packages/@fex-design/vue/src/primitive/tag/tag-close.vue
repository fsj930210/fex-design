<script setup lang="ts">
import { tagCloseClassName } from '@fex-design/styles/tag'
import { cn } from '@fex/utils'
import { useAttrs } from 'vue'
import { CloseIcon } from '../../icon/close'

defineOptions({ name: 'TagClose', inheritAttrs: false })
const attrs = useAttrs()
</script>

<template>
  <button
    v-bind="attrs"
    type="button"
    data-slot="tag-close"
    :aria-label="(attrs['aria-label'] as string | undefined) ?? 'Close'"
    :class="cn(tagCloseClassName, attrs.class as string | undefined)"
  >
    <slot><CloseIcon aria-hidden="true" /></slot>
  </button>
</template>
