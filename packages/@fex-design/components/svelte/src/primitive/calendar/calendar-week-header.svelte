<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getCalendarWeekHeaderItems, calendarDefaultWeekLabels, type CalendarWeekHeaderItem } from '@fex-design/core/calendar';
  import { calendarWeekHeaderClassName } from '@fex-design/components-styles/calendar';
  import { cn } from '@fex-design/utils';
  import { useCalendarContext } from './context';

  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    labels?: readonly string[];
    children?: Snippet<[CalendarWeekHeaderItem]>;
    ref?: HTMLDivElement | null;
  };
  let { labels = calendarDefaultWeekLabels, children, class: className, ref = $bindable(null), ...rest }: Props = $props();
  const context = useCalendarContext('CalendarWeekHeader');
  const items = $derived(getCalendarWeekHeaderItems(labels, context.getState().weekStartsOn));
</script>

<div {...rest} bind:this={ref} data-slot="calendar-week-header" class={cn(calendarWeekHeaderClassName, className)}>
  {#each items as item (item.index)}
    <div data-slot="calendar-week-head">
      {#if children}{@render children(item)}{:else}{item.label}{/if}
    </div>
  {/each}
</div>
