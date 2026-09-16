<script setup lang="ts">
import { inputNumberDecrementClassName } from '@fex-design/styles/input-number'
import { cn } from '@fex/utils'
import { inject } from 'vue'
import { Button } from '../button/button'
import MinusIcon from '../../icon/minus-icon.vue'
import { inputNumberContextKey } from './context'
defineOptions({ name: 'InputNumberDecrement' })
const props = defineProps<{ class?: string; disabled?: boolean }>()
const inputNumber = inject(inputNumberContextKey)
if (!inputNumber) throw new Error('InputNumberDecrement must be used inside InputNumberRoot.')
</script>
<template>
  <Button
    variant="text"
    data-slot="input-number-decrement"
    data-action="decrement"
    aria-label="Decrease value"
    :disabled="props.disabled || !inputNumber.canDecrement.value"
    :class="cn(inputNumberDecrementClassName, props.class)"
    @pointerdown.prevent
    @click="inputNumber.decrement"
    ><slot><MinusIcon /></slot
  ></Button>
</template>
