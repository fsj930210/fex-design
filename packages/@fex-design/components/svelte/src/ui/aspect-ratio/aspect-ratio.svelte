<script lang="ts">
  import type { AspectRatioOptions } from "@fex-design/core/aspect-ratio/types";
  import AspectRatio from '@fex-design/svelte/primitive/aspect-ratio/aspect-ratio.svelte';
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  interface Props extends HTMLAttributes<HTMLDivElement>, AspectRatioOptions {
    children?: Snippet;
  }
  let { ratio, ...props }: Props = $props();
</script>

<AspectRatio {ratio} {...props} />
