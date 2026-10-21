<script lang="ts">
  import { TimePicker } from "@fex-design/svelte/ui/time-picker";
</script>

<div class="flex w-full min-w-0 flex-col gap-4">
  <section class="flex flex-col gap-2">
    <p>outlined</p>
    <TimePicker
      defaultValue={{ hour: 9, minute: 30, second: 0 }}
      variant="outlined"
    ></TimePicker>
  </section>
  <section class="flex flex-col gap-2">
    <p>filled</p>
    <TimePicker
      defaultValue={{ hour: 9, minute: 30, second: 0 }}
      variant="filled"
    ></TimePicker>
  </section>
  <section class="flex flex-col gap-2">
    <p>borderless</p>
    <TimePicker
      defaultValue={{ hour: 9, minute: 30, second: 0 }}
      variant="borderless"
    ></TimePicker>
  </section>
  <section class="flex flex-col gap-2">
    <p>underlined</p>
    <TimePicker
      defaultValue={{ hour: 9, minute: 30, second: 0 }}
      variant="underlined"
    ></TimePicker>
  </section>
</div>
