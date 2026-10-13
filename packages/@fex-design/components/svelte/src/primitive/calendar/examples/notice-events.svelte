<script lang="ts">
import { CalendarRoot } from '@fex-design/svelte/primitive/calendar'
import { getCalendarUIOptions, type CalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import ExampleContent from './_parts/content.svelte'
import { calendarDemoDate, calendarDemoNotices } from '@fex-design/docs-shared/calendar-demo-data'
const options: CalendarUIOptions = { defaultViewDate: calendarDemoDate }
</script>
<CalendarRoot {...getCalendarUIOptions(options)} class={calendarUIRootClassName} data-fullscreen={true}><ExampleContent options={options}>{#snippet cellRender({ cell })}<ul>{#each calendarDemoNotices(cell) as notice (notice)}<li><a href="#calendar-notice">{notice}</a></li>{/each}</ul>{/snippet}</ExampleContent></CalendarRoot>

