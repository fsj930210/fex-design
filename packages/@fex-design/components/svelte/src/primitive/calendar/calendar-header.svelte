<script lang="ts">
  import { filterControlledSelectProps } from "@fex-design/core/select/component-props";
  import type { HTMLAttributes } from "svelte/elements";
  import type { ComponentProps, Snippet } from "svelte";
  import {
    getCalendarHeaderState,
    type CalendarHeaderState,
  } from "@fex-design/core/calendar";
  import {
    calendarHeaderClassName,
    calendarHeaderControlsClassName,
    calendarHeaderSelectClassName,
  } from "@fex-design/components-styles/calendar";
  import { cn } from "@fex-design/utils";
  import { useCalendarContext } from "./context";
  import CalendarNavigationButton from "./calendar-navigation-button.svelte";
  import { RadioGroup, RadioButton } from "../radio";
  import { SelectContent, SelectRoot, SelectTrigger } from "../select";
  type Props = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    yearSelectRootProps?:
      | Omit<
          ComponentProps<typeof SelectRoot>,
          | "children"
          | "options"
          | "value"
          | "defaultValue"
          | "multiple"
          | "clearable"
          | "onChange"
          | "onUpdate:value"
        >
      | undefined;
    monthSelectRootProps?:
      | Omit<
          ComponentProps<typeof SelectRoot>,
          | "children"
          | "options"
          | "value"
          | "defaultValue"
          | "multiple"
          | "clearable"
          | "onChange"
          | "onUpdate:value"
        >
      | undefined;
    previousButtonProps?:
      | Omit<
          ComponentProps<typeof CalendarNavigationButton>,
          "children" | "action"
        >
      | undefined;
    nextButtonProps?:
      | Omit<
          ComponentProps<typeof CalendarNavigationButton>,
          "children" | "action"
        >
      | undefined;
    todayButtonProps?:
      | Omit<
          ComponentProps<typeof CalendarNavigationButton>,
          "children" | "action"
        >
      | undefined;
    modeGroupProps?:
      | Omit<
          ComponentProps<typeof RadioGroup>,
          | "children"
          | "value"
          | "defaultValue"
          | "onValueChange"
          | "onUpdate:value"
        >
      | undefined;
    dateModeButtonProps?:
      | Omit<ComponentProps<typeof RadioButton>, "children" | "value">
      | undefined;
    monthModeButtonProps?:
      | Omit<ComponentProps<typeof RadioButton>, "children" | "value">
      | undefined;
    yearSelectTriggerProps?:
      Omit<ComponentProps<typeof SelectTrigger>, "children"> | undefined;
    yearSelectContentProps?: ComponentProps<typeof SelectContent> | undefined;
    monthSelectTriggerProps?:
      Omit<ComponentProps<typeof SelectTrigger>, "children"> | undefined;
    monthSelectContentProps?: ComponentProps<typeof SelectContent> | undefined;
    children?: Snippet<[CalendarHeaderState]>;
  } & { ref?: HTMLDivElement | null };
  let {
    yearSelectRootProps,
    monthSelectRootProps,
    previousButtonProps,
    nextButtonProps,
    todayButtonProps,
    modeGroupProps,
    dateModeButtonProps,
    monthModeButtonProps,
    yearSelectTriggerProps,
    yearSelectContentProps,
    monthSelectTriggerProps,
    monthSelectContentProps,
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: Props = $props();
  const context = useCalendarContext("CalendarHeader");
  const header = $derived(
    getCalendarHeaderState(context.getState(), context.controller),
  );
  const setNumber = (
    value: string | number | readonly (string | number)[] | undefined,
    set: (next: number) => void,
  ) => {
    const next = Array.isArray(value) ? value[0] : value;
    if (next !== undefined) set(Number(next));
  };
</script>

<div
  {...rest}
  bind:this={ref}
  data-slot="calendar-header"
  class={cn(calendarHeaderClassName, className)}
>
  {#if children}{@render children?.(header)}{:else}<div
      class={calendarHeaderControlsClassName}
    >
      <CalendarNavigationButton
        {...previousButtonProps}
        action="previous-panel"
        disabled={!header.canPrevious || previousButtonProps?.disabled === true}
        aria-label={header.locale.previous}
      />
      <CalendarNavigationButton
        {...nextButtonProps}
        action="next-panel"
        disabled={!header.canNext || nextButtonProps?.disabled === true}
        aria-label={header.locale.next}
      />
      <CalendarNavigationButton {...todayButtonProps} action="today"
        >{header.locale.today}</CalendarNavigationButton
      >
      <SelectRoot
        {...filterControlledSelectProps(yearSelectRootProps)}
        multiple={false}
        clearable={false}
        options={header.years}
        value={header.viewDate.year}
        onChange={(value) => setNumber(value, header.setYear)}
      >
        <SelectTrigger
          {...yearSelectTriggerProps}
          class={cn(
            calendarHeaderSelectClassName,
            yearSelectTriggerProps?.class,
          )}
          aria-label={header.locale.year}
        />
        <SelectContent {...yearSelectContentProps} />
      </SelectRoot>
      {#if header.panel === "date"}<SelectRoot
          {...filterControlledSelectProps(monthSelectRootProps)}
          multiple={false}
          clearable={false}
          options={header.months}
          value={header.viewDate.month}
          onChange={(value) => setNumber(value, header.setMonth)}
        >
          <SelectTrigger
            {...monthSelectTriggerProps}
            class={cn(
              calendarHeaderSelectClassName,
              monthSelectTriggerProps?.class,
            )}
            aria-label={header.locale.month}
          />
          <SelectContent {...monthSelectContentProps} />
        </SelectRoot>{/if}
      <RadioGroup
        {...modeGroupProps}
        class={cn("gap-0", modeGroupProps?.class)}
        value={header.panel}
        aria-label={`${header.locale.datePanel}/${header.locale.monthPanel}`}
        onValueChange={(value) => {
          if (value === "date" || value === "month") header.setPanel(value);
        }}
      >
        <RadioButton {...dateModeButtonProps} value="date"
          >{header.locale.datePanel}</RadioButton
        >
        <RadioButton {...monthModeButtonProps} value="month"
          >{header.locale.monthPanel}</RadioButton
        >
      </RadioGroup>
    </div>{/if}
</div>
