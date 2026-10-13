<script lang="ts">
import { CalendarRoot } from '@fex-design/svelte/primitive/calendar'
import { getCalendarUIOptions, type CalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import ExampleContent from './_parts/content.svelte'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
const options: CalendarUIOptions = { defaultViewDate: calendarDemoDate }
</script>
<CalendarRoot {...getCalendarUIOptions(options)} class={calendarUIRootClassName} data-fullscreen={true}><ExampleContent options={options}>{#snippet footerRender({ controller })}<button type="button" onclick={() => controller.navigate("today")}>回到今天</button>{/snippet}</ExampleContent></CalendarRoot>

