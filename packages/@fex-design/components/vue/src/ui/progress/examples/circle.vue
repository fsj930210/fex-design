<script setup lang="ts">
import { Progress } from "@fex-design/vue/ui/progress"
</script>
<template>
  <div class="flex flex-wrap gap-4 items-center">
    <Progress variant="circle" :value="30" :size="96" show-info />
    <Progress variant="circle" :value="70" :size="96" status="active" show-info />
    <Progress variant="circle" :value="100" :size="96" status="success" show-info />
    <Progress variant="circle" :value="50" :size="96" status="error" show-info />
  </div>
</template>
