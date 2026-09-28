<script setup lang="ts">
import { progressValueClassName } from "@fex-design/components-styles/progress"
import { cn } from "@fex-design/utils"
import { useProgressContext } from "./progress-context"

defineOptions({ name: "ProgressValue" })

const context = useProgressContext("ProgressValue")
</script>
<template>
  <span
    data-slot="progress-value"
    :data-status="context.value.status"
    :class="cn(progressValueClassName, $attrs.class as string | undefined)"
  >
    <slot :value="context.value.value" :percentage="context.value.percentage" />
  </span>
</template>
