<script lang="ts">
  import { progressCircleTrackClassName } from "@fex-design/components-styles/progress"
  import { getProgressGeometry } from "@fex-design/core/progress/progress"
  import type { ProgressLinecap } from '@fex-design/core/progress/types'
  import { cn } from "@fex-design/utils"
  import { getContext } from "svelte"
  import type { SVGAttributes } from "svelte/elements"
  import { progressContextKey, type ProgressContext } from "./context"

  interface ProgressCircleTrackProps extends SVGAttributes<SVGCircleElement> {
    gapDegree?: number
    trackLinecap?: ProgressLinecap
    ref?: SVGCircleElement | null
  }

  let { gapDegree, trackLinecap, ref = $bindable(null), class: className, style, ...rest }: ProgressCircleTrackProps = $props()
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
</script>

<circle
  bind:this={ref}
  {...rest}
  cx={geometry.center}
  cy={geometry.center}
  r={geometry.radius}
  fill="none"
  stroke="currentColor"
  stroke-width={thickness}
  stroke-dasharray={geometry.trackDasharray}
  stroke-linecap={trackLinecap ?? "round"}
  pathLength={100}
  data-slot="progress-circle-track"
  class={cn(progressCircleTrackClassName, className)}
  style={style}
/>
