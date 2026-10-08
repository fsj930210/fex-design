<script lang="ts">
  import { Progress, ProgressLabel, ProgressValue, ProgressTrack, ProgressRange, ProgressCircle, ProgressCircleTrack, ProgressCircleRange } from '@fex-design/svelte/primitive/progress'

</script>

<div class="grid w-full max-w-md gap-5">
  <div dir="ltr">
    <Progress value={65} class="flex w-full flex-col">
      <div class="mb-1.5 flex w-full items-center justify-between text-sm">
        <ProgressLabel>
          LTR
        </ProgressLabel>
        <ProgressValue>
          65%
        </ProgressValue>
      </div>
      <ProgressTrack>
        <ProgressRange />
      </ProgressTrack>
    </Progress>
  </div>
  <div dir="rtl">
    <Progress value={65} class="flex w-full flex-col">
      <div class="mb-1.5 flex w-full items-center justify-between text-sm">
        <ProgressLabel>
          RTL
        </ProgressLabel>
        <ProgressValue>
          65%
        </ProgressValue>
      </div>
      <ProgressTrack>
        <ProgressRange />
      </ProgressTrack>
    </Progress>
  </div>
  <div class="flex items-start gap-6">
    <div class="grid justify-items-center gap-1 text-sm" dir="ltr">
      <Progress value={65} variant="circle" size={96} class="relative">
        <ProgressCircle>
          <ProgressCircleTrack />
          <ProgressCircleRange />
        </ProgressCircle>
        <div class="absolute inset-0 flex items-center justify-center">
          <ProgressValue>
            65%
          </ProgressValue>
        </div>
      </Progress>
      <span>
        LTR（顺时针）
      </span>
    </div>
    <div class="grid justify-items-center gap-1 text-sm" dir="rtl">
      <Progress value={65} variant="circle" size={96} class="relative">
        <ProgressCircle style="transform: scaleX(-1);">
          <ProgressCircleTrack />
          <ProgressCircleRange />
        </ProgressCircle>
        <div class="absolute inset-0 flex items-center justify-center">
          <ProgressValue>
            65%
          </ProgressValue>
        </div>
      </Progress>
      <span>
        RTL（反向）
      </span>
    </div>
  </div>
</div>
