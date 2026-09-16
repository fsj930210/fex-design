<script lang="ts">
  import {
    convertValueToPercentage,
    getSliderRangeDisabledState,
    isSliderReversed,
  } from "@fex-design/core/slider/utils";
  import { sliderRangeClassName } from "@fex-design/styles/slider";
  import { cn } from "@fex/utils";
  import { getContext } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { sliderContextKey, type SliderContext } from "./context";

  interface SliderRangeProps extends HTMLAttributes<HTMLSpanElement> {}

  let { class: className, style, ...rest }: SliderRangeProps = $props();
  const { snapshot } = getContext<SliderContext>(sliderContextKey);
  const currentSnapshot = $derived(snapshot());
  const disabledState = $derived(
    getSliderRangeDisabledState(
      currentSnapshot.values,
      currentSnapshot.disabledThumbs,
      currentSnapshot.orientation,
      currentSnapshot.direction,
      currentSnapshot.reverse,
    ),
  );
  const rangeStyle = $derived.by(() => {
    const percentages = currentSnapshot.values.map((value) =>
      convertValueToPercentage(value, currentSnapshot.min, currentSnapshot.max),
    );
    const start =
      currentSnapshot.values.length > 1 ? Math.min(...percentages) : 0;
    const endValue = Math.max(...percentages);
    const reversed = isSliderReversed(
      currentSnapshot.orientation,
      currentSnapshot.direction,
      currentSnapshot.reverse,
    );
    const visualStart = reversed ? 100 - endValue : start;
    const end = reversed ? start : 100 - endValue;
    return currentSnapshot.orientation === "vertical"
      ? `bottom: ${visualStart}%; top: ${end}%; background-image:${disabledState.backgroundImage ?? "none"}; ${style ?? ""}`
      : `left: ${visualStart}%; right: ${end}%; background-image:${disabledState.backgroundImage ?? "none"}; ${style ?? ""}`;
  });
</script>

<span
  data-slot="slider-range"
  {...rest}
  data-disabled={currentSnapshot.disabled || disabledState.disabled
    ? "true"
    : undefined}
  data-orientation={currentSnapshot.orientation}
  class={cn(sliderRangeClassName, className)}
  style={rangeStyle}
></span>
