<script lang="ts">
  import { Slider } from '@fex-design/svelte/ui/slider'
  import StepRingDemo from './_parts/step-ring.svelte'
  let gap = $state(2)
  function changeGap(next: number | number[]) { gap = typeof next === 'number' ? next : next[0] ?? 2 }
</script>

<div class="grid w-full max-w-md gap-4">
  <label class="grid gap-2 text-sm">
    <span class="font-medium">
      分段间隔：{gap}px
    </span>
    <Slider value={gap} min={0} max={8} step={1} onChange={changeGap} />
  </label>
  <div class="flex items-center gap-6">
    <StepRingDemo value={50} gap={gap} steps={8} color="var(--info)" />
    <StepRingDemo value={100} gap={gap} steps={8} color="var(--success)" />
  </div>
</div>
