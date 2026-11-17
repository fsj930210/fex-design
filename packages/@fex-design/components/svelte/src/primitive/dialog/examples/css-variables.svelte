<script lang="ts">
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
</script>

<Button onclick={() => (open = true)}>打开 Dialog</Button><DialogRoot
  {open}
  onOpenChange={(value) => (open = value)}
  ><DialogPortal
    ><DialogOverlay /><DialogContent
      class="[--dialog-header-background:var(--color-blue-100)] [--dialog-content-background:var(--color-blue-50)] [--dialog-footer-background:var(--color-indigo-100)]"
      ><DialogHeader><DialogTitle>CSS Variables</DialogTitle></DialogHeader
      ><DialogActions><DialogClose /></DialogActions><DialogBody
        >通过 CSS 变量分别设置标题区、正文和页脚的背景色。</DialogBody
      ><DialogFooter
        ><DialogClose>取消</DialogClose><Button variant="solid" color="primary"
          >确定</Button
        ></DialogFooter
      ></DialogContent
    ></DialogPortal
  ></DialogRoot
>
