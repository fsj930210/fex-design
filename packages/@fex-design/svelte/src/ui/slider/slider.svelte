<script lang="ts">
  import type {
    SliderChangeMeta,
    SliderPart,
  } from "@fex-design/core/slider/types";
  import type { HTMLAttributes } from "svelte/elements";
  import {
    SliderMark,
    SliderRange,
    SliderRoot,
    SliderThumb,
    SliderTrack,
  } from "../../primitive/slider/slider";
  type Mark = { value: number; label?: string; class?: string; style?: string };
  interface Props extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onchange" | "defaultValue"
  > {
    value?: number | number[];
    defaultValue?: number | number[];
    min?: number;
    max?: number;
    step?: number | null;
    marks?: Mark[];
    dots?: boolean;
    included?: boolean;
    orientation?: "horizontal" | "vertical";
    direction?: "ltr" | "rtl";
    reverse?: boolean;
    disabled?: boolean | boolean[];
    keyboard?: boolean;
    minStepsBetweenThumbs?: number;
    draggableRange?: boolean;
    editable?: boolean;
    minCount?: number;
    maxCount?: number;
    size?: "sm" | "md" | "lg";
    classNames?: Partial<Record<SliderPart, string>>;
    styles?: Partial<Record<SliderPart, string>>;
    onChange?: (value: number | number[], meta: SliderChangeMeta) => void;
    onEnd?: (value: number | number[], meta: SliderChangeMeta) => void;
  }
  let {
    value,
    defaultValue,
    min = 0,
    max = 100,
    step = 1,
    marks = [],
    dots = false,
    included = true,
    orientation = "horizontal",
    direction = "ltr",
    reverse = false,
    disabled = false,
    keyboard = true,
    minStepsBetweenThumbs = 0,
    draggableRange = false,
    editable = false,
    minCount = 0,
    maxCount = Number.POSITIVE_INFINITY,
    size = "md",
    classNames = {},
    styles = {},
    onChange,
    onEnd,
    class: className,
    style,
    ...rest
  }: Props = $props();
  const values = $derived(typeof value === "number" ? [value] : value);
  const defaults = $derived(
    typeof defaultValue === "number" ? [defaultValue] : defaultValue,
  );
  let internalValues = $state<number[]>([]);
  const currentValues = $derived(
    values ?? (internalValues.length ? internalValues : (defaults ?? [min])),
  );
  const count = $derived(currentValues.length);
  const disabledThumbs = $derived(Array.isArray(disabled) ? disabled : []);
  const dotValues = $derived(
    dots && step
      ? Array.from(
          { length: Math.floor((max - min) / step) + 1 },
          (_, index) => min + index * step,
        )
      : [],
  );
  const returnValue = (next: number[]) =>
    typeof value === "number" || typeof defaultValue === "number"
      ? next[0]!
      : next;
</script>

<SliderRoot
  {...rest}
  value={values}
  defaultValue={defaults}
  {min}
  {max}
  {step}
  marks={marks.map((mark) => mark.value)}
  {orientation}
  {direction}
  {reverse}
  disabled={disabled === true}
  {disabledThumbs}
  {keyboard}
  {minStepsBetweenThumbs}
  {draggableRange}
  {editable}
  {minCount}
  {maxCount}
  {size}
  class={[className, classNames.root].filter(Boolean).join(" ")}
  style={`${style ?? ""};${styles.root ?? ""}`}
  onChange={(next, meta) => {
    if (next.length !== currentValues.length) internalValues = next;
    onChange?.(returnValue(next), meta);
  }}
  onEnd={(next, meta) => onEnd?.(returnValue(next), meta)}
>
  <SliderTrack class={classNames.track} style={styles.track}>
    {#if included}<SliderRange
        class={classNames.range}
        style={styles.range}
      />{/if}
    {#each dotValues as dot (dot)}<SliderMark
        value={dot}
        aria-hidden="true"
      />{/each}
    {#each marks as mark (mark.value)}<SliderMark
        value={mark.value}
        class={[classNames.mark, mark.class].filter(Boolean).join(" ")}
        style={`${styles.mark ?? ""};${mark.style ?? ""}`}
        >{mark.label}</SliderMark
      >{/each}
  </SliderTrack>
  {#each Array(count) as _, index}<SliderThumb
      {index}
      disabled={disabledThumbs[index]}
      class={classNames.thumb}
      style={styles.thumb}
      aria-label={`滑块 ${index + 1}`}
    />{/each}
</SliderRoot>
