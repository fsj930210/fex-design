<script lang="ts">
import { DatePicker, RangePicker } from '@fex-design/svelte/ui/date-picker'
import { DatePickerConfirm } from '@fex-design/svelte/primitive/date-picker'

</script>
<div class="flex flex-wrap items-start gap-4">
  <DatePicker footer={null}>
  </DatePicker>
  <DatePicker >
  {#snippet footer()}<span>自定义底部</span>{/snippet}
  </DatePicker>
  <RangePicker needConfirm>
  {#snippet footer()}<DatePickerConfirm>提交范围</DatePickerConfirm>{/snippet}
  </RangePicker>
</div>
