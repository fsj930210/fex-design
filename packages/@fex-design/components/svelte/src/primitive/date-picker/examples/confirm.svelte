<script lang="ts">
import { DatePickerFooter, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup } from '@fex-design/svelte/primitive/date-picker'

</script>
<div class="flex flex-wrap items-start gap-4">
  <RangePickerRoot needConfirm>
  <RangePickerTrigger>
  </RangePickerTrigger>
  <RangePickerContent>
  <RangePickerPanelGroup />
  <DatePickerFooter>
  </DatePickerFooter>
  </RangePickerContent>
  </RangePickerRoot>
</div>
