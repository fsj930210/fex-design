<script lang="ts">
import { Calendar } from '@fex-design/svelte/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
</script>
<Calendar defaultViewDate={calendarDemoDate} showWeek weekStartsOn={1} locale={{ firstWeekContainsDate: 4 }} />
