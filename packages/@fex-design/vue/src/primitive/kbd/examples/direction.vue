<script setup lang="ts">
import { Kbd, KbdGroup } from '@fex-design/vue/primitive/kbd'
</script>
<template>
  <div class="grid w-full grid-cols-2 gap-6">
    <div
      v-for="dir in ['ltr', 'rtl']"
      :key="dir"
      :dir="dir"
      class="grid gap-3 rounded-lg border p-4"
    >
      <strong>{{ dir.toUpperCase() }}</strong
      ><KbdGroup><Kbd>Ctrl</Kbd><Kbd>+</Kbd><Kbd>K</Kbd></KbdGroup>
    </div>
  </div>
</template>
