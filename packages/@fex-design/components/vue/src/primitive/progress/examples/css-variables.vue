<script setup lang="ts">
import {
  Progress,
  ProgressLabel,
  ProgressValue,
  ProgressTrack,
  ProgressRange,
} from '@fex-design/vue/primitive/progress'

defineOptions({ name: 'ProgressCssVariablesExample' })
</script>

<template>
  <div class="w-full max-w-md grid gap-4">
    <Progress
      :value="35"
      class="flex w-full flex-col [--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
    >
      <div class="flex w-full items-center justify-between text-sm mb-1.5">
        <ProgressLabel
          class="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
        >
          Upload progress
        </ProgressLabel>
        <ProgressValue
          class="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
        >
          35%
        </ProgressValue>
      </div>
      <div class="flex w-full items-center">
        <ProgressTrack
          class="min-w-0 flex-1 [--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
        >
          <ProgressRange
            class="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
          />
        </ProgressTrack>
      </div>
    </Progress>
    <Progress
      :value="65"
      class="flex w-full flex-col [--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
    >
      <div class="flex w-full items-center">
        <ProgressTrack
          class="min-w-0 flex-1 [--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
        >
          <ProgressRange
            class="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
          />
        </ProgressTrack>
        <ProgressValue
          class="ms-2 shrink-0 text-sm font-medium [--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
        >
          65%
        </ProgressValue>
      </div>
    </Progress>
  </div>
</template>
