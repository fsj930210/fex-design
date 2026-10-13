<script lang="ts">
import { Calendar } from '@fex-design/svelte/ui/calendar'
import { calendarDemoDate, calendarDemoEvent } from '@fex-design/docs-shared/calendar-demo-data'
</script>
<Calendar defaultViewDate={calendarDemoDate} classNames={{ cell: "px-0", cellContent: "overflow-visible" }}>{#snippet cellRender({ cell })}{@const event = calendarDemoEvent(cell)}{#if event}<div class="bg-primary text-primary-foreground px-2" data-segment={event.segment}>{event.label}</div>{/if}{/snippet}</Calendar>
