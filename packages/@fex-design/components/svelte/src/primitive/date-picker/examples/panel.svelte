<script lang="ts">
import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, DatePickerFooter } from '@fex-design/svelte/primitive/date-picker'

</script>
<div class="flex flex-wrap items-start gap-4">
  <DatePickerRoot>
  <DatePickerTrigger />
  <DatePickerContent>
  <p class="p-2 text-sm">自定义面板容器</p>
  <DatePickerPanel />
  <DatePickerFooter />
  </DatePickerContent>
  </DatePickerRoot>
</div>
