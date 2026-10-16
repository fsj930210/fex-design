import { DatePicker, RangePicker } from '@fex-design/react/ui/date-picker'

export function DatePickerAppearanceExample() {

return (
<div className="flex w-full min-w-0 flex-col gap-4">
<section className="flex w-full min-w-0 flex-col gap-2">
<p className="text-sm font-medium">outlined</p>
<DatePicker inputProps={{ variant: 'outlined' }} />
<RangePicker inputProps={{ variant: 'outlined' }} />
</section>
<section className="flex w-full min-w-0 flex-col gap-2">
<p className="text-sm font-medium">filled</p>
<DatePicker inputProps={{ variant: 'filled' }} />
<RangePicker inputProps={{ variant: 'filled' }} />
</section>
<section className="flex w-full min-w-0 flex-col gap-2">
<p className="text-sm font-medium">borderless</p>
<DatePicker inputProps={{ variant: 'borderless' }} />
<RangePicker inputProps={{ variant: 'borderless' }} />
</section>
<section className="flex w-full min-w-0 flex-col gap-2">
<p className="text-sm font-medium">underlined</p>
<DatePicker inputProps={{ variant: 'underlined' }} />
<RangePicker inputProps={{ variant: 'underlined' }} />
</section>
</div>
)
}
