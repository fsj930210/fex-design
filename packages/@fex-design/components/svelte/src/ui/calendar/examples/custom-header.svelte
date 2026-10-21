<script lang="ts">
  import { Calendar } from "@fex-design/svelte/ui/calendar";
  import { calendarDemoDate } from "@fex-design/docs-shared/calendar-demo-data";
</script>

<Calendar defaultViewDate={calendarDemoDate}
  >{#snippet headerRender({ state, controller })}<div
      class="flex w-full items-center justify-between"
    >
      <button
        type="button"
        onclick={() => controller.navigate("previous-panel")}>上一页</button
      ><strong>{state.viewDate.year} / {state.viewDate.month}</strong><button
        type="button"
        onclick={() => controller.navigate("next-panel")}>下一页</button
      >
    </div>{/snippet}</Calendar
>
