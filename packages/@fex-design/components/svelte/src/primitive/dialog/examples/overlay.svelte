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
  let modal = $state(true);
  let open = $state(false);
  let overlay = $state(true);
  let closable = $state(false);
</script>

<Button onclick={() => (modal = !modal)}>模态：{modal ? "是" : "否"}</Button>
<Button onclick={() => (overlay = !overlay)}
  >Overlay：{overlay ? "有" : "无"}</Button
><Button onclick={() => (closable = !closable)}
  >Overlay 点击关闭：{closable ? "开" : "关"}</Button
><Button onclick={() => (open = true)}>打开 Dialog</Button><span
  >状态：{open ? "打开" : "关闭"}</span
><DialogRoot
  {modal}
  {open}
  closeOnOverlayClick={closable}
  onOpenChange={(value) => (open = value)}
  ><DialogPortal
    >{#if overlay}<DialogOverlay />{/if}<DialogContent
      ><DialogHeader><DialogTitle>Overlay</DialogTitle></DialogHeader
      ><DialogActions><DialogClose /></DialogActions><DialogBody
        >测试 Overlay 显示和关闭行为。</DialogBody
      ><DialogFooter
        ><DialogClose>取消</DialogClose><Button variant="solid" color="primary"
          >确定</Button
        ></DialogFooter
      ></DialogContent
    ></DialogPortal
  ></DialogRoot
>
