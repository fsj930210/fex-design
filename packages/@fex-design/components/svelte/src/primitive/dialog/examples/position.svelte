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
    ><DialogOverlay /><DialogContent class="top-[200px] translate-y-0"
      ><DialogHeader><DialogTitle>位置</DialogTitle></DialogHeader
      ><DialogActions><DialogClose /></DialogActions><DialogBody
        >Dialog position 场景。</DialogBody
      ><DialogFooter
        ><DialogClose>取消</DialogClose><Button variant="solid" color="primary"
          >确定</Button
        ></DialogFooter
      ></DialogContent
    ></DialogPortal
  ></DialogRoot
>
