<script lang="ts">
  import MinusIcon from "@fex-design/svelte/icon/minus";
  import PlusIcon from "@fex-design/svelte/icon/plus";
  import { useInputNumber } from "@fex-design/svelte/primitive/input-number";
  import { Button } from "@fex-design/svelte/ui/button";

  const number = useInputNumber(() => ({ defaultValue: 5, min: 0, max: 10 }));
</script>

<div class="inline-flex items-center gap-2">
  <Button
    aria-label="减少"
    disabled={!number.canDecrement()}
    onclick={number.decrement}
  >
    <MinusIcon />
  </Button>
  <output class="min-w-10 text-center font-medium">{number.value()}</output>
  <Button
    aria-label="增加"
    disabled={!number.canIncrement()}
    onclick={number.increment}
  >
    <PlusIcon />
  </Button>
</div>
