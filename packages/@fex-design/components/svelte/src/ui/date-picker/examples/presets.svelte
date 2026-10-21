<script lang="ts">
  import { DatePicker, RangePicker } from "@fex-design/svelte/ui/date-picker";
  import {
    DatePickerFooter,
    DatePickerPreset,
    type DatePickerSelectionValue,
  } from "@fex-design/svelte/primitive/date-picker";
  import {
    getCalendarToday,
    type CalendarRange,
  } from "@fex-design/core/calendar";
  let value = $state<DatePickerSelectionValue>(null);
  let range = $state<CalendarRange>({});
  let dateOpen = $state<boolean>(false);
  let rangeOpen = $state<boolean>(false);
  function chooseDate(days: number) {
    value = getCalendarToday().add({ days });
    dateOpen = false;
  }
  function chooseRange(preset: "week" | "month") {
    const today = getCalendarToday();
    const start =
      preset === "week" ? today.subtract({ days: 6 }) : today.with({ day: 1 });
    const end =
      preset === "week"
        ? today
        : start.add({ months: 1 }).subtract({ days: 1 });
    range = { start, end };
    rangeOpen = false;
  }
</script>

<div class="flex w-full min-w-0 flex-col gap-4">
  <section class="flex w-full min-w-0 flex-col gap-2">
    <p class="text-sm font-medium">日期</p>
    <DatePicker
      {value}
      open={dateOpen}
      onChange={(next) => (value = next)}
      onOpenChange={(next) => (dateOpen = next)}
      footer={null}
      >{#snippet panel(defaultPanel)}
        <div class="flex min-w-0 max-[480px]:flex-col">
          <aside
            class="flex shrink-0 flex-col gap-1 border-e border-border p-2 max-[480px]:flex-row max-[480px]:flex-wrap max-[480px]:border-e-0 max-[480px]:border-b max-[480px]:[&_[data-slot=date-picker-preset]]:w-auto"
            aria-label="预设日期"
          >
            <DatePickerPreset onclick={() => chooseDate(-1)}
              >昨天</DatePickerPreset
            >
            <DatePickerPreset onclick={() => chooseDate(7)}
              >下周</DatePickerPreset
            >
          </aside>
          <div class="min-w-0 flex-1">
            {@render defaultPanel()}
            <DatePickerFooter />
          </div>
        </div>
      {/snippet}</DatePicker
    >
  </section>
  <section class="flex w-full min-w-0 flex-col gap-2">
    <p class="text-sm font-medium">范围</p>
    <RangePicker
      value={range}
      open={rangeOpen}
      onChange={(next) => (range = next)}
      onOpenChange={(next) => (rangeOpen = next)}
      footer={null}
      >{#snippet panel(defaultPanel)}
        <div class="flex min-w-0 max-[480px]:flex-col">
          <aside
            class="flex shrink-0 flex-col gap-1 border-e border-border p-2 max-[480px]:flex-row max-[480px]:flex-wrap max-[480px]:border-e-0 max-[480px]:border-b max-[480px]:[&_[data-slot=date-picker-preset]]:w-auto"
            aria-label="预设范围"
          >
            <DatePickerPreset onclick={() => chooseRange("week")}
              >最近 7 天</DatePickerPreset
            >
            <DatePickerPreset onclick={() => chooseRange("month")}
              >本月</DatePickerPreset
            >
          </aside>
          <div class="min-w-0 flex-1">
            {@render defaultPanel()}
            <DatePickerFooter />
          </div>
        </div>
      {/snippet}</RangePicker
    >
  </section>
</div>
