<script lang="ts">
import { Calendar } from '@fex-design/svelte/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
</script>
<Calendar defaultValue={calendarDemoDate} defaultViewDate={calendarDemoDate} classNames={{ header: "bg-muted-background", cell: "bg-muted-background/20 data-[today=true]:!bg-success/20 data-[selected=true]:!bg-primary/20", cellContent: "flex flex-col gap-1" }} styles={{ footer: "border-top:2px solid var(--primary)" }}>{#snippet footerRender()}<span>语义区域样式</span>{/snippet}</Calendar>
