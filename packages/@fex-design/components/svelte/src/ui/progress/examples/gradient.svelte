<script lang="ts">
  import { Progress } from '@fex-design/svelte/ui/progress'

</script>

<div class="grid w-full max-w-md gap-4">
  <Progress value={90} color={{"from":"#1677ff","to":"#87d068"}} />
  <div class="flex items-center gap-6">
    <Progress variant="circle" value={90} size={96} color={{"from":"#1677ff","to":"#87d068"}} showInfo />
    <Progress variant="dashboard" value={90} size={96} color={{"from":"#1677ff","to":"#87d068"}} showInfo />
  </div>
</div>
