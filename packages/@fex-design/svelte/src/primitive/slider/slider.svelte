<script lang="ts">
  import { createSliderController } from "@fex-design/core/slider/create-slider-controller";
  import type {
    SliderController,
    SliderOrientation,
    SliderSnapshot,
  } from "@fex-design/core/slider/types";
  import { getSliderValueFromPointer } from "@fex-design/core/slider/utils";
  import {
    sliderRootClassName,
    type SliderStyleProps,
  } from "@fex-design/styles/slider";
  import { cn } from "@fex/utils";
  import { setContext, type Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { readableCoreStore } from "../../stores/core-store";
  import { sliderContextKey, type SliderContext } from "./context";

  interface SliderProps
    extends
      Omit<
        HTMLAttributes<HTMLDivElement>,
        "defaultValue" | "children" | "onchange"
      >,
      SliderStyleProps {
    value?: number[] | undefined;
    defaultValue?: number[] | undefined;
    min?: number | undefined;
    max?: number | undefined;
    step?: number | null | undefined;
    marks?: number[] | undefined;
    minStepsBetweenThumbs?: number | undefined;
    orientation?: SliderOrientation | undefined;
    direction?: "ltr" | "rtl" | undefined;
    reverse?: boolean | undefined;
    disabledThumbs?: boolean[] | undefined;
    keyboard?: boolean | undefined;
    draggableRange?: boolean | undefined;
    editable?: boolean | undefined;
    minCount?: number | undefined;
    maxCount?: number | undefined;
    disabled?: boolean | undefined;
    children?: Snippet | undefined;
    onChange?:
      | ((
          value: number[],
          meta: import("@fex-design/core/slider/types").SliderChangeMeta,
        ) => void)
      | undefined;
    onEnd?:
      | ((
          value: number[],
          meta: import("@fex-design/core/slider/types").SliderChangeMeta,
        ) => void)
      | undefined;
  }

  let {
    value,
    defaultValue,
    min = 0,
    max = 100,
    step = 1,
    marks = [],
    minStepsBetweenThumbs = 0,
    orientation = "horizontal",
    direction,
    reverse = false,
    disabledThumbs = [],
    keyboard = true,
    draggableRange = false,
    editable = false,
    minCount = 0,
    maxCount = Number.POSITIVE_INFINITY,
    disabled = false,
    size = "md",
    class: className,
    children,
    onpointerdown,
    onpointermove,
    onpointerup,
    onChange,
    onEnd,
    ...rest
  }: SliderProps = $props();

  let rootElement: HTMLDivElement | undefined;
  let dragRange = false;
  let pointerOffset = 0;
  const options = {
    get value() {
      return value;
    },
    get defaultValue() {
      return defaultValue;
    },
    get min() {
      return min;
    },
    get max() {
      return max;
    },
    get step() {
      return step;
    },
    get marks() {
      return marks;
    },
    get minStepsBetweenThumbs() {
      return minStepsBetweenThumbs;
    },
    get orientation() {
      return orientation;
    },
    get direction() {
      return direction ?? (rest.dir === "rtl" ? "rtl" : "ltr");
    },
    get reverse() {
      return reverse;
    },
    get disabledThumbs() {
      return disabledThumbs;
    },
    get keyboard() {
      return keyboard;
    },
    get draggableRange() {
      return draggableRange;
    },
    get editable() {
      return editable;
    },
    get minCount() {
      return minCount;
    },
    get maxCount() {
      return maxCount;
    },
    get disabled() {
      return disabled;
    },
    onChange: (nextValue, meta) => onChange?.(nextValue, meta),
    onEnd: (nextValue, meta) => onEnd?.(nextValue, meta),
  };
  const controller = createSliderController(options);
  const storeSnapshot = readableCoreStore(controller);
  const snapshot = () => {
    void $storeSnapshot;
    return controller.getSnapshot();
  };
  const currentSnapshot = $derived(snapshot());

  setContext(sliderContextKey, {
    controller,
    snapshot,
  } satisfies SliderContext);
</script>

<div
  {...rest}
  bind:this={rootElement}
  data-disabled={currentSnapshot.disabled || (currentSnapshot.disabledThumbs.length > 0 && currentSnapshot.disabledThumbs.every(Boolean)) ? "true" : undefined}
  data-orientation={currentSnapshot.orientation}
  data-slot="slider"
  data-reverse={currentSnapshot.reverse ? "" : undefined}
  class={cn(
    sliderRootClassName({ size, orientation: currentSnapshot.orientation }),
    className,
  )}
  onpointerdown={(event) => {
    onpointerdown?.(event);
    if (event.defaultPrevented || currentSnapshot.disabled || !rootElement)
      return;
    rootElement.setPointerCapture(event.pointerId);
    const target = event.target as HTMLElement;
    const nextValue = getSliderValueFromPointer(
      event.clientX,
      event.clientY,
      rootElement.getBoundingClientRect(),
      currentSnapshot.min,
      currentSnapshot.max,
      currentSnapshot.orientation,
      currentSnapshot.direction,
      currentSnapshot.reverse,
    );
    const thumbIndex = Number(
      target
        .closest('[data-slot="slider-thumb"]')
        ?.getAttribute("data-index"),
    );
    if (Number.isInteger(thumbIndex)) {
      controller.setActiveIndex(thumbIndex);
      pointerOffset = currentSnapshot.values[thumbIndex]! - nextValue;
    } else pointerOffset = 0;
    dragRange =
      !!target.closest('[data-slot="slider-range"]') &&
      currentSnapshot.draggableRange;
    if (dragRange) controller.startRangeSlide(nextValue);
    else if (
      currentSnapshot.editable &&
      !target.closest('[data-slot="slider-thumb"]')
    )
      controller.addValue(nextValue);
    else
      controller.startSlide(
        Number.isInteger(thumbIndex)
          ? currentSnapshot.values[thumbIndex]!
          : nextValue,
      );
  }}
  onpointermove={(event) => {
    onpointermove?.(event);
    if (
      event.defaultPrevented ||
      currentSnapshot.disabled ||
      !rootElement?.hasPointerCapture(event.pointerId)
    )
      return;
    const nextValue = getSliderValueFromPointer(
      event.clientX,
      event.clientY,
      rootElement.getBoundingClientRect(),
      currentSnapshot.min,
      currentSnapshot.max,
      currentSnapshot.orientation,
      currentSnapshot.direction,
      currentSnapshot.reverse,
    );
    dragRange
      ? controller.moveRangeSlide(nextValue)
      : controller.moveSlide(nextValue + pointerOffset);
  }}
  onpointerup={(event) => {
    onpointerup?.(event);
    if (!rootElement?.hasPointerCapture(event.pointerId)) return;
    rootElement.releasePointerCapture(event.pointerId);
    controller.endSlide();
    dragRange = false;
  }}
  onpointercancel={() => {
    dragRange = false;
    controller.cancelSlide();
  }}
  onlostpointercapture={() => {
    dragRange = false;
    controller.cancelSlide();
  }}
>
  {@render children?.()}
</div>
