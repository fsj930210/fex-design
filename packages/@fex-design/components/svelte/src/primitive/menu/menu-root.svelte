<script lang="ts">
  import { setContext, type Snippet } from "svelte";
  import type { MenuOptions } from "@fex-design/core/menu/types";
  import { menuKey, menuLevelKey, subMenuKey } from "./context";
  import { useMenu } from "./use-menu.svelte";
  let { children, ...options }: MenuOptions & { children?: Snippet } = $props();
  const binding = useMenu(() => ({ ...options }));
  setContext(menuKey, binding.dom);
  setContext(menuLevelKey, undefined);
  setContext(subMenuKey, undefined);
</script>

{@render children?.()}
