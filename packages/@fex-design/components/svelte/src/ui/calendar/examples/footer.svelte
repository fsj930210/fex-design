<script lang="ts">
  import { Calendar } from "@fex-design/svelte/ui/calendar";
  import { calendarDemoDate } from "@fex-design/docs-shared/calendar-demo-data";
</script>

<Calendar defaultViewDate={calendarDemoDate}
  >{#snippet footerRender({ controller })}<button
      type="button"
      onclick={() => controller.navigate("today")}>回到今天</button
    >{/snippet}</Calendar
>
