<script lang="ts">
  import { dialogMessageClassName } from "@fex-design/components-styles/dialog";
  import type { DialogStaticButtonProps, DialogStaticContent } from "./static";
  import { onDestroy } from "svelte";
  import type { createDialogRequest } from "@fex-design/core/dialog/create-dialog-controller";
  import Dialog from "./dialog.svelte";
  import { Button } from "../button";
  let {
    request,
  }: {
    request: ReturnType<
      typeof createDialogRequest<DialogStaticContent, DialogStaticButtonProps>
    >;
  } = $props();
  let state = $state(request.getSnapshot());
  const unsubscribe = request.subscribe(() => {
    state = request.getSnapshot();
  });
  onDestroy(unsubscribe);
</script>

<Dialog
  open={state.open}
  title={state.options.title ??
    (request.kind === "alert" ? "提示" : "确认操作")}
  closable={(state.options.closable ?? request.kind === "confirm") &&
    !state.pending}
  closeOnEscape={false}
  closeOnOverlayClick={false}
  classNames={{ content: dialogMessageClassName }}
  onOpenChange={(open) => {
    if (!open) void request.cancel();
  }}
>
  {#if typeof state.options.content === "function"}{@render state.options.content()}{:else}<p
    >
      {state.options.content}
    </p>{/if}
  <p role="alert" class="text-danger">{state.error}</p>
  {#snippet footer()}{#if request.kind === "confirm"}<Button
        {...state.options.cancelBtnProps}
        type="button"
        disabled={state.pending || state.options.cancelBtnProps?.disabled}
        onclick={() => void request.cancel()}
        >{#if state.options.cancelBtnProps?.children}{@render state.options.cancelBtnProps.children()}{:else}取消{/if}</Button
      >{/if}<Button
      variant="solid"
      color="primary"
      {...state.options.okBtnProps}
      type="button"
      disabled={state.pending || state.options.okBtnProps?.disabled}
      loading={state.pending || state.options.okBtnProps?.loading}
      onclick={() => void request.confirm()}
      >{#if state.options.okBtnProps?.children}{@render state.options.okBtnProps.children()}{:else}确定{/if}</Button
    >{/snippet}
</Dialog>
