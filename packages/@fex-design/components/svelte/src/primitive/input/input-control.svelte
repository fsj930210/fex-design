<script lang="ts">
  import { inputControlClassName } from "@fex-design/components-styles/input";
  import { cn } from "@fex-design/utils";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { getInputContext, type InputContextValue } from "./context";
  import { getNativeControlTarget } from "@fex-design/svelte/utils/native-control-target";
  import { untrack } from "svelte";
  interface Props extends Omit<HTMLInputAttributes, "class" | "value"> {
    class?: string | undefined;
    ref?: HTMLInputElement | null;
    inputContext?: InputContextValue;
  }
  let {
    class: className,
    oninput,
    ref = $bindable(null),
    inputContext,
    ...rest
  }: Props = $props();
  // The mounted control belongs to one input context for its entire lifetime.
  const input = untrack(() => inputContext ?? getInputContext("InputControl"));
  const registerTarget = getNativeControlTarget();
  $effect(() => {
    const element = ref;
    if (element) return untrack(() => registerTarget?.(element));
  });
  export function focus() {
    ref?.focus();
  }
  export function blur() {
    ref?.blur();
  }
  export function select() {
    ref?.select();
  }
  // bind:this is the framework boundary that keeps the shared clear/focus controller attached to the live node.
  $effect(() => {
    input.setFocusElement(ref ?? null);
  });
</script>

<input
  {...rest}
  bind:this={ref}
  value={input.value()}
  disabled={input.disabled() || rest.disabled}
  readonly={input.readOnly() || rest.readonly}
  data-slot="input-control"
  class={cn(inputControlClassName, className)}
  oninput={(event) => {
    oninput?.(event);
    if (!event.defaultPrevented)
      input.setValue(event.currentTarget.value, "input", event);
  }}
/>
