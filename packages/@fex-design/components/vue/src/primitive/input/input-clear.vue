<script setup lang="ts">
import { inputClearClassName } from '@fex-design/components-styles/input'
import { cn } from '@fex-design/utils'
import { computed, inject } from 'vue'
import { CircleXIcon } from '@fex-design/vue/icons/circle-x'
import { inputContextKey } from './input-context'

defineOptions({ inheritAttrs: false })
const props = defineProps<{ class?: string }>()
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
    v-bind="$attrs"
    type="button"
    data-slot="input-clear"
    :data-visible="inputContext.canClear.value"
    :class="className"
    @click="click"
  >
    <slot><CircleXIcon /></slot>
  </button>
</template>
