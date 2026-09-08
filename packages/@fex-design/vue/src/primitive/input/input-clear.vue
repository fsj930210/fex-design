<script setup lang="ts">
import { inputClearClassName } from '@fex-design/styles/input'
import { cn } from '@fex/utils'
import { computed, inject } from 'vue'
import { CircleXIcon } from '../../icon/circle-x'
import { inputContextKey } from './input-context'

defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<{ class?: string; forceMount?: boolean }>(), {
  forceMount: false,
})
const emit = defineEmits<{ click: [event: MouseEvent] }>()
const input = inject(inputContextKey)
if (!input) throw new Error('InputClear must be used inside InputRoot.')
const inputContext = input
const className = computed(() => cn(inputClearClassName, props.class))

function click(event: MouseEvent) {
  emit('click', event)
  if (!event.defaultPrevented) inputContext.clear()
}
</script>

<template>
  <button
    v-if="props.forceMount || inputContext.canClear.value"
    v-bind="$attrs"
    type="button"
    data-slot="input-clear"
    :data-visible="inputContext.canClear.value"
    :disabled="!props.forceMount && !inputContext.canClear.value"
    :class="className"
    @click="click"
  >
    <slot><CircleXIcon /></slot>
  </button>
</template>
