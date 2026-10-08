<script lang="ts">
  import { Progress } from '@fex-design/svelte/ui/progress'

</script>

<div class="flex gap-6 items-center">
  <Progress variant="dashboard" value={75} thickness={4} gapDegree={90} gapPlacement="bottom" size={96} showInfo />
  <Progress variant="dashboard" value={75} thickness={4} gapDegree={90} gapPlacement="top" size={96} showInfo />
</div>
