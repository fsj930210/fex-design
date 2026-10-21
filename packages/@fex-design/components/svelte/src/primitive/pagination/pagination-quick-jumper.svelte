<script lang="ts">
  import { filterPaginationInputNumberProps } from "@fex-design/core/pagination/create-pagination-controller";
  import type { ComponentProps } from "svelte";
  import type { HTMLAttributes, HTMLInputAttributes } from "svelte/elements";
  import {
    paginationQuickJumperClassName,
    paginationInputControlClassName,
  } from "@fex-design/components-styles/pagination";
  import { cn } from "@fex-design/utils";
  import {
    InputNumberRoot,
    InputNumberControl,
    InputNumberActions,
    InputNumberIncrement,
    InputNumberDecrement,
  } from "../input-number";
  import { getPaginationContext } from "./context";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    inputActionsProps?: ComponentProps<typeof InputNumberActions> | undefined;
    incrementProps?:
      Omit<ComponentProps<typeof InputNumberIncrement>, "children"> | undefined;
    decrementProps?:
      Omit<ComponentProps<typeof InputNumberDecrement>, "children"> | undefined;

    inputNumberProps?:
      | Omit<
          ComponentProps<typeof InputNumberRoot>,
          | "children"
          | "value"
          | "defaultValue"
          | "controlled"
          | "onChange"
          | "min"
          | "max"
          | "step"
          | "precision"
          | "parser"
          | "formatter"
          | "disabled"
          | "readOnly"
          | "size"
        >
      | undefined;
    disabled?: boolean;
    inputProps?: HTMLInputAttributes;
  }
  let {
    inputActionsProps,
    incrementProps,
    decrementProps,
    inputNumberProps,
    disabled,
    inputProps,
    class: className,
    ...rest
  }: Props = $props();
  const { controller, snapshot, size } = getPaginationContext();
</script>

<div
  {...rest}
  data-slot="pagination-quick-jumper"
  class={cn(paginationQuickJumperClassName, className)}
>
  <InputNumberRoot
    {...filterPaginationInputNumberProps(inputNumberProps)}
    step={1}
    class={cn(
      paginationInputControlClassName({ size: size() }),
      inputNumberProps?.class,
    )}
    size={size()}
    min={1}
    max={Math.max(1, snapshot().pageCount)}
    precision={0}
    disabled={disabled || snapshot().disabled || snapshot().pageCount === 0}
  >
    <InputNumberControl
      {...inputProps}
      inputmode="numeric"
      aria-label={inputProps?.["aria-label"] ?? snapshot().labels.quickJumper}
      onkeydown={(event) => {
        inputProps?.onkeydown?.(event);
        if (
          disabled ||
          snapshot().disabled ||
          snapshot().pageCount === 0 ||
          event.defaultPrevented ||
          event.isComposing ||
          event.key !== "Enter"
        )
          return;
        event.preventDefault();
        if (event.currentTarget.value.trim())
          controller.setPage(Number(event.currentTarget.value), "jump");
      }}
    />
    <InputNumberActions {...inputActionsProps}>
      <InputNumberIncrement {...incrementProps} />
      <InputNumberDecrement {...decrementProps} />
    </InputNumberActions>
  </InputNumberRoot>
</div>
