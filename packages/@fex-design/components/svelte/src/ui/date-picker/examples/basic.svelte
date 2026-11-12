<script lang="ts">
  let { invalid = false } = $props<{ invalid?: boolean }>();
  import { DatePicker } from "@fex-design/svelte/ui/date-picker";
</script>

<div class="flex w-full min-w-0 flex-col items-stretch gap-4">
  <DatePicker
    aria-invalid={invalid}
    class="w-full min-w-0"
    placeholder="请选择日期"
  ></DatePicker>
  <DatePicker aria-invalid={invalid} class="w-full min-w-0" multiple
  ></DatePicker>
</div>
