<script lang="ts">
  import { inputNumberRootClassName } from "@fex-design/components-styles/input-number";
  import { cn } from "@fex-design/utils";
  import type {
    InputNumberFormatter,
    InputNumberParser,
  } from "@fex-design/core/input-number/types";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import InputRoot from "../input/input-root.svelte";
  import { setInputNumberContext } from "./context";
  import { useInputNumber } from "./use-input-number.svelte";
  interface Props extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "value" | "onchange"
  > {
    controlled?: boolean | undefined;
    value?: number | undefined;
    defaultValue?: number | undefined;
    min?: number | undefined;
    max?: number | undefined;
    step?: number | undefined;
    precision?: number | undefined;
    parser?: InputNumberParser | undefined;
    formatter?: InputNumberFormatter | undefined;
    disabled?: boolean | undefined;
    readOnly?: boolean | undefined;
    keyboard?: boolean | undefined;
    size?: "sm" | "md" | "lg" | undefined;
    variant?: "outlined" | "filled" | "borderless" | "underlined" | undefined;
    onChange?: ((event: Event, value: number | undefined) => void) | undefined;
    children?: Snippet | undefined;
  }
  let componentProps: Props = $props();
  // svelte-ignore state_referenced_locally -- controlled mode is fixed by initial prop presence
  const hasValue = Object.prototype.hasOwnProperty.call(
    componentProps,
    "value",
  );
  let {
    controlled,
    value,
    defaultValue,
    min,
    max,
    step = 1,
    precision,
    parser,
    formatter,
    disabled = false,
    readOnly = false,
    keyboard = true,
    onChange,
    children,
    class: className,
    ...rest
  }: Props = $derived(componentProps);
  const inputNumber = useInputNumber(() => ({
    controlled: controlled ?? hasValue,
    value,
    defaultValue,
    min,
    max,
    step,
    precision,
    parser,
    formatter,
    disabled,
    readOnly,
    keyboard,
    onChange,
  }));
  setInputNumberContext(inputNumber);
</script>

<InputRoot
  {...rest}
  class={cn(inputNumberRootClassName, className)}
  value={inputNumber.draft}
  {disabled}
  {readOnly}
  data-slot="input-number-root"
  data-out-of-range={inputNumber.outOfRange() || undefined}
  onValueChange={(text, meta) => {
    if (meta.reason === "input") inputNumber.input(text, meta.event);
  }}>{@render children?.()}</InputRoot
>
