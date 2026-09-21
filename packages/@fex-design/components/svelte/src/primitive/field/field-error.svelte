<script lang="ts">
  import { fieldErrorClassName } from "@fex-design/components-styles/field";
  import { cn } from "@fex-design/utils";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { getFieldContext } from "./context";
  let {
    id,
    class: className,
    children,
    ...rest
  }: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
  const field = getFieldContext("FieldError");
</script>

{#if children}<div
    {...rest}
    id={id ?? field.errorId()}
    role="alert"
    aria-live="polite"
    data-slot="field-error"
    class={cn(fieldErrorClassName, className)}
  >
    {@render children()}
  </div>{/if}
