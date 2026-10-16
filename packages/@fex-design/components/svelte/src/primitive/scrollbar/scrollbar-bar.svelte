<script lang="ts">
  import type { ScrollbarAxis } from '@fex-design/core/scrollbar/types';
  import { scrollbarBarClassName } from '@fex-design/components-styles/scrollbar';
  import { cn } from '@fex-design/utils';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  interface Props extends HTMLAttributes<HTMLDivElement> {
    axis: ScrollbarAxis;
    children?: Snippet;
    element?: HTMLDivElement | undefined;
  }
  let { axis, children, element = $bindable(), class: className, ...rest }: Props = $props();
</script>

<div
  {...rest}
  bind:this={element}
  data-slot="scrollbar-bar"
  data-axis={axis}
  data-visible="false"
  class={cn(scrollbarBarClassName({ axis }), className)}
>
  {@render children?.()}
</div>
