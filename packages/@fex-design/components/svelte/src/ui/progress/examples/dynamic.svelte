<script lang="ts">
  import { Progress } from "@fex-design/svelte/ui/progress";
  let value = $state(30);
  const decrease = () => {
    value = Math.max(0, value - 10);
  };
  const increase = () => {
    value = Math.min(100, value + 10);
  };
</script>

<div class="grid w-full max-w-md gap-4">
  <div class="flex flex-wrap items-center gap-6">
    <Progress {value} />
    <Progress variant="circle" {value} size={96} showInfo />
  </div>
  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class="px-3 py-1 text-sm border rounded hover:bg-muted"
      onclick={decrease}
    >
      -10%
    </button>
    <button
      type="button"
      class="px-3 py-1 text-sm border rounded hover:bg-muted"
      onclick={increase}
    >
      +10%
    </button>
  </div>
</div>
