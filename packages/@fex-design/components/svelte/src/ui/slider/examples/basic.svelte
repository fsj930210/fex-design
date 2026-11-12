<script lang="ts">
  let { invalid = false } = $props<{ invalid?: boolean }>();
  import { Slider } from "@fex-design/svelte/ui/slider";
  let value = $state(42);
  let ended = $state(42);
</script>

<div class="grid w-full max-w-xl gap-4">
  <Slider
    aria-invalid={invalid}
    {value}
    onChange={(next) => typeof next === "number" && (value = next)}
    onEnd={(next) => typeof next === "number" && (ended = next)}
  />
  <p>当前值：{value}；结束值：{ended}</p>
  <Slider aria-invalid={invalid} defaultValue={60} keyboard={false} />
</div>
