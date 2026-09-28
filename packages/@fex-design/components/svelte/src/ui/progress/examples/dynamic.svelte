<script lang="ts">
  import { Progress } from "@fex-design/svelte/ui/progress"
  let value = $state(30)
</script>

<div class="grid w-full max-w-md gap-4">
  <div class="flex items-center gap-6"><Progress {value} /><Progress variant="circle" {value} size={96} showInfo /></div>
  <div class="flex gap-2">
    <button
      type="button"
      onclick={() => (value = Math.max(0, value - 10))}
      class="px-3 py-1 text-sm border rounded hover:bg-muted"
    >
      -10%
    </button>
    <button
      type="button"
      onclick={() => (value = Math.min(100, value + 10))}
      class="px-3 py-1 text-sm border rounded hover:bg-muted"
    >
      +10%
    </button>
  </div>
</div>
