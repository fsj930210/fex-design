<script setup lang="ts">
import { useTimePicker } from '@fex-design/vue/primitive/time-picker'
const hours = Array.from({ length: 24 }, (_, value) => value)
const minutes = Array.from({ length: 60 }, (_, value) => value)
const seconds = Array.from({ length: 60 }, (_, value) => value)
const { controller, snapshot } = useTimePicker({ defaultValue: { hour: 9, minute: 30, second: 0 } })
</script>
<template>
  <section class="grid w-full gap-4 rounded-lg border p-4">
    <label class="grid gap-2"
      >Time input<input
        type="time"
        step="1"
        :value="snapshot.inputValue"
        @input="controller.input(($event.target as HTMLInputElement).value)"
    /></label>
    <fieldset class="grid gap-2">
      <legend>Custom time picker</legend>
      <div class="flex flex-wrap items-center gap-2">
        <select
          aria-label="Hour"
          :value="snapshot.value?.hour"
          @change="controller.selectHour(Number(($event.target as HTMLSelectElement).value))"
        >
          <option v-for="value in hours" :key="value" :value="value">
            {{ String(value).padStart(2, '0') }}
          </option></select
        ><span>:</span>
        <select
          aria-label="Minute"
          :value="snapshot.value?.minute"
          @change="controller.selectMinute(Number(($event.target as HTMLSelectElement).value))"
        >
          <option v-for="value in minutes" :key="value" :value="value">
            {{ String(value).padStart(2, '0') }}
          </option></select
        ><span>:</span>
        <select
          aria-label="Second"
          :value="snapshot.value?.second"
          @change="controller.selectSecond(Number(($event.target as HTMLSelectElement).value))"
        >
          <option v-for="value in seconds" :key="value" :value="value">
            {{ String(value).padStart(2, '0') }}
          </option>
        </select>
      </div>
    </fieldset>
    <output aria-live="polite">{{ snapshot.inputValue }}</output>
  </section>
</template>
