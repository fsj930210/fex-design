<script lang="ts">
  import { getNextTimeOption } from "@fex-design/core/time-picker/navigation";
  import { getTimePickerScrollBehavior } from "@fex-design/core/time-picker/scroll";

  import type {
    TimePeriod,
    TimePickerOption,
  } from "@fex-design/core/time-picker/types";
  import {
    timePickerColumnClassName,
    timePickerColumnItemClassName,
    timePickerColumnSpacerClassName,
    timePickerColumnViewportClassName,
  } from "@fex-design/components-styles/time-picker";
  import { cn } from "@fex-design/utils";
  import { getContext, tick, type ComponentProps, type Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { timePickerContextKey, type TimePickerContext } from "./context";
  import {
    ScrollbarRoot,
    ScrollbarViewport,
    ScrollbarBar,
    ScrollbarTrack,
    ScrollbarThumb,
  } from "../scrollbar";

  type ColumnValue = number | TimePeriod;
  interface Props extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "children" | "onselect"
  > {
    itemClassName?: string;
    itemStyle?: HTMLAttributes<HTMLButtonElement>["style"];
    selectedItemClassName?: string;
    selectedItemStyle?: HTMLAttributes<HTMLButtonElement>["style"];
    scrollbarProps?:
      | Omit<
          ComponentProps<typeof ScrollbarRoot>,
          "children" | "disabled" | "overflow"
        >
      | undefined;
    options: readonly TimePickerOption<ColumnValue>[];
    selectedValue?: ColumnValue | undefined;
    disabled?: boolean | undefined;
    onselect: (value: ColumnValue) => void;
    item?: Snippet<
      [
        {
          item: TimePickerOption<ColumnValue>;
          selected: boolean;
          active: boolean;
        },
      ]
    >;
  }

  let {
    scrollbarProps,
    options,
    selectedValue,
    disabled = false,
    onselect,
    item: renderItem,
    itemClassName,
    itemStyle,
    selectedItemClassName,
    selectedItemStyle,
    class: className,
    onkeydown,
    ...rest
  }: Props = $props();
  const context = getContext<TimePickerContext>(timePickerContextKey);
  if (!context)
    throw new Error("TimePickerColumn must be used inside TimePickerRoot.");
  let listElement = $state<HTMLDivElement | undefined>(undefined);
  const itemElements = new Map<ColumnValue, HTMLButtonElement>();
  let activeValue = $state<ColumnValue>();
  const resolvedDisabled = $derived(context.disabled() || disabled);

  // DOM alignment follows committed values and explicit scroll requests.
  $effect(() => {
    const selected = selectedValue;
    const request = context.snapshot().scrollRequest;
    void tick().then(() => {
      const item =
        selected === undefined ? undefined : itemElements.get(selected);
      if (item && listElement)
        listElement.scrollTo({
          top: item.offsetTop,
          behavior: getTimePickerScrollBehavior(request?.behavior ?? "auto"),
        });
    });
  });

  function move(direction: 1 | -1) {
    const next = getNextTimeOption(
      options,
      activeValue,
      selectedValue,
      direction,
    );
    if (next === undefined) return;
    activeValue = next;
    itemElements.get(next)?.focus();
  }

  function itemRef(node: HTMLButtonElement, value: ColumnValue) {
    itemElements.set(value, node);
    return { destroy: () => itemElements.delete(value) };
  }
</script>

<ScrollbarRoot
  {...rest}
  {...scrollbarProps}
  role="listbox"
  tabindex={resolvedDisabled ? -1 : 0}
  aria-disabled={resolvedDisabled || undefined}
  data-slot="time-picker-column"
  data-disabled={resolvedDisabled ? "true" : undefined}
  class={cn(timePickerColumnClassName, className, scrollbarProps?.class)}
  style={[rest.style, scrollbarProps?.style].filter(Boolean).join(";")}
  disabled={resolvedDisabled}
  onkeydown={(event) => {
    onkeydown?.(event);
    if (event.defaultPrevented || resolvedDisabled || context.readOnly())
      return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      move(event.key === "ArrowDown" ? 1 : -1);
    }
  }}
>
  <ScrollbarViewport
    bind:element={listElement}
    overflow={{ x: "hidden" }}
    class={timePickerColumnViewportClassName}
  >
    {#each options as item (item.value)}
      <button
        use:itemRef={item.value}
        type="button"
        role="option"
        tabindex="-1"
        disabled={resolvedDisabled || item.disabled}
        aria-selected={item.value === selectedValue}
        data-selected={item.value === selectedValue ? "true" : undefined}
        data-active={item.value === activeValue ? "true" : undefined}
        data-disabled={item.disabled ? "true" : undefined}
        class={cn(
          timePickerColumnItemClassName,
          itemClassName,
          Object.is(item.value, selectedValue) && selectedItemClassName,
        )}
        style={[
          itemStyle,
          Object.is(item.value, selectedValue) ? selectedItemStyle : undefined,
        ]
          .filter(Boolean)
          .join(";")}
        onfocus={() => (activeValue = item.value)}
        onclick={() => {
          if (resolvedDisabled || context.readOnly() || item.disabled) return;
          activeValue = item.value;
          onselect(item.value);
        }}
        >{#if renderItem}{@render renderItem({
            item,
            selected: item.value === selectedValue,
            active: item.value === activeValue,
          })}{:else}{item.label}{/if}</button
      >
    {/each}
    <div aria-hidden="true" class={timePickerColumnSpacerClassName}></div>
  </ScrollbarViewport>
  <ScrollbarBar axis="y">
    <ScrollbarTrack axis="y">
      <ScrollbarThumb axis="y" />
    </ScrollbarTrack>
  </ScrollbarBar>
</ScrollbarRoot>
