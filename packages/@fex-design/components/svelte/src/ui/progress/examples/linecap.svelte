<script lang="ts">
import { Progress } from '@fex-design/svelte/ui/progress'
</script>

<div class="grid w-full max-w-md gap-3">
    <div class="flex items-center gap-3"><span class="w-12 text-sm text-muted-foreground">直角</span>
      <Progress value={50} class="flex-1" styles={{ track: 'border-radius: 0px;', range: 'border-radius: 0px;' }} />
    </div>
    <div class="flex items-center gap-3"><span class="w-12 text-sm text-muted-foreground">小圆角</span>
      <Progress value={50} class="flex-1" styles={{ track: 'border-radius: 2px;', range: 'border-radius: 2px;' }} />
    </div>
    <div class="flex items-center gap-3"><span class="w-12 text-sm text-muted-foreground">胶囊</span>
      <Progress value={50} class="flex-1" styles={{ track: 'border-radius: 9999px;', range: 'border-radius: 9999px;' }} />
    </div>
</div>
