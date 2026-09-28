<script lang="ts">
  import { Progress } from "@fex-design/svelte/ui/progress"
</script>

<div class="grid w-full max-w-md gap-4">
  <Progress label="Upload progress" value={35} infoPlacement="top" />
  <Progress value={65} />
</div>
