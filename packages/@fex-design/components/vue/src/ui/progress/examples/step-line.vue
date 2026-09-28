<script setup lang="ts">
import { Progress } from "@fex-design/vue/ui/progress"
</script>
<template>
  <div class="grid w-full max-w-md gap-3">
    <Progress :value="60" :steps="5" color="var(--info)" />
    <Progress :value="100" :steps="5" color="var(--success)" success />
  </div>
</template>
