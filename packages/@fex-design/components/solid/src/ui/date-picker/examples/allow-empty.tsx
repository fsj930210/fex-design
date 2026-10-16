import { RangePicker } from '@fex-design/solid/ui/date-picker'

export function DatePickerAllowEmptyExample() {

return (
<div class="flex w-full min-w-0 flex-col gap-4">
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">结束日期可留空</p>
<RangePicker allowEmpty={{ end: true }} needConfirm={true} endInputProps={{ placeholder: '至今' }} />
</section>
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">开始日期可留空</p>
<RangePicker allowEmpty={{ start: true }} needConfirm={true} startInputProps={{ placeholder: '不限开始' }} />
</section>
</div>
)
}
