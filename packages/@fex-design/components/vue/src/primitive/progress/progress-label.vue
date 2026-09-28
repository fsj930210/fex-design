<script setup lang="ts">
import { progressLabelClassName } from "@fex-design/components-styles/progress"
import { cn } from "@fex-design/utils"

defineOptions({ name: "ProgressLabel" })
</script>
<template>
  <span
    data-slot="progress-label"
    :class="cn(progressLabelClassName, $attrs.class as string | undefined)"
  >
    <slot />
  </span>
</template>
