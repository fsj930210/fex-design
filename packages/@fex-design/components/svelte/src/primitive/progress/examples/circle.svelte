<script lang="ts">
  import { Progress, ProgressCircle, ProgressCircleTrack, ProgressCircleRange, ProgressValue } from '@fex-design/svelte/primitive/progress'
  import CheckIcon from '@fex-design/svelte/icons/check'

</script>

<div class="flex flex-wrap items-center gap-4">
  <Progress value={30} variant="circle" size={96} class="relative">
    <ProgressCircle>
      <ProgressCircleTrack />
      <ProgressCircleRange class="text-primary" />
    </ProgressCircle>
    <div class="absolute inset-0 flex items-center justify-center">
      <ProgressValue class="text-sm font-semibold">
        30%
      </ProgressValue>
    </div>
  </Progress>
  <Progress value={70} variant="circle" size={96} class="relative">
    <ProgressCircle>
      <ProgressCircleTrack />
      <ProgressCircleRange class="text-primary" />
    </ProgressCircle>
    <div class="absolute inset-0 flex items-center justify-center">
      <ProgressValue class="text-sm font-semibold">
        70%
      </ProgressValue>
    </div>
  </Progress>
  <Progress value={100} variant="circle" size={96} class="relative" status="success">
    <ProgressCircle>
      <ProgressCircleTrack />
      <ProgressCircleRange class="text-success" />
    </ProgressCircle>
    <div class="absolute inset-0 flex items-center justify-center">
      <CheckIcon class="size-6 text-success" />
    </div>
  </Progress>
  <Progress value={50} variant="circle" size={96} class="relative" status="error">
    <ProgressCircle>
      <ProgressCircleTrack />
      <ProgressCircleRange class="text-primary" />
    </ProgressCircle>
    <div class="absolute inset-0 flex items-center justify-center">
      <ProgressValue class="text-sm font-semibold">
        50%
      </ProgressValue>
    </div>
  </Progress>
</div>
