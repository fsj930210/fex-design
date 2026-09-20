<script lang="ts">
  import type { SelectOption } from "@fex-design/core/select/types";
  import { selectOptionClassName, selectOptionIndicatorClassName, selectOptionLabelClassName } from "@fex-design/styles/select";
  import { cn } from "@fex/utils";
  import { getContext, type Snippet } from "svelte";
  import CheckIcon from "../../icon/check.svelte";
  import { selectContextKey, type SelectContext } from "./context";
  let { item, class: className, children }: { item: SelectOption; class?: string; children?: Snippet } = $props();
  const select = getContext<SelectContext>(selectContextKey);
  const snapshot = select.snapshot;
  const selected = $derived(select.controller.selection.isSelected(item.value));
  const disabled = $derived(item.disabled === true || select.controller.selection.isDisabled(item.value));
</script>
<div role="option" aria-selected={selected} aria-disabled={disabled || undefined}
  data-selected={selected || undefined} data-active={$snapshot.activeValue === item.value || undefined}
  data-disabled={disabled || undefined} class={cn(selectOptionClassName, className)}
  onpointermove={() => select.controller.setActiveValue(item.value, "pointer")}
  onpointerdown={(event) => event.preventDefault()}
  onclick={() => !disabled && select.controller.selectValue(item.value)}>
  <span class={selectOptionLabelClassName}>{#if children}{@render children()}{:else}{item.label}{/if}</span>
  <span class={selectOptionIndicatorClassName}><CheckIcon /></span>
</div>
