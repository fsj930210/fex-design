<script lang="ts">
  import { Progress, ProgressTrack, ProgressRange, ProgressValue, ProgressCircle, ProgressCircleTrack, ProgressCircleRange } from '@fex-design/svelte/primitive/progress'

</script>

<div class="grid w-full max-w-md gap-4">
  <Progress value={45} class="inline-flex items-center gap-2">
    <ProgressTrack class="w-full bg-[#cffafe]">
      <ProgressRange class="bg-[#7c3aed]" />
    </ProgressTrack>
    <ProgressValue>
      45%
    </ProgressValue>
  </Progress>
  <Progress value={75} class="inline-flex items-center gap-2">
    <ProgressTrack>
      <ProgressRange class="bg-[linear-gradient(to_right,_#1677ff_0%,_#87d068_100%)]" />
    </ProgressTrack>
    <ProgressValue>
      75%
    </ProgressValue>
  </Progress>
  <div class="flex gap-4">
    <Progress value={60} variant="circle" size={96} class="relative">
      <ProgressCircle>
        <ProgressCircleTrack />
        <ProgressCircleRange class="text-[#7c3aed]" />
      </ProgressCircle>
      <div class="absolute inset-0 flex items-center justify-center">
        <ProgressValue class="text-sm">
          60%
        </ProgressValue>
      </div>
    </Progress>
  </div>
</div>
