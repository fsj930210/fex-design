<script lang="ts">
  import type {
    InputNumberFormatter,
    InputNumberParser,
    InputNumberPart,
  } from "@fex-design/core/input-number/types";
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";
  import InputPrefix from "../../primitive/input/input-prefix.svelte";
  import InputSuffix from "../../primitive/input/input-suffix.svelte";
  import InputNumberRoot from "../../primitive/input-number/input-number-root.svelte";
  import InputNumberControl from "../../primitive/input-number/input-number-control.svelte";
  import InputNumberClear from "../../primitive/input-number/input-number-clear.svelte";
  import InputNumberActions from "../../primitive/input-number/input-number-actions.svelte";
  import InputNumberIncrement from "../../primitive/input-number/input-number-increment.svelte";
  import InputNumberDecrement from "../../primitive/input-number/input-number-decrement.svelte";
  interface Props extends Omit<
    HTMLInputAttributes,
    | "value"
    | "onchange"
    | "oninput"
    | "prefix"
    | "min"
    | "max"
    | "step"
    | "readonly"
  > {
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
    parser?: InputNumberParser;
    formatter?: InputNumberFormatter;
    keyboard?: boolean;
    clearable?: boolean;
    controls?: boolean;
    prefix?: Snippet;
    suffix?: Snippet;
    increment?: Snippet;
    decrement?: Snippet;
    onChange?: (event: Event, value: number | undefined) => void;
    classNames?: Partial<Record<InputNumberPart, string>>;
    styles?: Partial<Record<InputNumberPart, string>>;
  }
  let componentProps: Props = $props();
  // svelte-ignore state_referenced_locally -- controlled mode is fixed by initial prop presence
  const controlled = Object.prototype.hasOwnProperty.call(
    componentProps,
    "value",
  );
  // svelte-ignore state_referenced_locally -- destructuring the reactive props proxy is intentional
  let {
    value,
    defaultValue,
    min,
    max,
    step = 1,
    precision,
    parser,
    formatter,
    keyboard = true,
    clearable = false,
    controls = true,
    prefix,
    suffix,
    increment,
    decrement,
    onChange,
    class: className,
    classNames,
    styles,
    disabled,
    readonly,
    ...rest
  }: Props = componentProps;
</script>

<InputNumberRoot
  {controlled}
  {value}
  {defaultValue}
  {min}
  {max}
  {step}
  {precision}
  {parser}
  {formatter}
  {keyboard}
  {disabled}
  readOnly={readonly}
  {onChange}
  class={[classNames?.root, className]}
  style={styles?.root}
>
  {#if prefix}<InputPrefix class={classNames?.prefix} style={styles?.prefix}
      >{@render prefix()}</InputPrefix
    >{/if}
  <InputNumberControl
    {...rest}
    class={classNames?.control}
    style={styles?.control}
  />
  {#if clearable}<InputNumberClear
      class={classNames?.clear}
      style={styles?.clear}
    />{/if}
  {#if suffix}<InputSuffix class={classNames?.suffix} style={styles?.suffix}
      >{@render suffix()}</InputSuffix
    >{/if}
  {#if controls}
    <InputNumberActions class={classNames?.actions} style={styles?.actions}>
      {#if increment}<InputNumberIncrement
          class={classNames?.increment}
          style={styles?.increment}>{@render increment()}</InputNumberIncrement
        >{:else}<InputNumberIncrement
          class={classNames?.increment}
          style={styles?.increment}
        />{/if}
      {#if decrement}<InputNumberDecrement
          class={classNames?.decrement}
          style={styles?.decrement}>{@render decrement()}</InputNumberDecrement
        >{:else}<InputNumberDecrement
          class={classNames?.decrement}
          style={styles?.decrement}
        />{/if}
    </InputNumberActions>
  {/if}
</InputNumberRoot>
