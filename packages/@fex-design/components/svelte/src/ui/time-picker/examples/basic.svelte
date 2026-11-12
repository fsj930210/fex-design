<script lang="ts">
  let { invalid = false } = $props<{ invalid?: boolean }>();
  import { TimePicker } from "@fex-design/svelte/ui/time-picker";
</script>

<div class="flex w-full min-w-0 flex-col gap-4">
  <TimePicker
    aria-invalid={invalid}
    defaultValue={{ hour: 9, minute: 30, second: 0 }}
  ></TimePicker>
</div>
