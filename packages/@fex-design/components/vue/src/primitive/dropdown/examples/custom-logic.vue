<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDropdown } from '@fex-design/vue/primitive/dropdown'
const { controller, popover, menuSnapshot } = useDropdown()
const trigger = ref<HTMLButtonElement | null>(null)
const content = ref<HTMLDivElement | null>(null)
const rename = ref<HTMLButtonElement | null>(null)
const duplicate = ref<HTMLButtonElement | null>(null)
// Each watcher connects a conditional DOM host to the external controller and cleans up on replacement.
watch(
  trigger,
  (element, _, cleanup) => {
    if (element) cleanup(controller.bindTrigger(element))
  },
  { flush: 'post' },
)
watch(
  content,
  (element, _, cleanup) => {
    if (element) cleanup(controller.bindFloatingContent(element))
  },
  { flush: 'post' },
)
watch(
  rename,
  (element, _, cleanup) => {
    if (element) cleanup(controller.dom.bindItem(element, () => ({ value: 'rename' })))
  },
  { flush: 'post' },
)
watch(
  duplicate,
  (element, _, cleanup) => {
    if (element) cleanup(controller.dom.bindItem(element, () => ({ value: 'duplicate' })))
  },
  { flush: 'post' },
)
const snapshot = popover.snapshot
</script>
<template>
  <div class="flex min-h-48 flex-col items-start gap-4 p-6">
    <button
      ref="trigger"
      type="button"
      aria-haspopup="menu"
      :aria-expanded="snapshot.open"
      class="rounded-md border px-3 py-2"
      @click="controller.overlay.toggle()"
      @keydown="controller.triggerKeyDown($event)"
    >
      操作
    </button>
    <div
      v-if="snapshot.mounted"
      ref="content"
      role="menu"
      aria-label="操作"
      tabindex="-1"
      :hidden="snapshot.phase === 'closed'"
      :inert="!snapshot.open"
      class="flex flex-col rounded-md border bg-background p-1 shadow-md"
      style="
        position: var(--floating-strategy, absolute);
        left: var(--floating-x, 0px);
        top: var(--floating-y, 0px);
      "
    >
      <button ref="rename" type="button" class="rounded px-3 py-2 text-start">重命名</button>
      <button ref="duplicate" type="button" class="rounded px-3 py-2 text-start">复制</button>
    </div>
    <output>最近选择：{{ menuSnapshot.value.join(', ') || '尚未选择' }}</output>
  </div>
</template>
