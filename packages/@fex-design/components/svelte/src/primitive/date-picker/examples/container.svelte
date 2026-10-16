<script lang="ts">
import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, DatePickerFooter } from '@fex-design/svelte/primitive/date-picker'

</script>
<div class="flex flex-wrap items-start gap-4">
  <DatePickerRoot defaultOpen>
  {#snippet container(state, content)}<div class="flex flex-col items-start gap-2 data-[open=false]:[&_[data-slot=date-picker-content]]:hidden" data-open={state.getOpen() ? 'true' : 'false'}>
  {@render content?.(state)}
  </div>{/snippet}{#snippet children()}<DatePickerTrigger />
  <DatePickerContent>
  <DatePickerPanel />
  <DatePickerFooter />
  </DatePickerContent>{/snippet}
  </DatePickerRoot>
</div>
