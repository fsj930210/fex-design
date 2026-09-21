<script setup lang="ts">
import type { MessageActionAlign } from '@fex-design/core/message/types'
import { messageActionsClassName } from '@fex-design/components-styles/message'
import { cn } from '@fex-design/utils'
import { computed, inject, useAttrs } from 'vue'
import { messageKey } from './context'
defineOptions({ inheritAttrs: false })
const props = withDefaults(
  defineProps<{ align?: MessageActionAlign; visibility?: 'always' | 'interaction' }>(),
  { align: 'inherit', visibility: 'always' },
)
const attrs = useAttrs()
const context = inject(messageKey)
const resolvedAlign = computed(() =>
  props.align === 'inherit' ? (context?.side.value ?? 'start') : props.align,
)
</script>
<template>
  <div
    v-bind="attrs"
    data-slot="message-actions"
    :data-align="resolvedAlign"
    :data-visibility="visibility"
    :class="cn(messageActionsClassName, attrs.class as string | undefined)"
  >
    <slot />
  </div>
</template>
