<script lang="ts">
  import type { InputClassNames, InputStyles } from '@fex-design/core/input/types';
  import type { SelectOption } from "@fex-design/core/select/types";
  import {
    selectClearClassName,
    selectClearableIndicatorClassName,
    selectIndicatorClassName,
    selectInputClassName,
    selectSuffixClassName,
    selectTriggerClassName,
    selectValueContainerClassName,
  } from "@fex-design/components-styles/select";
  import { cn } from "@fex-design/utils";
  import { getContext, type Snippet } from "svelte";
  import type { HTMLAttributes, HTMLInputAttributes } from "svelte/elements";
  import ChevronRight from '@fex-design/svelte/icons/chevron-right.svelte';
  import CircleXIcon from '@fex-design/svelte/icons/circle-x.svelte';
  import LoadingIcon from '@fex-design/svelte/icons/loading.svelte';
  import PopoverTrigger from "../popover/popover-trigger.svelte";
  import SelectValue from "./select-value.svelte";
  import { selectContextKey, type SelectContext } from "./context";
  interface Props extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "class" | "children" | "prefix"
  > {
    class?: string;
    placeholder?: string;
    maxTagCount?: number;
    prefix?: Snippet;
    suffix?: Snippet;
    clear?: Snippet;
    inputProps?: HTMLInputAttributes;
    classNames?: InputClassNames;
    styles?: InputStyles<string>;
    tag?: Snippet<[SelectOption, () => void]>;
  }
  let {
    class: className,
    placeholder = "请选择",
    maxTagCount,
    prefix,
    suffix,
    clear,
    inputProps = {},
    tag,
    classNames,
    styles,
    ...rest
  }: Props = $props();
  const select = getContext<SelectContext>(selectContextKey),
    snapshot = select.snapshot;
  const selected = () => {
    void $snapshot.selectedValues;
    return select.selectedOptions();
  };
  const inputAttributes = () => { const { class: _class, style: _style, ...attrs } = inputProps; return attrs; };
  function keydown(event: KeyboardEvent) {
    rest.onkeydown?.(event as Parameters<NonNullable<typeof rest.onkeydown>>[0]);
    if (event.defaultPrevented) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      select.controller.open();
      select.controller.moveActive(event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      select.controller.moveActiveTo(event.key === "Home" ? "first" : "last");
    } else if (event.key === "Enter") {
      event.preventDefault();
      select.controller.selectActive();
    } else if (event.key === "Backspace" && !$snapshot.searchValue)
      select.controller.removeLastSelected();
    else if (event.key === "Escape") select.controller.close();
  }
  function inputPointerdown() {
    select.controller.open();
  }
  function bridge<T extends Event>(
    handler: ((event: T) => void) | null | undefined,
    event: T,
  ) {
    handler?.(event);
  }
</script>

<PopoverTrigger
  >{#snippet children(slot)}
    <div
      {...rest}
      use:slot.action
      data-slot="select-trigger"
      data-disabled={select.disabled() || undefined}
      data-clearable={select.clearable() && selected().length ? "true" : undefined}
      data-status={select.status()}
      aria-invalid={select.status() === "error" || undefined}
      aria-expanded={$snapshot.open}
      class={cn(selectTriggerClassName(), classNames?.root, className)}
      style={[styles?.root, inputProps.style].filter(Boolean).join(';')}
      onclick={(event) => bridge(slot.props.onclick, event as never)}
      onpointerenter={(event) =>
        bridge(slot.props.onpointerenter, event as never)}
      onpointerleave={(event) =>
        bridge(slot.props.onpointerleave, event as never)}
      onfocus={(event) => bridge(slot.props.onfocus, event as never)}
      onblur={(event) => bridge(slot.props.onblur, event as never)}
      oncontextmenu={(event) =>
        bridge(slot.props.oncontextmenu, event as never)}
      onkeydown={keydown}
    >
      {@render prefix?.()}
      <div class={cn(selectValueContainerClassName, classNames?.control)}>
        <SelectValue {placeholder} {maxTagCount} {tag} />
        <input
          {...inputAttributes()}
          role="combobox"
          aria-expanded={$snapshot.open}
          aria-controls={select.listId}
          disabled={select.disabled()}
          readonly={!select.showSearch()}
          placeholder={select.showSearch() && !selected().length
            ? placeholder
            : undefined}
          value={$snapshot.searchValue}
          class={cn(
            selectInputClassName,
            classNames?.control,
            inputProps.class,
            !select.showSearch() &&
              "absolute size-px min-w-0 overflow-hidden opacity-0",
          )}
          style={styles?.control}
          onfocus={() => select.controller.open()}
          onpointerdown={inputPointerdown}
          onclick={(event) => event.stopPropagation()}
          oninput={(event) => {
            select.controller.setSearchValue(event.currentTarget.value);
            select.controller.open();
          }}
        />
      </div>
      <span data-slot="select-suffix" class={cn(selectSuffixClassName, classNames?.suffix)}
        >{#if select.loading()}<LoadingIcon
            class="animate-spin"
          />{:else}<span class={select.clearable() && selected().length ? selectClearableIndicatorClassName : undefined}
          >{#if suffix}{@render suffix()}{:else}<span
            data-state={$snapshot.open ? "open" : "closed"}
            class={selectIndicatorClassName}
            ><ChevronRight class="size-4 rotate-90" /></span>{/if}</span
          >{#if select.clearable() && selected().length}<button
            type="button"
            aria-label="Clear selection"
            class={cn(selectClearClassName, classNames?.clear)}
            onpointerdown={(event) => event.preventDefault()}
            onclick={(event) => {
              event.stopPropagation();
              select.controller.clear();
            }}>{#if clear}{@render clear()}{:else}<CircleXIcon />{/if}</button>{/if}{/if}</span
      >
    </div>
  {/snippet}</PopoverTrigger
>
