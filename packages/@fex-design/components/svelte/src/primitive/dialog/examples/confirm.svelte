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

<Button onclick={() => (open = true)}>打开确认弹窗</Button>
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
        ><DialogTitle><span class="text-danger">确认删除</span></DialogTitle
        ></DialogHeader
      ><DialogActions><DialogClose /></DialogActions><DialogBody
        ><p>删除后无法恢复，<strong>请确认是否继续。</strong></p></DialogBody
      ><DialogFooter class="border-0"
        ><DialogClose>取消</DialogClose><Button
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
