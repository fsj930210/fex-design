<script lang="ts">
  import { drawerCloseClassName } from "@fex-design/styles/drawer";
  import XIcon from "../../icon/x.svelte";
  import { useDrawer } from "./drawer-context";
  let {
    children,
    class: className = "",
  }: { children?: import("svelte").Snippet; class?: string } = $props();
  const { drawer } = useDrawer("DrawerClose");
</script>

<button
  type="button"
  aria-label="Close"
  class={`${drawerCloseClassName} ${className}`}
  data-slot="drawer-close"
  onclick={() => drawer.close({ source: "close-button" })}
  >{#if children}{@render children?.()}{:else}<XIcon
      class="size-4"
    />{/if}</button
>
