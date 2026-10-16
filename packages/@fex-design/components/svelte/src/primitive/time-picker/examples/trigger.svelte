<script lang="ts">
import { TimePickerRoot, TimePickerTrigger, TimePickerPortal, TimePickerContent, TimePickerPanel, TimePickerHourColumn, TimePickerMinuteColumn, TimePickerSecondColumn, TimePickerPeriodColumn } from '@fex-design/svelte/primitive/time-picker';
</script>
<div class="flex w-full min-w-0 flex-col gap-4">
<TimePickerRoot defaultValue={{ hour: 9, minute: 30, second: 0 }} ><TimePickerTrigger>{#snippet children({ props, action })}<button {...props} use:action type="button" class="rounded-md border border-border px-3 py-2">选择时间</button>{/snippet}</TimePickerTrigger><TimePickerPortal><TimePickerContent><TimePickerPanel><TimePickerHourColumn></TimePickerHourColumn><TimePickerMinuteColumn /><TimePickerSecondColumn /></TimePickerPanel></TimePickerContent></TimePickerPortal></TimePickerRoot>

</div>
