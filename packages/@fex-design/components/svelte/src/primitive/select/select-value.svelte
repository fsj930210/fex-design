<script lang="ts">
  import { getSelectValueLayout } from '@fex-design/core/select/value-layout';
  import type { SelectOption } from '@fex-design/core/select/types';
  import { selectPlaceholderClassName, selectValueClassName } from '@fex-design/components-styles/select';
  import { cn } from '@fex-design/utils';
  import { getContext, type Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import Tag from '../tag/tag.svelte';
  import TagAction from '../tag/tag-action.svelte';
  import { selectContextKey, type SelectContext } from './context';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    placeholder?: string;
    maxTagCount?: number;
    children?: Snippet;
    tag?: Snippet<[SelectOption, () => void]>;
    ref?: HTMLDivElement | null;
  }
  let { placeholder = '请选择', maxTagCount, children, tag, ref = $bindable(null), class: className, ...rest }: Props = $props();
  const select = getContext<SelectContext>(selectContextKey);
  if (!select) throw new Error('SelectValue must be used inside SelectRoot.');
  const snapshot = select.snapshot;
  const layout = $derived(getSelectValueLayout(select.selectedOptions(), {
    multiple: select.multiple(), showSearch: select.showSearch(),
    open: $snapshot.open, searchValue: $snapshot.searchValue, maxTagCount,
  }));
</script>

{#if children}
  <div {...rest} bind:this={ref} class={cn(selectValueClassName, className)}>{@render children()}</div>
{:else if layout.showPlaceholder}
  <span class={selectPlaceholderClassName}>{placeholder}</span>
{:else if layout.showSingle}
  <div {...rest} bind:this={ref} class={cn(selectValueClassName, className)}>{select.selectedOptions()[0]?.label}</div>
{:else if layout.showTags}
  <div {...rest} bind:this={ref} class={cn(selectValueClassName, className)}>
    {#each layout.visibleOptions as option (option.value)}
      {#if tag}
        {@render tag(option, () => select.removeValue(option.value))}
      {:else}
        <Tag size="sm" onpointerdown={(event) => event.preventDefault()}>
          {option.label}
          <TagAction aria-label={`Remove ${String(option.label)}`} onclick={(event) => {
            event.stopPropagation(); select.removeValue(option.value);
          }} />
        </Tag>
      {/if}
    {/each}
    {#if layout.overflowCount > 0}<Tag size="sm">+{layout.overflowCount}</Tag>{/if}
  </div>
{/if}
