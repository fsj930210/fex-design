<script setup lang="ts">
import { Progress } from "@fex-design/vue/ui/progress"
</script>
<template>
  <div class="flex gap-6 items-center">
    <Progress variant="dashboard" :value="75" :gap-degree="90" gap-placement="bottom" :size="96" show-info />
    <Progress variant="dashboard" :value="75" :gap-degree="90" gap-placement="top" :size="96" show-info />
  </div>
</template>
