<script setup lang="ts">
import { Progress } from "@fex-design/vue/ui/progress"
</script>
<template>
  <div class="flex gap-6 items-center">
    <Progress variant="circle" :value="60" :steps="10" :gap="2" color="var(--info)" show-info />
    <Progress variant="circle" :value="100" :steps="10" :gap="2" color="var(--success)" success show-info />
  </div>
</template>
