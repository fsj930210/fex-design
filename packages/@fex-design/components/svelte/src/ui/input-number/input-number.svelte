<script lang="ts">
  import type {
    InputNumberFormatter,
    InputNumberParser,
    InputNumberPart,
  } from "@fex-design/core/input-number/types";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";
  import InputPrefix from '@fex-design/svelte/primitive/input/input-prefix.svelte';
  import InputSuffix from '@fex-design/svelte/primitive/input/input-suffix.svelte';
  import InputNumberRoot from '@fex-design/svelte/primitive/input-number/input-number-root.svelte';
  import InputNumberControl from '@fex-design/svelte/primitive/input-number/input-number-control.svelte';
  import InputNumberClear from '@fex-design/svelte/primitive/input-number/input-number-clear.svelte';
  import InputNumberActions from '@fex-design/svelte/primitive/input-number/input-number-actions.svelte';
  import InputNumberIncrement from '@fex-design/svelte/primitive/input-number/input-number-increment.svelte';
  import InputNumberDecrement from '@fex-design/svelte/primitive/input-number/input-number-decrement.svelte';
  interface Props extends Omit<
    HTMLInputAttributes,
    | "value"
    | "defaultValue"
    | "type"
    | "onchange"
    | "oninput"
    | "prefix"
    | "min"
    | "max"
    | "step"
    | "readonly"
    | "size"
  > {
    size?: "sm" | "md" | "lg" | undefined;
    variant?: "outlined" | "filled" | "borderless" | "underlined" | undefined;
    value?: number | undefined;
    defaultValue?: number | undefined;
    min?: number | undefined;
    max?: number | undefined;
    step?: number | undefined;
    precision?: number | undefined;
    parser?: InputNumberParser | undefined;
    formatter?: InputNumberFormatter | undefined;
    keyboard?: boolean | undefined;
    clearable?: boolean | undefined;
    controls?: boolean | undefined;
    prefix?: Snippet | undefined;
    suffix?: Snippet | undefined;
    increment?: Snippet | undefined;
    decrement?: Snippet | undefined;
    onChange?: ((event: Event, value: number | undefined) => void) | undefined;
    classNames?: Partial<Record<InputNumberPart, string>> | undefined;
    styles?: Partial<Record<InputNumberPart, string>> | undefined;
  }
  let componentProps: Props = $props();
  // svelte-ignore state_referenced_locally -- controlled mode is fixed by initial prop presence
  const controlled = Object.prototype.hasOwnProperty.call(
    componentProps,
    "value",
  );
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
    style,
    size,
    variant,
    disabled,
    readonly,
    ...rest
  }: Props = $derived(componentProps);
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
  {size}
  {variant}
  readOnly={readonly}
  {onChange}
  class={cn(classNames?.root, className)}
  style={[styles?.root, style].filter(Boolean).map((value) => value?.trim().replace(/;?$/, ';')).join(' ')}
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
