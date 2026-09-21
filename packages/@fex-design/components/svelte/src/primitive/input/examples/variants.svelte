<script lang="ts">
  import { InputControl, InputRoot } from "@fex-design/svelte/primitive/input";
  const variants = ["outlined", "filled", "borderless", "underlined"] as const;
</script>

<div class="grid w-full gap-3">
  {#each variants as variant (variant)}<InputRoot {variant}
      ><InputControl placeholder={variant} /></InputRoot
    >{/each}
</div>
