<script lang="ts">
  import { Progress, ProgressCircle, ProgressValue } from '@fex-design/svelte/primitive/progress'
  import CheckIcon from '@fex-design/svelte/icons/check'
  import { getCircleStepsGeometry } from '@fex-design/core/progress/progress'
  let { value, gap = 2, steps = 10, color }: { value: number; gap?: number; steps?: number; color?: string } = $props()
  const geometry = $derived(getCircleStepsGeometry({ value, gap, steps, size: 96, thickness: 4 }))
  const ringColor = $derived(color ?? (value === 100 ? 'var(--success)' : 'var(--info)'))
</script>

<Progress value={value} variant="circle" size={96} thickness={4} class="relative">
  <ProgressCircle>
    {#each geometry.steps as step (step.index)}
      <circle
        cx={48}
        cy={48}
        r={geometry.radius}
        fill="none"
        stroke={step.active ? ringColor : 'var(--progress-remaining)'}
        stroke-width={4}
        stroke-dasharray={geometry.stepDasharray}
        stroke-dashoffset={step.offset}
        stroke-linecap="butt"
        pathLength={geometry.circumference}
      />
    {/each}
  </ProgressCircle>
  <div class="absolute inset-0 flex items-center justify-center">
    {#if value === 100}
      <CheckIcon class="size-5 text-success" />
    {:else}
      <ProgressValue class="text-sm">
        {value}%
      </ProgressValue>
    {/if}
  </div>
</Progress>
