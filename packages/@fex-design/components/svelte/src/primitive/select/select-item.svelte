<script lang="ts">
  import type { SelectOption } from "@fex-design/core/select/types";
  import {
    selectOptionClassName,
    selectOptionIndicatorClassName,
    selectOptionLabelClassName,
  } from "@fex-design/components-styles/select";
  import { cn } from "@fex-design/utils";
  import { getContext, type Snippet } from "svelte";
  import CheckIcon from "@fex-design/svelte/icons/check.svelte";
  import { selectContextKey, type SelectContext } from "./context";
  let {
    item,
    class: className,
    children,
  }: { item: SelectOption; class?: string; children?: Snippet } = $props();
  const select = getContext<SelectContext>(selectContextKey);
  const snapshot = select.snapshot;
  const selected = $derived($snapshot.selectedValues.includes(item.value));
  const disabled = $derived(
    item.disabled === true ||
      select.controller.selection.isDisabled(item.value),
  );
</script>

<div
  role="option"
  tabindex="-1"
  aria-selected={selected}
  aria-disabled={disabled || undefined}
  data-selected={selected || undefined}
  data-active={$snapshot.activeValue === item.value || undefined}
  data-disabled={disabled || undefined}
  class={cn(selectOptionClassName, className)}
  onpointermove={() => select.controller.setActiveValue(item.value, "pointer")}
  onpointerdown={(event) => event.preventDefault()}
  onclick={() => !disabled && select.controller.selectValue(item.value)}
  onkeydown={(event) => {
    if (
      (event.key === "Enter" || event.key === " ") &&
      !disabled &&
      !event.defaultPrevented
    ) {
      event.preventDefault();
      select.controller.selectValue(item.value);
    }
  }}
>
  <span class={selectOptionLabelClassName}
    >{#if children}{@render children()}{:else}{item.label}{/if}</span
  >
  <span class={selectOptionIndicatorClassName}><CheckIcon /></span>
</div>
