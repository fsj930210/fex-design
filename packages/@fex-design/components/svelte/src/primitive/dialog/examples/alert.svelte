<script lang="ts">
  import { dialogMessageClassName } from "@fex-design/components-styles/dialog";

  import { Button } from "@fex-design/svelte/primitive/button";
  import {
    DialogRoot,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogHeader,
    DialogActions,
    DialogTitle,
    DialogBody,
    DialogFooter,
    DialogClose,
    DialogFullscreenToggle,
  } from "@fex-design/svelte/primitive/dialog";
  let open = $state(false);
  let result = $state("尚未操作");
</script>

<Button onclick={() => (open = true)}>打开提示弹窗</Button>
<p role="status">{result}</p>
<DialogRoot
  closeOnEscape={false}
  closeOnOverlayClick={false}
  {open}
  onOpenChange={(value) => {
    if (!value) result = "已取消";
    open = value;
  }}
  ><DialogPortal
    ><DialogOverlay /><DialogContent class={dialogMessageClassName}
      ><DialogHeader class="border-0"
        ><DialogTitle>操作成功</DialogTitle></DialogHeader
      ><DialogBody>资料已经保存，可以继续操作。</DialogBody><DialogFooter
        class="border-0"
        ><Button
          variant="solid"
          color="primary"
          onclick={() => {
            result = "已确认";
            open = false;
          }}>确定</Button
        ></DialogFooter
      ></DialogContent
    ></DialogPortal
  ></DialogRoot
>
