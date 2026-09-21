<script setup lang="ts">
import { MinusIcon } from '@fex-design/vue/icons/minus'
import { PlusIcon } from '@fex-design/vue/icons/plus'
import { useInputNumber } from '@fex-design/vue/primitive/input-number'
import { Button } from '@fex-design/vue/primitive/button'

const number = useInputNumber({ defaultValue: 5, min: 0, max: 10 })
</script>

<template>
  <div class="inline-flex items-center gap-2">
    <Button aria-label="减少" :disabled="!number.canDecrement.value" @click="number.decrement">
      <MinusIcon />
    </Button>
    <output class="min-w-10 text-center font-medium">{{ number.value.value }}</output>
    <Button aria-label="增加" :disabled="!number.canIncrement.value" @click="number.increment">
      <PlusIcon />
    </Button>
  </div>
</template>
