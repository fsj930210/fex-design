<script setup lang="ts">
import { usePopover } from '@fex-design/vue/primitive/popover'
const popover = usePopover(() => ({}))
</script>
<template>
  <section class="grid w-full max-w-sm gap-3 rounded-lg border p-4">
    <button type="button" :aria-expanded="popover.snapshot.open" @click="popover.overlay.toggle">{{ popover.snapshot.open ? 'Close details' : 'Open details' }}</button>
    <div v-if="popover.snapshot.open" role="dialog" class="grid gap-2 rounded-md border p-3"><strong>Custom Popover</strong><p>This panel is rendered by the example component.</p><button type="button" @click="popover.overlay.close">Dismiss</button></div>
    <output aria-live="polite">{{ popover.snapshot.open ? 'Open' : 'Closed' }}</output>
  </section>
</template>
