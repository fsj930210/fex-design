<script lang="ts">
  import { usePickerAppearance } from "./appearance-context";
  import type {
    DatePickerInputProps,
    DatePickerEndpointProps,
  } from "./appearance.types";
  import {
    getPickerInputProps,
    getPickerControlProps,
  } from "@fex-design/core/date-picker/safe-props";
  import { getDatePickerInputAttributes } from "@fex-design/core/date-picker/input";

  import {
    getRangePickerInputPlaceholder,
    getRangePickerSeparator,
  } from "@fex-design/core/date-picker/view";
  import type { InputVisualOptions } from "@fex-design/core/input/types";
  import type { Snippet } from "svelte";
  import { untrack } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "@fex-design/utils";
  import CalendarIcon from "@fex-design/svelte/icons/calendar.svelte";
  import {
    InputRoot,
    InputControl,
    InputClear,
    InputPrefix,
    InputSuffix,
  } from "../input";
  import {
    useRangePickerContext,
    type RangePickerContextValue,
  } from "./context";
  import { createPickerTrigger } from "./create-picker-trigger.svelte";
  import {
    datePickerAffixClassName,
    datePickerRangeFieldClassName,
    datePickerRangeTriggerClassName,
    datePickerInputPreviewClassName,
    datePickerRangeInputClassName,
    datePickerRangeInputControlClassName,
    datePickerRangeSeparatorClassName,
  } from "@fex-design/components-styles/date-picker";

  interface Props
    extends Omit<HTMLAttributes<HTMLElement>, "children">, InputVisualOptions {
    children?: Snippet<
      [
        {
          props: HTMLAttributes<HTMLElement>;
          action: ReturnType<typeof createPickerTrigger>["action"];
          state: RangePickerContextValue;
        },
      ]
    >;
    inputProps?: DatePickerInputProps;
    suffix?: Snippet;
    startInputProps?: DatePickerEndpointProps;
    endInputProps?: DatePickerEndpointProps;
    startPlaceholder?: string;
    endPlaceholder?: string;
    separator?: string;
  }
  let {
    children,
    inputProps,
    suffix,
    startInputProps,
    endInputProps,
    startPlaceholder,
    endPlaceholder,
    separator,
    class: className,
    onclick,
    onfocus,
    ...rest
  }: Props = $props();
  const context = useRangePickerContext("RangePickerTrigger");
  const appearance = usePickerAppearance();
  const input = $derived(
    getPickerInputProps(inputProps ?? appearance().inputProps),
  );
  const start = $derived(
    getPickerControlProps(
      input,
      startInputProps ?? appearance().startInputProps,
      true,
    ),
  );
  const end = $derived(
    getPickerControlProps(
      input,
      endInputProps ?? appearance().endInputProps,
      true,
    ),
  );
  const trigger = createPickerTrigger(context);
  const focusRequest = $derived(context.focusRequest);
  // Synchronize the DOM only when core requests an endpoint focus change.
  $effect(() => {
    const request = focusRequest;
    untrack(() => {
      if (request && context.getOpen() && !children)
        trigger.focusInput(request.part);
    });
  });
  function click(event: MouseEvent & { currentTarget: HTMLElement }) {
    onclick?.(event);
    trigger.click(event);
  }
  function focus(event: FocusEvent & { currentTarget: HTMLElement }) {
    onfocus?.(event);
    trigger.focus(event);
  }
</script>

{#if children}
  {@render children({
    props: {
      ...rest,
      ...trigger.props,
      class: cn(
        datePickerRangeTriggerClassName,
        input.classNames?.root,
        input.class,
        className,
      ),
      onclick: click,
      onfocus: focus,
    },
    action: trigger.action,
    state: context,
  })}
{:else}
  <InputRoot
    {...rest}
    size={rest.size ?? input.size ?? "md"}
    variant={rest.variant ?? input.variant ?? "outlined"}
    style={[input.styles?.root, input.style, rest.style]
      .filter(Boolean)
      .join(";")}
    action={trigger.action}
    aria-haspopup="dialog"
    aria-expanded={context.getOpen()}
    data-state={context.getOpen() ? "open" : "closed"}
    class={cn(
      datePickerRangeTriggerClassName,
      input.classNames?.root,
      input.class,
      className,
    )}
    value={""}
    disabled={context.disabled}
    readOnly={true}
    onclick={click}
  >
    <div class={datePickerRangeFieldClassName}>
      {#if input.prefix}<InputPrefix
          class={input.classNames?.prefix}
          style={input.styles?.prefix}>{@render input.prefix()}</InputPrefix
        >{/if}
      <InputRoot
        data-range-part="start"
        value={context.getStartText()}
        disabled={context.disabled}
        readOnly={true}
        class={datePickerRangeInputClassName}
        data-active={context.getOpen() && context.getActivePart() === "start"
          ? "true"
          : undefined}
      >
        <InputControl
          {...getDatePickerInputAttributes(start)}
          class={cn(
            datePickerRangeInputControlClassName,
            context.triggerView.startPreview && datePickerInputPreviewClassName,
            input.classNames?.control,
            start.class,
          )}
          style={[input.styles?.control, start.style].filter(Boolean).join(";")}
          placeholder={getRangePickerInputPlaceholder(
            "start",
            startPlaceholder ?? start.placeholder,
          )}
          onfocus={(event) => {
            start.onfocus?.(event);
            onfocus?.(event);
            trigger.focus(event, "start");
          }}
        />
      </InputRoot>
    </div>
    <span
      aria-hidden="true"
      data-default-separator={separator == null ? "true" : undefined}
      class={cn(
        datePickerRangeSeparatorClassName,
        appearance().classNames?.separator,
      )}
      style={appearance().styles?.separator}
      >{getRangePickerSeparator(separator)}</span
    >
    <div class={datePickerRangeFieldClassName}>
      <InputRoot
        data-range-part="end"
        value={context.getEndText()}
        disabled={context.disabled}
        readOnly={true}
        class={datePickerRangeInputClassName}
        data-active={context.getOpen() && context.getActivePart() === "end"
          ? "true"
          : undefined}
      >
        <InputControl
          {...getDatePickerInputAttributes(end)}
          class={cn(
            datePickerRangeInputControlClassName,
            context.triggerView.endPreview && datePickerInputPreviewClassName,
            input.classNames?.control,
            end.class,
          )}
          style={[input.styles?.control, end.style].filter(Boolean).join(";")}
          placeholder={getRangePickerInputPlaceholder(
            "end",
            endPlaceholder ?? end.placeholder,
          )}
          onfocus={(event) => {
            end.onfocus?.(event);
            onfocus?.(event);
            trigger.focus(event, "end");
          }}
        />
      </InputRoot>
      <div data-slot="date-picker-affix" class={datePickerAffixClassName}>
        <InputSuffix
          class={input.classNames?.suffix}
          style={input.styles?.suffix}
          >{#if suffix ?? input.suffix}{@render (suffix ??
              input.suffix)!()}{:else}<CalendarIcon
              class="size-4"
            />{/if}</InputSuffix
        >
        {#if context.canClear}
          <InputClear
            class={input.classNames?.clear}
            style={input.styles?.clear}
            aria-label="清除日期"
            onpointerdown={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            onclick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              context.clear();
            }}
          />
        {/if}
      </div>
    </div>
  </InputRoot>
{/if}
