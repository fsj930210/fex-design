<script lang="ts">
  import {
    convertValueToPercentage,
    isSliderMarkActive,
    isSliderReversed,
  } from "@fex-design/core/slider/utils";
  import { sliderMarkClassName } from "@fex-design/styles/slider";
  import { cn } from "@fex/utils";
  import { getContext, type Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { sliderContextKey, type SliderContext } from "./context";
  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    value: number;
    children?: Snippet;
  }
  let { value, class: className, style, children, ...rest }: Props = $props();
  const { snapshot } = getContext<SliderContext>(sliderContextKey);
  const current = $derived(snapshot());
  const percent = $derived(
    convertValueToPercentage(value, current.min, current.max),
  );
  const visual = $derived(
    isSliderReversed(current.orientation, current.direction, current.reverse)
      ? 100 - percent
      : percent,
  );
  const placement = $derived(
    current.orientation === "vertical"
      ? `bottom:${visual}%;`
      : `left:${visual}%;`,
  );
</script>

<span
  {...rest}
  data-slot="slider-mark"
  data-active={isSliderMarkActive(current.values, value) ? "true" : "false"}
  data-edge={visual === 0 ? "start" : visual === 100 ? "end" : undefined}
  data-orientation={current.orientation}
  class={cn(sliderMarkClassName, className)}
  style={`${placement}${style ?? ""}`}><span>{@render children?.()}</span></span
>
