<script setup lang="ts">
import { Button } from '@fex-design/vue/ui/button'
import { useTemplateRef } from 'vue'

const button = useTemplateRef<{ ref: HTMLButtonElement | null }>('button')
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <form @submit.prevent>
      <Button ref="button">Focusable</Button>
      <Button type="button" variant="ghost" @click="button?.ref?.focus()">Focus button</Button>
      <Button type="submit">Submit</Button>
      <Button type="reset" variant="outline">Reset</Button>
      <Button disabled>Disabled</Button>
      <Button aria-pressed="true" data-testid="toggle">Pressed</Button>
    </form>
  </div>
</template>
