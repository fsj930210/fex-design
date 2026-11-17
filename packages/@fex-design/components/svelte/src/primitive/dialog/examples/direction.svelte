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
  let direction = $state<"ltr" | "rtl">("ltr");
</script>

<Button
  onclick={() => {
    direction = "ltr";
    open = true;
  }}>打开 LTR</Button
><Button
  onclick={() => {
    direction = "rtl";
    open = true;
  }}>打开 RTL</Button
><DialogRoot {open} onOpenChange={(value) => (open = value)}
  ><DialogPortal
    ><DialogOverlay /><DialogContent
      class={direction === "rtl" ? "[direction:rtl]" : "[direction:ltr]"}
      ><DialogHeader><DialogTitle>方向</DialogTitle></DialogHeader
      ><DialogActions><DialogClose /></DialogActions><DialogBody
        >English: read from left to right. العربية: تُقرأ من اليمين إلى اليسار.</DialogBody
      ><DialogFooter
        ><DialogClose>取消</DialogClose><Button variant="solid" color="primary"
          >确定</Button
        ></DialogFooter
      ></DialogContent
    ></DialogPortal
  ></DialogRoot
>
