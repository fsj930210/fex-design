<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import {
    MenuGroup as PrimitiveGroup,
    MenuGroupLabel,
  } from "@fex-design/svelte/primitive/menu";
  import type { MenuContentValue } from "./types";
  import MenuValue from "./menu-value.svelte";
  let {
    label,
    children,
    ...rest
  }: HTMLAttributes<HTMLDivElement> & { label?: MenuContentValue } = $props();
</script>

<PrimitiveGroup {...rest}
  >{#if label != null}<MenuGroupLabel
      ><MenuValue value={label} /></MenuGroupLabel
    >{/if}{@render children?.()}</PrimitiveGroup
>
