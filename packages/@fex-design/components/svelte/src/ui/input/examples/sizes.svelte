<script lang="ts">
  import { Input } from "@fex-design/svelte/ui/input";
  const sizes = ["sm", "md", "lg"] as const;
</script>

<div class="grid w-full gap-3">
  {#each sizes as size (size)}<Input {size} placeholder={size} />{/each}
</div>
