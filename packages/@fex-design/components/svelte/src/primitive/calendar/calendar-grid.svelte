<script lang="ts" generics="TValue extends CalendarValue = CalendarValue">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import type { CalendarCell as Cell, CalendarGrid as Grid, CalendarValue } from '@fex-design/core/calendar';
  import { calendarGridClassName } from '@fex-design/components-styles/calendar';
  import { cn } from '@fex-design/utils';
  import { useCalendarContext } from './context';
  import CalendarRow from './calendar-row.svelte';
  import CalendarCell from './calendar-cell.svelte';
  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & { children?: Snippet<[Cell<TValue>]>; rowProps?: Omit<HTMLAttributes<HTMLDivElement>, 'children'>; ref?: HTMLDivElement | null };
  let { children, rowProps, class: className, onmouseleave, ref = $bindable(null), ...rest }: Props = $props();
  const context = useCalendarContext('CalendarGrid');
  const grid = $derived(context.getGrid() as Grid<TValue>);
</script>
<div {...rest} bind:this={ref} role="grid" data-slot="calendar-grid" data-panel={context.getState().panel} class={cn(calendarGridClassName, className)} onmouseleave={event => { onmouseleave?.(event); if (!event.defaultPrevented) context.controller.clearHoveredRow(); }}>
  {#each grid.rows as row (row.map(cell => cell.key).join('|'))}<CalendarRow {...rowProps}>{#each row as cell (cell.key)}{#if children}{@render children(cell)}{:else}<CalendarCell {cell} />{/if}{/each}</CalendarRow>{/each}
</div>
