<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { formDescriptionClassName } from "@fex-design/components-styles/form";
  import { cn } from "@fex-design/utils";
  import { getFieldScope } from "./context";
  let {
    ref = $bindable<HTMLParagraphElement | null>(null),
    id,
    children,
    class: className,
    ...rest
  }: HTMLAttributes<HTMLParagraphElement> & {
    children?: Snippet | string;
    ref?: HTMLParagraphElement | null;
  } = $props();
  const generated = $props.id();
  const { association } = getFieldScope();
  // DOM ID association follows the mounted description and explicit ID changes.
  $effect(() =>
    association.register("descriptions", id ?? `description-${generated}`),
  );
</script>

<p
  bind:this={ref}
  {...rest}
  id={id ?? `description-${generated}`}
  data-slot="form-description"
  class={cn(formDescriptionClassName, className)}
>
  {#if typeof children === "function"}{@render children()}{:else}{children}{/if}
</p>
