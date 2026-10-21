<script lang="ts">
  import { DatePicker } from "@fex-design/svelte/ui/date-picker";
</script>

<div class="flex w-full min-w-0 flex-col items-stretch gap-4">
  <DatePicker class="w-full min-w-0" placeholder="请选择日期"></DatePicker>
  <DatePicker class="w-full min-w-0" multiple></DatePicker>
</div>
