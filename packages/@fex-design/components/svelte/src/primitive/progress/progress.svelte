<script lang="ts">
  import { progressRootClassName } from "@fex-design/components-styles/progress"
  import { normalizeProgressValue, resolveProgressStatus } from "@fex-design/core/progress/progress"
  import type {
    ProgressContextValue,
    ProgressStatus,
    ProgressVariant,
  } from "@fex-design/core/progress/types"
  import { cn } from "@fex-design/utils"
  import { setContext, type Snippet } from "svelte"
  import type { HTMLAttributes } from "svelte/elements"
  import { progressContextKey } from "./context"

  interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
    value?: number | null
    min?: number
    max?: number
    variant?: ProgressVariant
    status?: ProgressStatus
    size?: number
    thickness?: number
    ref?: HTMLDivElement | null
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
    ref = $bindable(null),
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
    thickness: resolvedThickness,
    size,
  })

  setContext(progressContextKey, {
    context: () => contextValue,
  })
</script>

<div
  bind:this={ref}
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
