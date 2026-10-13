<script lang="ts" generics="TValue extends CalendarValue = CalendarValue">
  import { setContext } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { CalendarOptions, CalendarValue } from '@fex-design/core/calendar';
  import { calendarRootClassName } from '@fex-design/components-styles/calendar';
  import { cn } from '@fex-design/utils';
  import { calendarContextKey } from './context';
  import { createCalendarState } from './calendar-state.svelte';
  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onchange'> & CalendarOptions<TValue> & { ref?: HTMLDivElement | null };
  let { value, values, range, defaultValue, viewDate, defaultViewDate, panel, defaultPanel, granularity, weekStartsOn, locale, showWeek, fullscreen, today, min, max, disabledDate, onChange, onSelect, onCellSelect, onCellHover, onViewDateChange, onPanelChange, children, class: className, onmouseleave, ref = $bindable(null), ...rest }: Props = $props();
  const calendar = createCalendarState(() => ({ value, values, range, defaultValue, viewDate, defaultViewDate, panel, defaultPanel, granularity, weekStartsOn, locale, showWeek, fullscreen, today, min, max, disabledDate, onChange, onSelect, onCellSelect, onCellHover, onViewDateChange, onPanelChange }));
  const { controller } = calendar;
  const state = $derived(calendar.state);
  const grid = $derived(calendar.grid);
  setContext(calendarContextKey, { controller, getState: () => state, getGrid: () => grid });
</script>
<div {...rest} bind:this={ref} data-slot="calendar-root" data-panel={state.panel} data-granularity={state.granularity} class={cn(calendarRootClassName, className)} onmouseleave={event => { onmouseleave?.(event); if (!event.defaultPrevented) controller.clearHoveredRow(); }}>{@render children?.()}</div>
