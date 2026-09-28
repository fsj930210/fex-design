<script setup lang="ts">
import { ref } from "vue"
import { Progress } from "@fex-design/vue/ui/progress"
const value = ref(30)
</script>
<template>
  <div class="grid w-full max-w-md gap-4">
    <div class="flex items-center gap-6"><Progress :value="value" /><Progress variant="circle" :value="value" :size="96" show-info /></div>
    <div class="flex gap-2">
      <button
        type="button"
        @click="value = Math.max(0, value - 10)"
        class="px-3 py-1 text-sm border rounded hover:bg-muted"
      >
        -10%
      </button>
      <button
        type="button"
        @click="value = Math.min(100, value + 10)"
        class="px-3 py-1 text-sm border rounded hover:bg-muted"
      >
        +10%
      </button>
    </div>
  </div>
</template>
