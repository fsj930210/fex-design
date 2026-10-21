<script setup lang="ts">
import { Progress } from '@fex-design/vue/ui/progress'

defineOptions({ name: 'ProgressCssVariablesExample' })
</script>

<template>
  <div class="grid w-full max-w-md gap-4">
    <Progress
      class="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
      label="Upload progress"
      :value="35"
      infoPlacement="top"
    />
    <Progress
      class="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
      :value="65"
    />
  </div>
</template>
