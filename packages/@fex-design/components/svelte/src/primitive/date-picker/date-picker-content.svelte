<script lang="ts">
  import { usePickerAppearance } from "./appearance-context";
  const appearance = usePickerAppearance();
  import {
    pickerContainerKey,
    type PickerContainerScope,
  } from "./container-context";
  import { getContext, type Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "@fex-design/utils";
  import { datePickerContentClassName } from "@fex-design/components-styles/date-picker";
  import { PopoverContent, PopoverPortal } from "../popover";
  import {
    popoverContextKey,
    type PopoverContext,
  } from "../popover/popover-context";
  let {
    class: className,
    style,
    children,
    ...rest
  }: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
  const popover = getContext<PopoverContext | undefined>(popoverContextKey);
  const containerScope = getContext<PickerContainerScope | undefined>(
    pickerContainerKey,
  );
</script>

{#if popover && (!containerScope || popover !== containerScope.parentPopover)}
  <PopoverPortal
    ><PopoverContent
      {...rest}
      data-slot="date-picker-content"
      class={cn(
        datePickerContentClassName,
        appearance().popoverProps?.classNames?.root,
        className,
      )}
      style={[appearance().popoverProps?.styles?.root, style]
        .filter(Boolean)
        .join(";")}>{@render children?.()}</PopoverContent
    ></PopoverPortal
  >
{:else}
  <div
    {...rest}
    data-slot="date-picker-content"
    class={cn(
      datePickerContentClassName,
      appearance().popoverProps?.classNames?.root,
      className,
    )}
    style={[appearance().popoverProps?.styles?.root, style]
      .filter(Boolean)
      .join(";")}
  >
    {@render children?.()}
  </div>
{/if}
