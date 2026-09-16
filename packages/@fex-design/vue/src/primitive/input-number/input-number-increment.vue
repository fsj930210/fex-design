<script setup lang="ts">
import { inputNumberIncrementClassName } from '@fex-design/styles/input-number'
import { cn } from '@fex/utils'
import { inject } from 'vue'
import { Button } from '../button/button'
import PlusIcon from '../../icon/plus-icon.vue'
import { inputNumberContextKey } from './context'
defineOptions({ name: 'InputNumberIncrement' })
const props = defineProps<{ class?: string; disabled?: boolean }>()
const inputNumber = inject(inputNumberContextKey)
if (!inputNumber) throw new Error('InputNumberIncrement must be used inside InputNumberRoot.')
</script>
<template>
  <Button
    variant="text"
    data-slot="input-number-increment"
    data-action="increment"
    aria-label="Increase value"
    :disabled="props.disabled || !inputNumber.canIncrement.value"
    :class="cn(inputNumberIncrementClassName, props.class)"
    @pointerdown.prevent
    @click="inputNumber.increment"
    ><slot><PlusIcon /></slot
  ></Button>
</template>
