<script lang="ts">
  import {
    Progress,
    ProgressLabel,
    ProgressTrack,
    ProgressRange,
    ProgressCircle,
    ProgressCircleTrack,
    ProgressCircleRange,
  } from "@fex-design/svelte/primitive/progress";
</script>

<div class="grid w-full max-w-xl gap-6">
  <Progress value={72} thickness={12} class="flex flex-col w-full"
    ><div
      class="flex items-center justify-between text-sm mb-1.5 w-full font-semibold"
    >
      <ProgressLabel>上传文件</ProgressLabel><span class="text-violet-600"
        >72%</span
      >
    </div>
    <div class="flex w-full items-center">
      <ProgressTrack class="min-w-0 flex-1 rounded-md"
        ><ProgressRange
          class="rounded-md"
          style="background:linear-gradient(90deg, #6366f1, #a855f7)"
        ></ProgressRange></ProgressTrack
      >
    </div></Progress
  >
  <div class="flex flex-wrap items-center gap-6">
    <Progress
      value={72}
      size={96}
      variant="circle"
      class="relative inline-flex items-center justify-center rounded-full bg-muted/30 p-2"
      ><ProgressCircle
        ><ProgressCircleTrack></ProgressCircleTrack><ProgressCircleRange
          class="text-violet-600"
        ></ProgressCircleRange></ProgressCircle
      >
      <div
        class="absolute inset-0 flex items-center justify-center font-medium"
      >
        72%
      </div></Progress
    ><Progress
      value={72}
      size={96}
      variant="dashboard"
      class="relative inline-flex items-center justify-center rounded-full bg-muted/30 p-2"
      ><ProgressCircle gapDegree={90}
        ><ProgressCircleTrack gapDegree={90}
        ></ProgressCircleTrack><ProgressCircleRange
          gapDegree={90}
          class="text-violet-600"
        ></ProgressCircleRange></ProgressCircle
      >
      <div
        class="absolute inset-0 flex items-center justify-center font-medium"
      >
        72%
      </div></Progress
    >
  </div>
</div>
