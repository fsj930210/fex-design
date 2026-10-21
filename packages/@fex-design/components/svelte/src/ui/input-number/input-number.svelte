<script lang="ts">
  import type {
    InputNumberFormatter,
    InputNumberParser,
    InputNumberPart,
  } from "@fex-design/core/input-number/types";
  import { cn } from "@fex-design/utils";
  import type { ComponentProps, Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";
  import InputPrefix from "@fex-design/svelte/primitive/input/input-prefix.svelte";
  import InputSuffix from "@fex-design/svelte/primitive/input/input-suffix.svelte";
  import InputNumberRoot from "@fex-design/svelte/primitive/input-number/input-number-root.svelte";
  import InputNumberControl from "@fex-design/svelte/primitive/input-number/input-number-control.svelte";
  import InputNumberClear from "@fex-design/svelte/primitive/input-number/input-number-clear.svelte";
  import InputNumberActions from "@fex-design/svelte/primitive/input-number/input-number-actions.svelte";
  import InputNumberIncrement from "@fex-design/svelte/primitive/input-number/input-number-increment.svelte";
  import InputNumberDecrement from "@fex-design/svelte/primitive/input-number/input-number-decrement.svelte";
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
    controlProps?:
      Omit<ComponentProps<typeof InputNumberControl>, "children"> | undefined;
    actionsProps?:
      Omit<ComponentProps<typeof InputNumberActions>, "children"> | undefined;
    incrementProps?:
      Omit<ComponentProps<typeof InputNumberIncrement>, "children"> | undefined;
    decrementProps?:
      Omit<ComponentProps<typeof InputNumberDecrement>, "children"> | undefined;
    clearProps?:
      Omit<ComponentProps<typeof InputNumberClear>, "children"> | undefined;
    prefixProps?:
      Omit<ComponentProps<typeof InputPrefix>, "children"> | undefined;
    suffixProps?:
      Omit<ComponentProps<typeof InputSuffix>, "children"> | undefined;
    prefix?: Snippet | undefined;
    suffix?: Snippet | undefined;
    increment?: Snippet | undefined;
    decrement?: Snippet | undefined;
    onChange?: ((event: Event, value: number | undefined) => void) | undefined;
    classNames?: Partial<Record<InputNumberPart, string>> | undefined;
    styles?: Partial<Record<InputNumberPart, string>> | undefined;
    "data-warning"?: string | undefined;
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
    controlProps,
    actionsProps,
    incrementProps,
    decrementProps,
    clearProps,
    prefixProps,
    suffixProps,
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
    "data-warning": dataWarning,
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
  data-warning={dataWarning}
  class={cn(classNames?.root, className)}
  style={[styles?.root, style]
    .filter(Boolean)
    .map((value) => value?.trim().replace(/;?$/, ";"))
    .join(" ")}
>
  {#if prefix}<InputPrefix
      {...prefixProps}
      class={cn(classNames?.prefix, prefixProps?.class)}
      style={[styles?.prefix, prefixProps?.style].filter(Boolean).join(";")}
      >{@render prefix()}</InputPrefix
    >{/if}
  <InputNumberControl
    {...controlProps}
    {...rest}
    class={cn(classNames?.control, controlProps?.class)}
    style={[styles?.control, controlProps?.style].filter(Boolean).join(";")}
  />
  {#if clearable}<InputNumberClear
      {...clearProps}
      class={cn(classNames?.clear, clearProps?.class)}
      style={[styles?.clear, clearProps?.style].filter(Boolean).join(";")}
    />{/if}
  {#if suffix}<InputSuffix
      {...suffixProps}
      class={cn(classNames?.suffix, suffixProps?.class)}
      style={[styles?.suffix, suffixProps?.style].filter(Boolean).join(";")}
      >{@render suffix()}</InputSuffix
    >{/if}
  {#if controls}
    <InputNumberActions
      {...actionsProps}
      class={cn(classNames?.actions, actionsProps?.class)}
      style={[styles?.actions, actionsProps?.style].filter(Boolean).join(";")}
    >
      {#if increment}<InputNumberIncrement
          {...incrementProps}
          class={cn(classNames?.increment, incrementProps?.class)}
          style={[styles?.increment, incrementProps?.style]
            .filter(Boolean)
            .join(";")}>{@render increment()}</InputNumberIncrement
        >{:else}<InputNumberIncrement
          {...incrementProps}
          class={cn(classNames?.increment, incrementProps?.class)}
          style={[styles?.increment, incrementProps?.style]
            .filter(Boolean)
            .join(";")}
        />{/if}
      {#if decrement}<InputNumberDecrement
          {...decrementProps}
          class={cn(classNames?.decrement, decrementProps?.class)}
          style={[styles?.decrement, decrementProps?.style]
            .filter(Boolean)
            .join(";")}>{@render decrement()}</InputNumberDecrement
        >{:else}<InputNumberDecrement
          {...decrementProps}
          class={cn(classNames?.decrement, decrementProps?.class)}
          style={[styles?.decrement, decrementProps?.style]
            .filter(Boolean)
            .join(";")}
        />{/if}
    </InputNumberActions>
  {/if}
</InputNumberRoot>
