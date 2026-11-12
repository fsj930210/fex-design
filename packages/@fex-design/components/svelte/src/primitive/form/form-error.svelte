<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { getFormErrorMessages } from "@fex-design/core/form/error-messages";
  import { formErrorClassName } from "@fex-design/components-styles/form";
  import { cn } from "@fex-design/utils";
  import { createFormBinding } from "./create-form-binding.svelte";
  let {
    ref = $bindable<HTMLDivElement | null>(null),
    id,
    children,
    class: className,
    ...rest
  }: Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    children?: Snippet<[readonly unknown[]]> | string;
    ref?: HTMLDivElement | null;
  } = $props();
  const scope = createFormBinding();
  const generated = $props.id();
  const errors = $derived(scope.presentation().errors);
  const messages = $derived(getFormErrorMessages(errors));
  const visible = $derived(
    errors.length > 0 && (!!children || messages.length > 0),
  );
  // Only rendered feedback contributes an ARIA reference.
  $effect(() =>
    visible
      ? scope.association.register("errors", id ?? `error-${generated}`)
      : undefined,
  );
</script>

{#if visible}
  <div
    bind:this={ref}
    aria-live="polite"
    {...rest}
    id={id ?? `error-${generated}`}
    data-slot="form-error"
    class={cn(formErrorClassName, className)}
  >
    {#if typeof children === "function"}{@render children(errors)}
    {:else if children}{children}
    {:else}{#each messages as message (message)}<div>{message}</div>{/each}{/if}
  </div>
{/if}
