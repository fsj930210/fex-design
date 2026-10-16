<script lang="ts">
  import { usePickerAppearance } from './appearance-context';
  const appearance = usePickerAppearance();
  import type { HTMLAttributes } from 'svelte/elements';
  import { getDatePickerTagItems } from '@fex-design/core/date-picker/input';
  import { formatDatePickerValue } from '@fex-design/core/date-picker/value';
  import { datePickerMultipleTagsClassName } from '@fex-design/components-styles/date-picker';
  import { cn } from '@fex-design/utils';
  import { Tag, TagAction } from '../tag';
  import { useDatePickerContext } from './context';
  let { class: className, style, maxCount, ...rest }: HTMLAttributes<HTMLDivElement> & { maxCount?: number } = $props();
  const context = useDatePickerContext('DatePickerTags');
  const tags = $derived(getDatePickerTagItems(context.getCalendarValues(), maxCount ?? context.maxCount));
</script>
<div {...rest} data-slot="date-picker-tags" class={cn(datePickerMultipleTagsClassName, appearance().classNames?.tags, className)} style={[appearance().styles?.tags, style].filter(Boolean).join(';')}>
  {#each tags.items as item (item.key)}
    <Tag size="sm" data-slot="date-picker-tag" class={appearance().classNames?.tag} style={appearance().styles?.tag}>
      {formatDatePickerValue(item.value, context)}
      <TagAction class={appearance().classNames?.tagRemove} style={appearance().styles?.tagRemove} aria-label="移除日期" disabled={context.disabled} onpointerdown={event => { event.preventDefault(); event.stopPropagation(); }} onclick={event => { event.stopPropagation(); if (!event.defaultPrevented) context.remove(item.value); }} />
    </Tag>
  {/each}
  {#if tags.overflowCount > 0}<Tag size="sm" data-slot="date-picker-tag-overflow" class={appearance().classNames?.tagOverflow} style={appearance().styles?.tagOverflow}>+{tags.overflowCount}</Tag>{/if}
</div>
