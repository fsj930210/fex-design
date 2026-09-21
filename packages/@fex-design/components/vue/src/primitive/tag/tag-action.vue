<script setup lang="ts">
import { tagActionClassName } from '@fex-design/components-styles/tag'
import { cn } from '@fex-design/utils'
import { useAttrs } from 'vue'
import { XIcon } from '@fex-design/vue/icons/x'

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
    <slot><XIcon aria-hidden="true" /></slot>
  </button>
</template>
