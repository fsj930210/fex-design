<script lang="ts">
import { Calendar } from '@fex-design/svelte/ui/calendar'
import { calendarDemoDate, calendarDemoNotices } from '@fex-design/docs-shared/calendar-demo-data'
</script>
<Calendar defaultViewDate={calendarDemoDate}>{#snippet cellRender({ cell })}<ul>{#each calendarDemoNotices(cell) as notice (notice)}<li><a href="#calendar-notice">{notice}</a></li>{/each}</ul>{/snippet}</Calendar>
