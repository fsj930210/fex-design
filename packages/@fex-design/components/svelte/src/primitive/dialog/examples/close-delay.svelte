<script lang="ts">
  import { Button } from "@fex-design/svelte/primitive/button";
  import {
    DialogRoot,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogActions,
    DialogClose,
    DialogBody,
    DialogFooter,
  } from "@fex-design/svelte/primitive/dialog";
  let open = $state(false);
  let delay = $state(200);
  let feedback = $state("尚未操作");
  function show(milliseconds: number) {
    delay = milliseconds;
    open = true;
    feedback = "外部设置 open=true";
  }
  function onOpenChange(next: boolean) {
    open = next;
    feedback = "onOpenChange(" + next + ")";
  }
  function close() {
    open = false;
    feedback = "外部设置 open=false";
  }
</script>

<div class="flex flex-wrap justify-center gap-2">
  <Button onclick={() => show(0)}>打开（0ms）</Button><Button
    onclick={() => show(200)}>打开（200ms）</Button
  ><Button onclick={() => show(1200)}>打开（1200ms）</Button>
</div>
<p role="status">
  open：{String(open)}；closeDelay：{delay}ms；最近操作：{feedback}
</p>
<DialogRoot {open} {onOpenChange} closeDelay={delay}
  ><DialogPortal
    ><DialogOverlay /><DialogContent
      style={"--dialog-motion-duration:" + (open ? 200 : delay) + "ms"}
      ><DialogHeader><DialogTitle>关闭延迟</DialogTitle></DialogHeader
      ><DialogActions><DialogClose /></DialogActions><DialogBody
        ><p>点击右上角关闭，或通过按钮设置 open=false，对比关闭过渡。</p>
        <p>open 会立即变为 false，{delay}ms 后结束关闭阶段。</p></DialogBody
      ><DialogFooter
        ><Button onclick={close}>设置 open=false</Button></DialogFooter
      ></DialogContent
    ></DialogPortal
  ></DialogRoot
>
