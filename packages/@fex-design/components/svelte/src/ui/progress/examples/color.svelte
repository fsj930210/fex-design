<script lang="ts">
  import { Progress } from "@fex-design/svelte/ui/progress"
  const gradient = { from: "#1677ff", to: "#87d068", direction: "to right" }
</script>

<div class="grid w-full max-w-md gap-4">
  <Progress value={45} color="#7c3aed" trackColor="#cffafe" />
  <Progress value={75} color={gradient} />
  <div class="flex gap-4">
    <Progress variant="circle" value={60} color={gradient} showInfo />
  </div>
</div>
