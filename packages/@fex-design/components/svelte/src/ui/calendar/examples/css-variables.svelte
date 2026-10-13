<script lang="ts">
import { Calendar } from '@fex-design/svelte/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
</script>
<div style="--calendar-hover-background:var(--success);--calendar-selected-background:var(--primary);--calendar-selected-foreground:var(--primary-foreground);--calendar-today-color:var(--danger)"><Calendar defaultViewDate={calendarDemoDate} /></div>
