<script lang="ts">
  import { getCalendarUIView, resolveCalendarSemanticValue, type CalendarUIOptions } from '@fex-design/core/calendar';
  import { calendarUIClasses, calendarUIFullCellClassName, calendarUIMiniCellClassName, calendarUIFullTriggerClassName, calendarUIMiniTriggerClassName, calendarUIWeekRowClassName, calendarUIDateRowClassName, calendarUIMonthRowClassName } from '@fex-design/components-styles/calendar';
  import { cn } from '@fex-design/utils';
  import { CalendarHeader, CalendarWeekHeader, CalendarRow, CalendarCell, CalendarCellTrigger, CalendarFooter } from '../../primitive/calendar';
  import { useCalendarContext } from '../../primitive/calendar/context';
  import type { CalendarAppearance } from './types';
  let { options, headerRender, cellRender, fullCellRender, footerRender, classNames, styles }: CalendarAppearance & { options: CalendarUIOptions } = $props();
  const calendar = useCalendarContext('Calendar');
  const context = $derived({ state: calendar.getState(), controller: calendar.controller });
  const view = $derived(getCalendarUIView(context, options));
  const columns = $derived(view.showWeek ? calendarUIWeekRowClassName : context.state.panel === 'date' ? calendarUIDateRowClassName : calendarUIMonthRowClassName);
  const appearance = $derived({ classNames: resolveCalendarSemanticValue(classNames, context), styles: resolveCalendarSemanticValue(styles, context) });
</script>
{#if headerRender !== false}
  <CalendarHeader class={cn(calendarUIClasses.header, appearance.classNames?.header)} style={appearance.styles?.header} children={headerRender || undefined} />
{/if}
{#if context.state.panel === 'date'}
  <div class={cn(calendarUIClasses.weekHeader, columns, appearance.classNames?.weekHeader)} style={appearance.styles?.weekHeader} data-slot="calendar-week-header">
    {#if view.showWeek}<div class={cn(calendarUIClasses.weekNumber, appearance.classNames?.weekNumber)} style={appearance.styles?.weekNumber}>{view.locale.week}</div>{/if}
    <CalendarWeekHeader labels={view.locale.weekdays} class="contents py-0" />
  </div>
{/if}
<div role="grid" data-slot="calendar-grid" data-panel={context.state.panel} class={cn(calendarUIClasses.grid, appearance.classNames?.grid)} style={appearance.styles?.grid} onmouseleave={() => calendar.controller.clearHoveredRow()}>
  {#each view.rows as row (row.key)}
    <CalendarRow class={cn(calendarUIClasses.row, columns, appearance.classNames?.row)} style={appearance.styles?.row}>
      {#if view.showWeek}<div role="rowheader" data-slot="calendar-week-number" class={cn(calendarUIClasses.weekNumber, appearance.classNames?.weekNumber)} style={appearance.styles?.weekNumber}>{row.week.week}</div>{/if}
      {#each row.cells as cell (cell.key)}
        <CalendarCell {cell} class={cn(view.fullscreen ? calendarUIFullCellClassName : calendarUIMiniCellClassName, calendarUIClasses.cell, appearance.classNames?.cell)} style={appearance.styles?.cell}>
          {#if fullCellRender}{@render fullCellRender({ ...context, cell })}{:else}
            <CalendarCellTrigger {cell} class={cn(view.fullscreen ? calendarUIFullTriggerClassName : calendarUIMiniTriggerClassName, calendarUIClasses.cellTrigger, appearance.classNames?.cellTrigger)} style={appearance.styles?.cellTrigger}>{view.label(cell)}</CalendarCellTrigger>
            {#if cellRender}<div data-slot="calendar-cell-content" class={cn(calendarUIClasses.cellContent, appearance.classNames?.cellContent)} style={appearance.styles?.cellContent}>{@render cellRender({ ...context, cell })}</div>{/if}
          {/if}
        </CalendarCell>
      {/each}
    </CalendarRow>
  {/each}
</div>
{#if footerRender}<CalendarFooter class={cn(calendarUIClasses.footer, appearance.classNames?.footer)} style={appearance.styles?.footer}>{@render footerRender(context)}</CalendarFooter>{/if}
