<script lang="ts">
  import { progressCircleClassName } from "@fex-design/components-styles/progress"
  import { getProgressGeometry } from "@fex-design/core/progress/progress"
  import { cn } from "@fex-design/utils"
  import { getContext, type Snippet } from "svelte"
  import type { SVGAttributes } from "svelte/elements"
  import { progressContextKey, type ProgressContext } from "./context"

  interface ProgressCircleProps extends SVGAttributes<SVGSVGElement> {
    gapDegree?: number
    children?: Snippet
  }

  let { gapDegree, class: className, style, children, ...rest }: ProgressCircleProps = $props()
  const { context } = getContext<ProgressContext>(progressContextKey)
  const current = $derived(context())
  const size = $derived(current.size ?? 48)
  const geometry = $derived(
    getProgressGeometry({
      value: current.value,
      min: current.min,
      max: current.max,
      size,
      thickness: current.thickness ?? 4,
      variant: current.variant,
      gapDegree,
    })
  )
</script>

<svg
  {...rest}
  viewBox="0 0 {size} {size}"
  width={size}
  height={size}
  data-slot="progress-circle"
  data-status={current.status}
  class={cn(progressCircleClassName, className)}
  style="transform: rotate({geometry.rotation}deg); {style ?? ''}"
>
  {@render children?.()}
</svg>
