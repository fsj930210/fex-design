<script lang="ts">
import { TimePicker } from '@fex-design/svelte/ui/time-picker'
const formats = [
  { format: 'HH:mm:ss', use12Hours: false, label: '时、分、秒：3 列', stepped: false },
  { format: 'HH:mm', use12Hours: false, label: '时、分：2 列', stepped: false },
  { format: 'mm:ss', use12Hours: false, label: '分、秒：2 列', stepped: false },
  { format: 'HH', use12Hours: false, label: '仅小时：1 列', stepped: false },
  { format: 'hh:mm A', use12Hours: true, label: '12 小时：时、分、时段，共 3 列', stepped: false },
  { format: 'hh:mm:ss A', use12Hours: true, label: '12 小时：4 列，时/分/秒步长为 2/5/10', stepped: true },
]
</script>
<div class="flex w-full min-w-0 flex-col gap-4">
  {#each formats as item (item.format)}<section class="flex w-full min-w-0 flex-col gap-2">
    <p class="text-sm text-muted-foreground">{item.format} — {item.label}</p>
    <TimePicker format={item.format} use12Hours={item.use12Hours} defaultValue={{ hour: 9, minute: 30, second: 0 }} step={item.stepped ? { hour: 2, minute: 5, second: 10 } : undefined} />
  </section>{/each}
</div>
