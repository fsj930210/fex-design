<script lang="ts">
  import { emptyDescriptionClassName } from "@fex-design/components-styles/empty";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  interface Props extends Omit<HTMLAttributes<HTMLParagraphElement>, "class"> {
    class?: string;
    children?: Snippet;
  }
  let { class: className, children, ...rest }: Props = $props();
</script>

<p {...rest} data-slot="empty-description" class={cn(emptyDescriptionClassName, className)}>
  {@render children?.()}
</p>
