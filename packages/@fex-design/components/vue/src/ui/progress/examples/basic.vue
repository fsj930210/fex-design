<script setup lang="ts">
import { Progress } from '@fex-design/vue/ui/progress'
</script>
<template>
  <div class="grid w-full max-w-md gap-4">
    <Progress label="Upload progress" :value="35" :show-info="true" info-placement="top" />
    <Progress :value="65" />
  </div>
</template>
