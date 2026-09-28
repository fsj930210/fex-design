<script lang="ts">
  import { progressLineRangeClassName } from "@fex-design/components-styles/progress"
  import { getLinearProgressBackground } from "@fex-design/core/progress/progress"
  import type { ProgressColor } from "@fex-design/core/progress/types"
  import { cn } from "@fex-design/utils"
  import { getContext } from "svelte"
  import type { HTMLAttributes } from "svelte/elements"
  import { progressContextKey, type ProgressContext } from "./context"

  interface ProgressRangeProps extends HTMLAttributes<HTMLDivElement> {
    value?: number
    offset?: number
    color?: ProgressColor
  }

  let { value, offset, color, class: className, style, ...rest }: ProgressRangeProps = $props()
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
    const bg = getLinearProgressBackground(color ?? current.color)
    const bgStyle = bg ? `background: ${bg};` : ""
    return `${width} ${left} ${bgStyle} ${style ?? ""}`
  })
</script>

<div
  {...rest}
  data-slot="progress-range"
  data-status={current.status}
  class={cn(progressLineRangeClassName, className)}
  style={rangeStyle}
></div>
