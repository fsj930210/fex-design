<script lang="ts">
  import { Progress } from "@fex-design/svelte/ui/progress"
</script>

<div class="flex gap-6 items-center">
  <Progress variant="circle" value={60} steps={10} gap={2} color="var(--info)" showInfo />
  <Progress variant="circle" value={100} steps={10} gap={2} color="var(--success)" success showInfo />
</div>
