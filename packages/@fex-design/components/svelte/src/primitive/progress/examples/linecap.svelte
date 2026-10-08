<script lang="ts">
import { Progress, ProgressTrack, ProgressRange, ProgressValue } from '@fex-design/svelte/primitive/progress'
</script>

<div class="grid w-full max-w-md gap-3">
    <div class="flex items-center gap-3"><span class="w-12 text-sm text-muted-foreground">直角</span>
      <Progress value={50} class="flex flex-1 flex-col"><div class="flex w-full items-center"><ProgressTrack class="min-w-0 flex-1" style="border-radius: 0px;"><ProgressRange style="border-radius: 0px;" /></ProgressTrack><ProgressValue class="ms-2 shrink-0 text-sm font-medium">50%</ProgressValue></div></Progress>
    </div>
    <div class="flex items-center gap-3"><span class="w-12 text-sm text-muted-foreground">小圆角</span>
      <Progress value={50} class="flex flex-1 flex-col"><div class="flex w-full items-center"><ProgressTrack class="min-w-0 flex-1" style="border-radius: 2px;"><ProgressRange style="border-radius: 2px;" /></ProgressTrack><ProgressValue class="ms-2 shrink-0 text-sm font-medium">50%</ProgressValue></div></Progress>
    </div>
    <div class="flex items-center gap-3"><span class="w-12 text-sm text-muted-foreground">胶囊</span>
      <Progress value={50} class="flex flex-1 flex-col"><div class="flex w-full items-center"><ProgressTrack class="min-w-0 flex-1" style="border-radius: 9999px;"><ProgressRange style="border-radius: 9999px;" /></ProgressTrack><ProgressValue class="ms-2 shrink-0 text-sm font-medium">50%</ProgressValue></div></Progress>
    </div>
</div>
