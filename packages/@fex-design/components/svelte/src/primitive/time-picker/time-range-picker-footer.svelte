<script lang="ts">
  import type { ComponentProps } from "svelte";
  let {
    cancelButtonProps,
    confirmButtonProps,
  }: {
    cancelButtonProps?:
      | Omit<
          ComponentProps<typeof Button>,
          "children" | "type" | "disabled" | "onclick"
        >
      | undefined;
    confirmButtonProps?:
      | Omit<
          ComponentProps<typeof Button>,
          "children" | "type" | "disabled" | "onclick"
        >
      | undefined;
  } = $props();
  import { Button } from "../button";
  import { getTimeRangePickerContext } from "./time-range-picker-context";
  const { controller, snapshot, options } = getTimeRangePickerContext();
  const canConfirm = () => {
    snapshot();
    return controller.canConfirm();
  };
</script>

{#if options().needConfirm !== false}
  <div
    data-slot="time-range-picker-footer"
    class="flex justify-end gap-2 border-t border-border p-2"
  >
    <Button
      variant="text"
      {...cancelButtonProps}
      type="button"
      disabled={false}
      onclick={() => controller.cancel()}>取消</Button
    >
    <Button
      color="primary"
      variant="solid"
      {...confirmButtonProps}
      type="button"
      disabled={!canConfirm()}
      onclick={() => controller.confirm()}>确定</Button
    >
  </div>
{/if}
