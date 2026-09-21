<script lang="ts">
  import {
    convertValueToPercentage,
    isSliderReversed,
  } from "@fex-design/core/slider/utils";
  import { sliderThumbClassName } from "@fex-design/components-styles/slider";
  import { cn } from "@fex-design/utils";
  import { getContext } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { sliderContextKey, type SliderContext } from "./context";

  interface SliderThumbProps extends HTMLAttributes<HTMLSpanElement> {
    index?: number | undefined;
    disabled?: boolean | undefined;
  }

  let {
    index = 0,
    disabled = false,
    class: className,
    style,
    onfocus,
    onkeydown,
    onkeyup,
    ...rest
  }: SliderThumbProps = $props();
  const { controller, snapshot } = getContext<SliderContext>(sliderContextKey);
  const currentSnapshot = $derived(snapshot());
  const value = $derived(currentSnapshot.values[index] ?? currentSnapshot.min);
  const percent = $derived(
    convertValueToPercentage(value, currentSnapshot.min, currentSnapshot.max),
  );
  const visualPercent = $derived(
    isSliderReversed(
      currentSnapshot.orientation,
      currentSnapshot.direction,
      currentSnapshot.reverse,
    )
      ? 100 - percent
      : percent,
  );
  const isDisabled = $derived(
    currentSnapshot.disabled ||
      currentSnapshot.disabledThumbs[index] ||
      disabled,
  );
  const thumbStyle = $derived(
    currentSnapshot.orientation === "vertical"
      ? `position: absolute; bottom: ${visualPercent}%; left: 50%; transform: translate(-50%, 50%); ${style ?? ""}`
      : `position: absolute; top: 50%; left: ${visualPercent}%; transform: translate(-50%, -50%); ${style ?? ""}`,
  );

  function handleKeydown(
    event: Parameters<NonNullable<SliderThumbProps["onkeydown"]>>[0],
  ) {
    onkeydown?.(event);
    if (event.defaultPrevented || isDisabled || !currentSnapshot.keyboard)
      return;
    const keyMap: Record<string, number> = {
      ArrowRight: 1,
      ArrowUp: 1,
      ArrowLeft: -1,
      ArrowDown: -1,
      PageUp: 10,
      PageDown: -10,
    };
    if (event.key === "Home") {
      event.preventDefault();
      controller.setValueAt(index, currentSnapshot.min, { source: "keyboard" });
    } else if (event.key === "End") {
      event.preventDefault();
      controller.setValueAt(index, currentSnapshot.max, { source: "keyboard" });
    } else if (event.key in keyMap) {
      event.preventDefault();
      const direction = keyMap[event.key]!;
      const visualDirection =
        isSliderReversed(
          currentSnapshot.orientation,
          currentSnapshot.direction,
          currentSnapshot.reverse,
        ) && event.key.startsWith("Arrow")
          ? -direction
          : direction;
      controller.stepThumb(
        index,
        visualDirection > 0 ? 1 : -1,
        Math.abs(visualDirection),
      );
    }
  }
</script>

<span
  {...rest}
  data-slot="slider-thumb"
  data-index={index}
  role="slider"
  tabindex={isDisabled ? undefined : 0}
  aria-valuemin={currentSnapshot.min}
  aria-valuemax={currentSnapshot.max}
  aria-valuenow={value}
  aria-orientation={currentSnapshot.orientation}
  aria-disabled={isDisabled || undefined}
  data-disabled={isDisabled ? "" : undefined}
  data-orientation={currentSnapshot.orientation}
  class={cn(sliderThumbClassName, className)}
  style={thumbStyle}
  onfocus={(event) => {
    onfocus?.(event);
    controller.setActiveIndex(index);
  }}
  onkeydown={handleKeydown}
  onkeyup={(event) => {
    onkeyup?.(event);
    controller.endSlide();
  }}
></span>
