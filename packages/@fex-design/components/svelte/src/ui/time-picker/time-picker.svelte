<script lang="ts">
  import type {
    TimePickerClassNames,
    TimePickerStyles,
  } from "@fex-design/core/time-picker/types";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "@fex-design/utils";
  import type { ComponentProps, Snippet } from "svelte";
  import { analyzeTimeFormat } from "@fex-design/core/date/utils";
  import {
    TimePickerRoot,
    TimePickerTrigger,
    TimePickerPortal,
    TimePickerContent,
    TimePickerPanel,
    TimePickerHourColumn,
    TimePickerMinuteColumn,
    TimePickerSecondColumn,
    TimePickerPeriodColumn,
  } from "@fex-design/svelte/primitive/time-picker";
  type Props = Omit<ComponentProps<typeof TimePickerRoot>, "children"> &
    Pick<
      ComponentProps<typeof TimePickerTrigger>,
      | "class"
      | "style"
      | "size"
      | "variant"
      | "placeholder"
      | "allowClear"
      | "invalid"
      | "prefix"
      | "suffix"
      | "inputProps"
    > & {
      "aria-invalid"?: string | boolean | undefined;
      "data-warning"?: string | undefined;
      hourColumnProps?:
        | Omit<ComponentProps<typeof TimePickerHourColumn>, "children">
        | undefined;
      minuteColumnProps?:
        | Omit<ComponentProps<typeof TimePickerMinuteColumn>, "children">
        | undefined;
      secondColumnProps?:
        | Omit<ComponentProps<typeof TimePickerSecondColumn>, "children">
        | undefined;
      periodColumnProps?:
        | Omit<ComponentProps<typeof TimePickerPeriodColumn>, "children">
        | undefined;
      panelProps?:
        Omit<ComponentProps<typeof TimePickerPanel>, "children"> | undefined;
      contentProps?:
        Omit<ComponentProps<typeof TimePickerContent>, "children"> | undefined;
      classNames?: TimePickerClassNames;
      styles?: TimePickerStyles<HTMLAttributes<HTMLElement>["style"]>;
      step?: { hour?: number; minute?: number; second?: number };
      trigger?: ComponentProps<typeof TimePickerTrigger>["children"];
      panel?: Snippet<[Snippet]>;
      footer?: Snippet;
    };
  let {
    panelProps,
    hourColumnProps,
    minuteColumnProps,
    secondColumnProps,
    periodColumnProps,
    contentProps,
    classNames,
    styles,
    class: className,
    style,
    size,
    variant,
    placeholder,
    allowClear,
    invalid,
    "aria-invalid": ariaInvalid,
    "data-warning": dataWarning,
    prefix,
    suffix,
    inputProps,
    step,
    trigger,
    panel,
    footer,
    ...options
  }: Props = $props();
  const columns = $derived(
    analyzeTimeFormat(
      options.format ?? (options.use12Hours ? "hh:mm:ss A" : "HH:mm:ss"),
      options.use12Hours,
    ).columns,
  );
</script>

<TimePickerRoot {...options}>
  <TimePickerTrigger
    class={cn(classNames?.root, className)}
    style={[styles?.root, style].filter(Boolean).join(";")}
    {size}
    {variant}
    {placeholder}
    {allowClear}
    {invalid}
    aria-invalid={ariaInvalid}
    data-warning={dataWarning}
    {prefix}
    {suffix}
    inputProps={{
      ...inputProps,
      class: cn(classNames?.input, inputProps?.class),
      style: [styles?.input, inputProps?.style].filter(Boolean).join(";"),
    }}
    children={trigger}
  />
  <TimePickerPortal
    ><TimePickerContent
      {...contentProps}
      class={cn(classNames?.popup, contentProps?.class)}
      style={[styles?.popup, contentProps?.style].filter(Boolean).join(";")}
    >
      {#snippet defaultPanel()}<TimePickerPanel
          {...panelProps}
          class={cn(classNames?.panel, panelProps?.class)}
          style={[styles?.panel, panelProps?.style].filter(Boolean).join(";")}
          >{#each columns as column (column.unit)}
            {#if column.unit === "hour"}<TimePickerHourColumn
                class={classNames?.column}
                style={styles?.column}
                itemClassName={classNames?.item}
                itemStyle={styles?.item}
                selectedItemClassName={classNames?.selectedItem}
                selectedItemStyle={styles?.selectedItem}
                step={step?.hour}
                {...hourColumnProps}
              />
            {:else if column.unit === "minute"}<TimePickerMinuteColumn
                class={classNames?.column}
                style={styles?.column}
                itemClassName={classNames?.item}
                itemStyle={styles?.item}
                selectedItemClassName={classNames?.selectedItem}
                selectedItemStyle={styles?.selectedItem}
                step={step?.minute}
                {...minuteColumnProps}
              />
            {:else if column.unit === "second"}<TimePickerSecondColumn
                class={classNames?.column}
                style={styles?.column}
                itemClassName={classNames?.item}
                itemStyle={styles?.item}
                selectedItemClassName={classNames?.selectedItem}
                selectedItemStyle={styles?.selectedItem}
                step={step?.second}
                {...secondColumnProps}
              />
            {:else}<TimePickerPeriodColumn
                class={classNames?.column}
                style={styles?.column}
                itemClassName={classNames?.item}
                itemStyle={styles?.item}
                selectedItemClassName={classNames?.selectedItem}
                selectedItemStyle={styles?.selectedItem}
                {...periodColumnProps}
              />{/if}
          {/each}</TimePickerPanel
        >{/snippet}
      {#if panel}{@render panel(
          defaultPanel,
        )}{:else}{@render defaultPanel()}{/if}
      {@render footer?.()}
    </TimePickerContent></TimePickerPortal
  >
</TimePickerRoot>
