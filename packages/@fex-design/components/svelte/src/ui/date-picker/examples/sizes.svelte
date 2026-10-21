<script lang="ts">
  import { DatePicker, RangePicker } from "@fex-design/svelte/ui/date-picker";
</script>

<div class="flex w-full min-w-0 flex-col gap-4">
  <section class="flex w-full min-w-0 flex-col gap-2">
    <p class="text-sm font-medium">sm</p>
    <DatePicker inputProps={{ size: "sm" }} />
    <RangePicker inputProps={{ size: "sm" }} />
  </section>
  <section class="flex w-full min-w-0 flex-col gap-2">
    <p class="text-sm font-medium">md</p>
    <DatePicker inputProps={{ size: "md" }} />
    <RangePicker inputProps={{ size: "md" }} />
  </section>
  <section class="flex w-full min-w-0 flex-col gap-2">
    <p class="text-sm font-medium">lg</p>
    <DatePicker inputProps={{ size: "lg" }} />
    <RangePicker inputProps={{ size: "lg" }} />
  </section>
</div>
