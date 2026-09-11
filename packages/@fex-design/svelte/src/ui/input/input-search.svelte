<script lang="ts">
  import type { InputSearchMeta } from "@fex-design/core/input/types";
  import {
    inputActionClassName,
    inputSearchAddonClassName,
  } from "@fex-design/styles/input";
  import SearchIcon from "../../icon/search.svelte";
  import LoadingIcon from "../../icon/loading.svelte";
  import { Button } from "@fex-design/svelte/ui/button";
  import { untrack } from "svelte";
  import Input from "./input.svelte";
  import type { InputSearchProps } from "./input.types";
  let {
    value,
    defaultValue = "",
    onValueChange,
    onSearch,
    loading = false,
    prefix,
    suffix,
    addonBefore,
    addonAfter,
    onkeydown,
    ...props
  }: InputSearchProps = $props();
  let internalValue = $state(untrack(() => defaultValue));
  const currentValue = $derived(value ?? internalValue);
  function update(next: string) {
    if (value === undefined) internalValue = next;
    onValueChange?.(next);
  }
  function search(source: InputSearchMeta["source"]) {
    if (!loading) onSearch?.(currentValue, { source });
  }
</script>

{#snippet prefixAction()}{#if prefix}<button
      type="button"
      aria-label="Search"
      disabled={loading}
      class={inputActionClassName}
      onclick={() => search("prefix")}
      >{#if loading}<LoadingIcon
          class="animate-spin"
        />{:else}{@render prefix()}{/if}</button
    >{/if}{/snippet}
{#snippet suffixAction()}{#if suffix}<button
      type="button"
      aria-label="Search"
      disabled={loading}
      class={inputActionClassName}
      onclick={() => search("suffix")}
      >{#if loading}<LoadingIcon
          class="animate-spin"
        />{:else}{@render suffix()}{/if}</button
    >{/if}{/snippet}
{#snippet beforeAction()}{#if addonBefore}<Button
      variant="solid"
      color="primary"
      {loading}
      data-input-addon-fill
      aria-label="Search"
      class={inputSearchAddonClassName}
      onclick={() => search("addonBefore")}
      >{#if !loading}{@render addonBefore()}{/if}</Button
    >{/if}{/snippet}
{#snippet afterAction()}<Button
    variant="solid"
    color="primary"
    {loading}
    data-input-addon-fill
    aria-label="Search"
    class={inputSearchAddonClassName}
    onclick={() => search("addonAfter")}
    >{#if !loading}{#if addonAfter}{@render addonAfter()}{:else}<SearchIcon
        />{/if}{/if}</Button
  >{/snippet}
<Input
  {...props}
  value={currentValue}
  onValueChange={update}
  prefix={prefix ? prefixAction : undefined}
  suffix={suffix ? suffixAction : undefined}
  addonBefore={addonBefore ? beforeAction : undefined}
  addonAfter={addonAfter === null ? undefined : afterAction}
  onkeydown={(event) => {
    onkeydown?.(event);
    if (!event.defaultPrevented && event.key === "Enter") search("enter");
  }}
/>
