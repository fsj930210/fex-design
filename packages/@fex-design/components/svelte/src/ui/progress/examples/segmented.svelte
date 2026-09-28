<script lang="ts">
  import { Progress } from "@fex-design/svelte/ui/progress"
  const segmentGradient = {
    stops: {
      "0%": "#1677ff",
      "50%": "#1677ff",
      "50.01%": "#faad14",
      "75%": "#faad14",
      "75.01%": "#52c41a",
      "100%": "#52c41a",
    },
  }
</script>

<div class="grid w-full max-w-md gap-4">
  <Progress value={75} color={segmentGradient} />
  <div class="flex gap-4">
    <Progress variant="circle" value={80} color={segmentGradient} showInfo />
  </div>
</div>
