<script setup lang="ts">
import { useInputNumber } from '@fex-design/vue/primitive/input-number'
const number = useInputNumber({ defaultValue: 5, min: 0, max: 10 })
</script>
<template><section class="grid max-w-sm gap-3 rounded-lg border p-4"><label class="grid gap-1"><span>Custom quantity</span><input inputmode="decimal" :value="number.draft.value" @input="number.input(($event.target as HTMLInputElement).value, $event as Event)" @blur="number.blur" @keydown="number.keydown" /></label><div class="inline-flex items-center gap-2"><button type="button" aria-label="Decrease" :disabled="!number.canDecrement.value" @click="number.decrement">−</button><output aria-live="polite">{{ number.formattedValue.value }}</output><button type="button" aria-label="Increase" :disabled="!number.canIncrement.value" @click="number.increment">+</button></div><small>Range: 0–10</small></section></template>
