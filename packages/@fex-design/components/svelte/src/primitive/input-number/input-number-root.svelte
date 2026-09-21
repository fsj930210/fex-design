<script lang="ts">
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
    controlled?: boolean;
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
    parser?: InputNumberParser;
    formatter?: InputNumberFormatter;
    disabled?: boolean;
    readOnly?: boolean;
    keyboard?: boolean;
    size?: "sm" | "md" | "lg";
    variant?: "outlined" | "filled" | "borderless" | "underlined";
    onChange?: (event: Event, value: number | undefined) => void;
    children?: Snippet;
  }
  let componentProps: Props = $props();
  // svelte-ignore state_referenced_locally -- controlled mode is fixed by initial prop presence
  const hasValue = Object.prototype.hasOwnProperty.call(
    componentProps,
    "value",
  );
  // svelte-ignore state_referenced_locally -- destructuring the reactive props proxy is intentional
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
    ...rest
  }: Props = componentProps;
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
  value={inputNumber.draft}
  {disabled}
  {readOnly}
  data-slot="input-number-root"
  data-out-of-range={inputNumber.outOfRange() || undefined}
  onValueChange={(text, meta) => {
    if (meta.reason === "input") inputNumber.input(text, meta.event);
  }}>{@render children?.()}</InputRoot
>
