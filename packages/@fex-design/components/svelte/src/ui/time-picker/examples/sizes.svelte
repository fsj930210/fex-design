<script lang="ts">
  import { TimePicker } from "@fex-design/svelte/ui/time-picker";
</script>

<div class="flex w-full min-w-0 flex-col gap-4">
  <section class="flex flex-col gap-2">
    <p>小号 sm</p>
    <TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }} size="sm"
    ></TimePicker>
  </section>
  <section class="flex flex-col gap-2">
    <p>默认 md</p>
    <TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }} size="md"
    ></TimePicker>
  </section>
  <section class="flex flex-col gap-2">
    <p>大号 lg</p>
    <TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }} size="lg"
    ></TimePicker>
  </section>
</div>
