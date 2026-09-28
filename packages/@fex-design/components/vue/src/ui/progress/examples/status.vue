<script setup lang="ts">
import { Progress } from "@fex-design/vue/ui/progress"
</script>
<template>
  <div class="grid w-full max-w-md gap-3">
    <Progress :value="0" status="pending" />
    <Progress :value="40" status="active" />
    <Progress :value="60" status="active" />
    <Progress :value="100" status="success" />
    <Progress :value="80" status="error" />
  </div>
</template>
