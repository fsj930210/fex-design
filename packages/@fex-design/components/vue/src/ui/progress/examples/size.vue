<script setup lang="ts">
import { Progress } from '@fex-design/vue/ui/progress'

defineOptions({ name: 'ProgressSizeExample' })

</script>

<template>
  <div class="grid w-full max-w-md gap-3">
    <Progress :value="30" :thickness="4" />
    <Progress :value="50" :thickness="8" />
    <Progress :value="70" :thickness="12" />
  </div>
</template>
