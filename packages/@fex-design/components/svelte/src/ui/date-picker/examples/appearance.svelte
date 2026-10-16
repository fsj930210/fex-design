<script lang="ts">
import { DatePicker, RangePicker } from '@fex-design/svelte/ui/date-picker'

</script>
<div class="flex w-full min-w-0 flex-col gap-4">
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">outlined</p>
<DatePicker inputProps={{ variant: 'outlined' }} />
<RangePicker inputProps={{ variant: 'outlined' }} />
</section>
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">filled</p>
<DatePicker inputProps={{ variant: 'filled' }} />
<RangePicker inputProps={{ variant: 'filled' }} />
</section>
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">borderless</p>
<DatePicker inputProps={{ variant: 'borderless' }} />
<RangePicker inputProps={{ variant: 'borderless' }} />
</section>
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">underlined</p>
<DatePicker inputProps={{ variant: 'underlined' }} />
<RangePicker inputProps={{ variant: 'underlined' }} />
</section>
</div>
