<script lang="ts">
  import { progressRootClassName } from "@fex-design/components-styles/progress"
  import { normalizeProgressValue, resolveProgressStatus } from "@fex-design/core/progress/progress"
  import type {
    ProgressContextValue,
    ProgressColor,
    ProgressLinecap,
    ProgressStatus,
    ProgressVariant,
  } from "@fex-design/core/progress/types"
  import { cn } from "@fex-design/utils"
  import { setContext, type Snippet } from "svelte"
  import type { HTMLAttributes } from "svelte/elements"
  import { progressContextKey } from "./context"
  import ProgressCircleRange from "./progress-circle-range.svelte"
  import ProgressCircleTrack from "./progress-circle-track.svelte"
  import ProgressCircle from "./progress-circle.svelte"
  import ProgressRange from "./progress-range.svelte"
  import ProgressTrack from "./progress-track.svelte"
  import ProgressValue from "./progress-value.svelte"

  interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
    value?: number | null
    min?: number
    max?: number
    variant?: ProgressVariant
    status?: ProgressStatus
    size?: number
    thickness?: number
    linecap?: ProgressLinecap
    trackLinecap?: ProgressLinecap
    color?: ProgressColor
    trackColor?: string
    gapDegree?: number
    gapPlacement?: "top" | "bottom" | "start" | "end"
    children?: Snippet
  }

  let {
    value = 0,
    min = 0,
    max = 100,
    variant = "line",
    status,
    size = 48,
    thickness,
    linecap = "round",
    trackLinecap,
    color,
    trackColor,
    gapDegree,
    gapPlacement = "bottom",
    class: className,
    children,
    ...rest
  }: ProgressProps = $props()

  const normalized = $derived(normalizeProgressValue(value, min, max))
  const resolvedThickness = $derived(thickness ?? (variant === "line" ? 8 : 4))
  const resolvedStatus = $derived(resolveProgressStatus(status, value, min, max))

  const contextValue = $derived<ProgressContextValue>({
    value: normalized.value,
    min: normalized.min,
    max: normalized.max,
    percentage: normalized.percentage,
    status: resolvedStatus,
    variant,
    status,
    thickness: resolvedThickness,
    color,
    trackColor,
    linecap,
    trackLinecap,
    size,
  })

  setContext(progressContextKey, {
    context: () => contextValue,
  })
</script>

<div
  {...rest}
  role="progressbar"
  aria-valuemin={normalized.min}
  aria-valuemax={normalized.max}
  aria-valuenow={normalized.value ?? undefined}
  aria-valuetext={normalized.percentage !== null
    ? `${Math.round(normalized.percentage * 100)}%`
    : undefined}
  data-slot="progress"
  data-status={resolvedStatus}
  data-variant={variant}
  class={cn(progressRootClassName, className)}
>
  {#if children}{@render children()}{/if}
</div>
