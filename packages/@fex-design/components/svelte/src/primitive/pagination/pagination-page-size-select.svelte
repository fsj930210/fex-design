<script lang="ts">
  import { filterControlledSelectProps } from "@fex-design/core/select/component-props";
  import type { ComponentProps } from "svelte";
  import type { HTMLAttributes, HTMLInputAttributes } from "svelte/elements";
  import { getPaginationPageSizes } from "@fex-design/core/pagination/pagination-range";
  import {
    paginationPageSizeSelectClassName,
    paginationSelectTriggerClassName,
  } from "@fex-design/components-styles/pagination";
  import { cn } from "@fex-design/utils";
  import { SelectRoot, SelectTrigger, SelectContent } from "../select";
  import { getPaginationContext } from "./context";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    selectRootProps?:
      | Omit<
          ComponentProps<typeof SelectRoot>,
          | "children"
          | "options"
          | "value"
          | "defaultValue"
          | "multiple"
          | "disabled"
          | "clearable"
          | "onChange"
          | "onUpdate:value"
        >
      | undefined;
    selectTriggerProps?:
      | Omit<ComponentProps<typeof SelectTrigger>, "children" | "inputProps">
      | undefined;
    selectContentProps?: ComponentProps<typeof SelectContent> | undefined;
    options?: readonly number[];
    disabled?: boolean;
    inputProps?: HTMLInputAttributes;
  }
  let {
    selectRootProps,
    selectTriggerProps,
    selectContentProps,
    options,
    disabled,
    inputProps,
    class: className,
    ...rest
  }: Props = $props();
  const { controller, snapshot, size } = getPaginationContext();
  const items = $derived(
    getPaginationPageSizes(snapshot().pageSize, options).map((value) => ({
      value,
      label: snapshot().labels.pageSizeOption(value),
    })),
  );
</script>

<div
  {...rest}
  data-slot="pagination-page-size-select"
  class={cn(paginationPageSizeSelectClassName, className)}
>
  <SelectRoot
    {...filterControlledSelectProps(selectRootProps)}
    multiple={false}
    clearable={false}
    options={items}
    value={snapshot().pageSize}
    disabled={disabled || snapshot().disabled}
    onChange={(value) => {
      if (typeof value === "number") controller.setPageSize(value);
    }}
  >
    <SelectTrigger
      {...selectTriggerProps}
      class={cn(
        paginationSelectTriggerClassName({ size: size() }),
        selectTriggerProps?.class,
      )}
      inputProps={{ "aria-label": snapshot().labels.pageSize, ...inputProps }}
    /><SelectContent {...selectContentProps} />
  </SelectRoot>
</div>
