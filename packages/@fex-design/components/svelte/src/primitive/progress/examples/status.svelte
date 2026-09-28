<script lang="ts">
  import { Progress, ProgressRange, ProgressTrack } from '@fex-design/svelte/primitive/progress'

  const items = [
    ['pending', 0], ['active', 40], ['active', 60], ['success', 100], ['error', 80],
  ] as const
</script>

<div class="grid w-full max-w-md gap-3">
  {#each items as [status, value], index (`${status}-${index}`)}
    <Progress {value} {status} class="flex w-full flex-col">
      <div class="flex w-full items-center">
        <ProgressTrack class="min-w-0 flex-1"><ProgressRange /></ProgressTrack>
        <span class="ms-2 shrink-0 text-sm font-medium">
          {#if status === 'success'}
            <span class="inline-flex size-4 items-center justify-center rounded-full bg-success text-[10px] text-white">
              <svg class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m20 6-11 11-5-5" /></svg>
            </span>
          {:else}{value}%{/if}
        </span>
      </div>
    </Progress>
  {/each}
</div>
