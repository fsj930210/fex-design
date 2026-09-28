<script lang="ts">
  import { Progress } from "@fex-design/svelte/ui/progress"
</script>

<div class="grid w-full max-w-md gap-3">
  <Progress value={60} steps={5} color="var(--info)" />
  <Progress value={100} steps={5} color="var(--success)" success />
</div>
