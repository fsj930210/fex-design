<script lang="ts">
  import { Progress, ProgressTrack, ProgressRange } from '@fex-design/svelte/primitive/progress'
</script>

<div class="grid w-full max-w-md gap-4">
  <Progress value={35} class="flex w-full flex-col">
    <div class="flex w-full items-center justify-between text-sm mb-1.5">
      <span class="text-sm font-medium text-foreground">Upload progress</span>
      <span class="text-muted-foreground">35%</span>
    </div>
    <div class="flex w-full items-center">
      <ProgressTrack class="min-w-0 flex-1">
      <ProgressRange />
      </ProgressTrack>
    </div>
  </Progress>
  <Progress value={65} class="flex w-full flex-col">
    <div class="flex w-full items-center">
      <ProgressTrack class="min-w-0 flex-1">
        <ProgressRange />
      </ProgressTrack>
      <span class="ms-2 shrink-0 text-sm font-medium">65%</span>
    </div>
  </Progress>
</div>
