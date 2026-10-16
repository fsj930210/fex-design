<script lang="ts">
import { useTimePicker } from '@fex-design/svelte/primitive/time-picker';
const { controller, snapshot } = useTimePicker({ defaultValue: { hour: 9, minute: 30, second: 0 } });
</script>
<div class="flex w-full min-w-0 flex-col gap-4">
<div class="flex items-center gap-3"><button type="button" onclick={() => controller.selectHour(12)}>选择 12 时</button><output>{snapshot().inputValue}</output></div>

</div>
