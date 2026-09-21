<script lang="ts">
  import type { SwitchOptions } from "@fex-design/core/switch/types";
  import { switchClassName } from "@fex-design/components-styles/switch";
  import { cn } from "@fex-design/utils";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  interface Props
    extends
      Omit<HTMLButtonAttributes, "children" | "type" | "role" | "onchange">,
      SwitchOptions {
    ref?: HTMLButtonElement | null | undefined;
    children?: Snippet<[{ checked: boolean; loading: boolean }]> | undefined;
    onChange?: ((checked: boolean, event: MouseEvent) => void) | undefined;
  }
  let {
    checked,
    defaultChecked = false,
    disabled = false,
    loading = false,
    size = "md",
    shape = "rounded",
    class: className,
    ref = $bindable(null),
    children,
    onclick,
    onChange,
    ...rest
  }: Props = $props();
  // svelte-ignore state_referenced_locally -- defaultChecked initializes uncontrolled state once.
  let internalChecked = $state(defaultChecked);
  const currentChecked = $derived(checked ?? internalChecked);
</script>

<button
  {...rest}
  bind:this={ref}
  type="button"
  role="switch"
  disabled={disabled || loading}
  aria-checked={currentChecked}
  aria-busy={loading || undefined}
  data-slot="switch"
  data-state={currentChecked ? "checked" : "unchecked"}
  data-disabled={disabled ? "" : undefined}
  data-loading={loading ? "" : undefined}
  data-size={size}
  data-shape={shape}
  class={cn(switchClassName({ size, shape }), className)}
  onclick={(event) => {
    onclick?.(event);
    if (event.defaultPrevented || disabled || loading) return;
    const next = !currentChecked;
    if (checked === undefined) internalChecked = next;
    onChange?.(next, event);
  }}
>
  {@render children?.({ checked: currentChecked, loading })}
</button>
