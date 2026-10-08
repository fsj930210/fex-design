<script lang="ts">
  import { Progress, ProgressLabel, ProgressValue, ProgressTrack, ProgressRange } from '@fex-design/svelte/primitive/progress'

</script>

<div class="grid w-full max-w-md gap-4">
  <Progress value={72} class="flex w-full flex-col">
    <div class="mb-1.5 flex w-full items-center justify-between text-sm">
      <ProgressLabel>
        存储空间
      </ProgressLabel>
      <ProgressValue>
        72 / 100 GB
      </ProgressValue>
    </div>
    <ProgressTrack>
      <ProgressRange />
    </ProgressTrack>
  </Progress>
  <Progress value={48} class="flex w-full flex-col">
    <div class="mb-1.5 flex w-full items-center justify-between text-sm">
      <ProgressLabel>
        处理中
      </ProgressLabel>
      <ProgressValue>
        48%
      </ProgressValue>
    </div>
    <ProgressTrack>
      <ProgressRange />
    </ProgressTrack>
  </Progress>
  <Progress value={84} class="flex w-full flex-col">
    <ProgressTrack>
      <ProgressRange />
    </ProgressTrack>
    <div class="mt-1.5 flex w-full items-center justify-between text-sm">
      <ProgressLabel>
        审核
      </ProgressLabel>
      <ProgressValue>
        84%
      </ProgressValue>
    </div>
  </Progress>
</div>
