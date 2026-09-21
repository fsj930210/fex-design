<script lang="ts">
  import { cascaderContentClassName } from "@fex-design/components-styles/cascader";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import PopoverContent from "../popover/popover-content.svelte";
  import PopoverPortal from "../popover/popover-portal.svelte";
  import CascaderPanel from "./cascader-panel.svelte";
  let { class: className, children }: { class?: string; children?: Snippet } =
    $props();
</script>

<PopoverPortal
  ><PopoverContent class={cn(cascaderContentClassName, className)}
    >{#if children}{@render children()}{:else}<CascaderPanel
      />{/if}</PopoverContent
  ></PopoverPortal
>
