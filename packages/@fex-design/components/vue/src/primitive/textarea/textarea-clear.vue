<script setup lang="ts">
import { textareaClearClassName } from '@fex-design/components-styles/textarea'
import { cn } from '@fex-design/utils'
import { computed, inject } from 'vue'
import { XIcon } from '@fex-design/vue/icons/x'
import PrimitiveButton from '../button/button.vue'
import { textareaContextKey } from './context'

defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<{ class?: string; forceMount?: boolean }>(), {
  forceMount: false,
})
const emit = defineEmits<{ click: [event: MouseEvent]; pointerdown: [event: PointerEvent] }>()
const textarea = inject(textareaContextKey)
if (!textarea) throw new Error('TextareaClear must be used inside TextareaRoot.')
const textareaContext = textarea
const className = computed(() => cn(textareaClearClassName, props.class))

function pointerdown(event: PointerEvent) {
  emit('pointerdown', event)
  if (!event.defaultPrevented) event.preventDefault()
}

function click(event: MouseEvent) {
  emit('click', event)
  if (!event.defaultPrevented) textareaContext.clear()
}
</script>

<template>
  <PrimitiveButton
    v-if="props.forceMount || textareaContext.canClear.value"
    v-bind="$attrs"
    type="button"
    aria-label="Clear textarea"
    data-slot="textarea-clear"
    :disabled="!props.forceMount && !textareaContext.canClear.value"
    :class="className"
    @pointerdown="pointerdown"
    @click="click"
  >
    <slot><XIcon /></slot>
  </PrimitiveButton>
</template>
