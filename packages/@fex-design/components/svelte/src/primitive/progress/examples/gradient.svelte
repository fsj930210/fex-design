<script lang="ts">
  import { Progress, ProgressTrack, ProgressRange, ProgressValue, ProgressCircle, ProgressCircleTrack, ProgressCircleRange } from '@fex-design/svelte/primitive/progress'

</script>

<div class="grid w-full max-w-md gap-4">
  <Progress value={90} class="inline-flex items-center gap-2">
    <ProgressTrack>
      <ProgressRange class="bg-[linear-gradient(to_right,_#1677ff,_#87d068)]" />
    </ProgressTrack>
    <ProgressValue>
      90%
    </ProgressValue>
  </Progress>
  <div class="flex items-center gap-6">
    <Progress value={90} variant="circle" size={96} class="relative">
      <ProgressCircle>
        <defs>
          <linearGradient id="progress-gradient-circle" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#1677ff" />
            <stop offset="100%" stop-color="#87d068" />
          </linearGradient>
        </defs>
        <ProgressCircleTrack />
        <ProgressCircleRange stroke="url(#progress-gradient-circle)" />
      </ProgressCircle>
      <div class="absolute inset-0 flex items-center justify-center">
        <ProgressValue>
          90%
        </ProgressValue>
      </div>
    </Progress>
    <Progress value={90} variant="dashboard" size={96} class="relative">
      <ProgressCircle gapDegree={90}>
        <defs>
          <linearGradient id="progress-gradient-dashboard" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#1677ff" />
            <stop offset="100%" stop-color="#87d068" />
          </linearGradient>
        </defs>
        <ProgressCircleTrack gapDegree={90} />
        <ProgressCircleRange gapDegree={90} stroke="url(#progress-gradient-dashboard)" />
      </ProgressCircle>
      <div class="absolute inset-0 flex items-center justify-center">
        <ProgressValue>
          90%
        </ProgressValue>
      </div>
    </Progress>
  </div>
</div>
