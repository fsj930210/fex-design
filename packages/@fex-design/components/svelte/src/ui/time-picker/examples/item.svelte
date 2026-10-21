<script lang="ts">
  import { TimePicker } from "@fex-design/svelte/ui/time-picker";
  import {
    TimePickerPanel,
    TimePickerHourColumn,
    TimePickerMinuteColumn,
    TimePickerSecondColumn,
  } from "@fex-design/svelte/primitive/time-picker";
</script>

<div class="flex w-full min-w-0 flex-col gap-4">
  <TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }}
    >{#snippet panel()}<TimePickerPanel
        ><TimePickerHourColumn
          >{#snippet item({ item, selected })}<span
              >{selected ? "✓ " : ""}{item.label}</span
            >{/snippet}</TimePickerHourColumn
        ><TimePickerMinuteColumn /><TimePickerSecondColumn /></TimePickerPanel
      >{/snippet}</TimePicker
  >
</div>
