<script lang="ts">
  import { progressCircleRangeClassName } from "@fex-design/components-styles/progress"
  import { getProgressGeometry } from "@fex-design/core/progress/progress"
  import type { ProgressColor } from "@fex-design/core/progress/types"
  import { cn } from "@fex-design/utils"
  import { getContext } from "svelte"
  import type { SVGAttributes } from "svelte/elements"
  import { progressContextKey, type ProgressContext } from "./context"

  interface ProgressCircleRangeProps extends SVGAttributes<SVGCircleElement> {
    color?: ProgressColor
    gapDegree?: number
  }

  let { color, gapDegree, class: className, style, ...rest }: ProgressCircleRangeProps = $props()
  const { context } = getContext<ProgressContext>(progressContextKey)
  const current = $derived(context())
  const size = $derived(current.size ?? 48)
  const thickness = $derived(current.thickness ?? 4)
  const geometry = $derived(
    getProgressGeometry({
      value: current.value,
      min: current.min,
      max: current.max,
      size,
      thickness,
      variant: current.variant,
      gapDegree,
    })
  )
  const strokeColor = $derived.by(() => {
    const c = color ?? current.color
    return typeof c === "string" ? c : "currentColor"
  })
</script>

<circle
  {...rest}
  cx={geometry.center}
  cy={geometry.center}
  r={geometry.radius}
  fill="none"
  stroke={strokeColor}
  stroke-width={thickness}
  stroke-dasharray={geometry.rangeDasharray}
  stroke-dashoffset={geometry.dashOffset}
  stroke-linecap={current.linecap ?? "round"}
  pathLength={100}
  data-slot="progress-circle-range"
  data-status={current.status}
  class={cn(progressCircleRangeClassName, className)}
  style={style}
/>
