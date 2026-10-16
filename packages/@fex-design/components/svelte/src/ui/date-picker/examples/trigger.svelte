<script lang="ts">
import { DatePicker } from '@fex-design/svelte/ui/date-picker'


</script>
<div class="flex flex-wrap items-start gap-4">
  <DatePicker >
  {#snippet trigger({ props, action, state })}<button {...props} use:action type="button">{state.getDisplayValue() || '选择日期'}</button>{/snippet}
  </DatePicker>
</div>
