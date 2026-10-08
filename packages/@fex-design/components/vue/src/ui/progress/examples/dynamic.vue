<script setup lang="ts">
import { ref } from 'vue'
import { Progress } from '@fex-design/vue/ui/progress'

defineOptions({ name: 'ProgressDynamicExample' })
const value = ref(30)
const decrease = () => { value.value = Math.max(0, value.value - 10) }
const increase = () => { value.value = Math.min(100, value.value + 10) }
</script>

<template>
  <div class="grid w-full max-w-md gap-4">
    <div class="flex items-center gap-6">
      <Progress :value="value" />
      <Progress variant="circle" :value="value" :size="96" :showInfo="true" />
    </div>
    <div class="flex gap-2">
      <button type="button" class="px-3 py-1 text-sm border rounded hover:bg-muted" @click="decrease">
        -10%
      </button>
      <button type="button" class="px-3 py-1 text-sm border rounded hover:bg-muted" @click="increase">
        +10%
      </button>
    </div>
  </div>
</template>
