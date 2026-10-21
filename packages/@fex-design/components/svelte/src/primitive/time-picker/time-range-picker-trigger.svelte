<script lang="ts">
  import { untrack, type Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { InputSize, InputVariant } from "@fex-design/core/input/types";
  import type { TimeRangePart } from "@fex-design/core/time-picker/range-types";
  import type {
    TimeValue,
    TimePickerController,
  } from "@fex-design/core/time-picker/types";
  import { format } from "@fex-design/core/date/utils";
  import { filterTimePickerInputProps } from "@fex-design/core/time-picker/input-props";
  import { inputControlClassName } from "@fex-design/components-styles/input";
  import {
    timePickerAffixClassName,
    timeRangePickerInputClassName,
  } from "@fex-design/components-styles/time-picker";
  import { cn } from "@fex-design/utils";
  import ClockIcon from "@fex-design/svelte/icons/clock.svelte";
  import { InputRoot, InputPrefix, InputSuffix, InputClear } from "../input";
  import TimePickerTrigger from "./time-picker-trigger.svelte";
  import type { TimePickerInputProps } from "./time-picker-input-props";
  import { getTimeRangePickerContext } from "./time-range-picker-context";
  interface Props {
    class?: string;
    style?: HTMLAttributes<HTMLElement>["style"];
    size?: InputSize;
    variant?: InputVariant;
    dir?: HTMLAttributes<HTMLElement>["dir"];
    startInputProps?: TimePickerInputProps;
    endInputProps?: TimePickerInputProps;
    placeholder?: readonly [string, string];
    allowClear?: boolean;
    prefix?: Snippet;
    suffix?: Snippet;
  }
  let props: Props = $props();
  const { controller, snapshot, options } = getTimeRangePickerContext();
  let startField: HTMLInputElement | undefined = $state();
  let endField: HTMLInputElement | undefined = $state();
  // Synchronize only the core focus request with the endpoint DOM.
  $effect(() => {
    const request = snapshot().focusRequest;
    untrack(() => {
      if (snapshot().open && request)
        (request.part === "start" ? startField : endField)?.focus({
          preventScroll: true,
        });
    });
  });
  const display = (value: TimeValue | null) =>
    value
      ? format(
          value,
          options().format ??
            (options().use12Hours ? "hh:mm:ss A" : "HH:mm:ss"),
        )
      : "";
  const native = (part: TimeRangePart) =>
    filterTimePickerInputProps(
      part === "start" ? props.startInputProps : props.endInputProps,
    );
  function activate(part: TimeRangePart, time: TimePickerController) {
    controller.activate(part);
    const value = controller.getSnapshot().draft[part === "start" ? 0 : 1];
    time.setControlledValue(value);
    time.resetInput();
    time.scrollToValue("auto");
  }
  function open(time: TimePickerController) {
    if (!controller.getSnapshot().open) {
      const current = controller.getSnapshot();
      time.setControlledValue(
        current.draft[current.activePart === "start" ? 0 : 1],
      );
      time.resetInput();
    }
    controller.setOpen(true);
  }
</script>

<TimePickerTrigger>
  {#snippet children({ props: binding, action, state })}
    <InputRoot
      {...binding}
      {action}
      role={undefined}
      onfocusin={undefined}
      onfocusout={undefined}
      value=""
      disabled={options().disabled}
      readOnly={options().readOnly}
      class={props.class}
      style={props.style}
      size={props.size}
      variant={props.variant}
      dir={props.dir}
      onclick={(event) => {
        event.stopPropagation();
        open(state.controller);
      }}
    >
      {#if props.prefix}<InputPrefix>{@render props.prefix()}</InputPrefix>{/if}
      <input
        bind:this={startField}
        {...native("start")}
        type="text"
        data-slot="time-range-input"
        data-range-part="start"
        data-active={(snapshot().open && snapshot().activePart === "start") ||
          undefined}
        class={cn(
          inputControlClassName,
          timeRangePickerInputClassName,
          native("start").class,
        )}
        aria-label={native("start")["aria-label"] ?? "开始时间"}
        placeholder={props.placeholder?.[0] ?? "开始时间"}
        value={snapshot().open && snapshot().activePart === "start"
          ? state.snapshot().inputValue
          : display(snapshot().draft[0])}
        disabled={options().disabled}
        readonly={options().readOnly}
        onfocus={(event) => {
          native("start").onfocus?.(event);
          activate("start", state.controller);
        }}
        onblur={(event) => {
          native("start").onblur?.(event);
          state.controller.resetInput();
        }}
        oninput={(event) => state.controller.input(event.currentTarget.value)}
      />
      <span aria-hidden="true" class="shrink-0 text-muted-foreground">→</span>
      <input
        bind:this={endField}
        {...native("end")}
        type="text"
        data-slot="time-range-input"
        data-range-part="end"
        data-active={(snapshot().open && snapshot().activePart === "end") ||
          undefined}
        class={cn(
          inputControlClassName,
          timeRangePickerInputClassName,
          native("end").class,
        )}
        aria-label={native("end")["aria-label"] ?? "结束时间"}
        placeholder={props.placeholder?.[1] ?? "结束时间"}
        value={snapshot().open && snapshot().activePart === "end"
          ? state.snapshot().inputValue
          : display(snapshot().draft[1])}
        disabled={options().disabled}
        readonly={options().readOnly}
        onfocus={(event) => {
          native("end").onfocus?.(event);
          activate("end", state.controller);
        }}
        onblur={(event) => {
          native("end").onblur?.(event);
          state.controller.resetInput();
        }}
        oninput={(event) => state.controller.input(event.currentTarget.value)}
      />
      <div data-slot="time-picker-affix" class={timePickerAffixClassName}>
        <InputSuffix
          >{#if props.suffix}{@render props.suffix()}{:else}<ClockIcon
              class="size-4"
            />{/if}</InputSuffix
        >
        {#if props.allowClear !== false && snapshot().draft.some(Boolean) && !options().disabled && !options().readOnly}
          <InputClear
            aria-label="清除时间范围"
            onpointerdown={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            onclick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              state.controller.clear();
              controller.clear();
            }}
          />
        {/if}
      </div>
    </InputRoot>
  {/snippet}
</TimePickerTrigger>
