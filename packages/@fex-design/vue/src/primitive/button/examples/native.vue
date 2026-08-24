<script setup lang="ts">
import { Button } from '@fex-design/vue/primitive/button'
import { useTemplateRef } from 'vue'

const button = useTemplateRef<{ ref: HTMLButtonElement | null }>('button')
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <form @submit.prevent>
      <Button ref="button">Focusable</Button>
      <Button type="button" @click="button?.ref?.focus()">Focus button</Button>
      <Button type="submit" name="action" value="save">Save</Button>
      <Button type="reset">Reset</Button>
      <Button disabled aria-label="Unavailable">Disabled</Button>
    </form>
  </div>
</template>
