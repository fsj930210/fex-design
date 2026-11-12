<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLLabelAttributes } from "svelte/elements";
  import { formLabelClassName } from "@fex-design/components-styles/form";
  import { cn } from "@fex-design/utils";
  import { readableCoreStore } from "../../stores/core-store";
  import { getFieldScope } from "./context";
  let {
    ref = $bindable<HTMLLabelElement | null>(null),
    id,
    required = false,
    children,
    class: className,
    ...rest
  }: HTMLLabelAttributes & {
    required?: boolean;
    children?: Snippet | string;
    ref?: HTMLLabelElement | null;
  } = $props();
  const { association } = getFieldScope();
  const generated = $props.id();
  const links = readableCoreStore(association);
  // Label IDs provide accessible names for custom composite controls too.
  $effect(() => association.register("labels", id ?? `label-${generated}`));
  // Required is a mounted label association, not a validator or duplicated field state.
  $effect(() => (required ? association.require() : undefined));
</script>

<label
  bind:this={ref}
  {...rest}
  id={id ?? `label-${generated}`}
  for={rest.for ?? $links.controlId}
  data-slot="form-label"
  data-required={required || undefined}
  class={cn(formLabelClassName, className)}
>
  {#if typeof children === "function"}{@render children()}{:else}{children}{/if}
</label>
