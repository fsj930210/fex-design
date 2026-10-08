<script lang="ts">
  import { progressLineRangeClassName } from "@fex-design/components-styles/progress"
  import { cn } from "@fex-design/utils"
  import { getContext } from "svelte"
  import type { HTMLAttributes } from "svelte/elements"
  import { progressContextKey, type ProgressContext } from "./context"

  interface ProgressRangeProps extends HTMLAttributes<HTMLDivElement> {
    value?: number
    offset?: number
    ref?: HTMLDivElement | null
  }

  let { value, offset, ref = $bindable(null), class: className, style, ...rest }: ProgressRangeProps = $props()
  const { context } = getContext<ProgressContext>(progressContextKey)
  const current = $derived(context())

  const percentage = $derived.by(() => {
    if (value !== undefined) {
      return Math.min(1, Math.max(0, (value - current.min) / (current.max - current.min)))
    }
    return current.percentage
  })

  const rangeStyle = $derived.by(() => {
    const width = percentage !== null ? `width: ${percentage * 100}%;` : ""
    const left = offset !== undefined ? `left: ${offset}%;` : ""
    return `${width} ${left} ${style ?? ""}`
  })
</script>

<div
  bind:this={ref}
  {...rest}
  data-slot="progress-range"
  data-status={current.status}
  class={cn(progressLineRangeClassName, offset !== undefined && 'absolute top-0', className)}
  style={rangeStyle}
></div>
