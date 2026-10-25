<script lang="ts">
  import { useInputNumber } from "@fex-design/svelte/primitive/input-number";
  const number = useInputNumber(() => ({ defaultValue: 5, min: 0, max: 10 }));
</script>

<section class="grid max-w-sm gap-3 rounded-lg border p-4">
  <label class="grid gap-1"
    ><span>Custom quantity</span><input
      inputmode="decimal"
      value={number.draft}
      oninput={(event) => number.input(event.currentTarget.value, event)}
      onblur={number.blur}
      onkeydown={number.keydown}
    /></label
  >
  <div class="inline-flex items-center gap-2">
    <button
      type="button"
      aria-label="Decrease"
      disabled={!number.canDecrement}
      onclick={number.decrement}>−</button
    ><output aria-live="polite">{number.formattedValue}</output><button
      type="button"
      aria-label="Increase"
      disabled={!number.canIncrement}
      onclick={number.increment}>+</button
    >
  </div>
  <small>Range: 0–10</small>
</section>
