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
  } from "@fex-design/svelte/primitive/dialog";
  let open = $state(false);
  let innerOpen = $state(false);
</script>

<Button
  onclick={() => {
    open = true;
  }}>打开外层弹窗</Button
><DialogRoot {open} onOpenChange={(value) => (open = value)}
  ><DialogPortal
    ><DialogOverlay /><DialogContent
      ><DialogHeader><DialogTitle>外层弹窗</DialogTitle></DialogHeader
      ><DialogActions><DialogClose /></DialogActions><DialogBody
        ><p>外层内容会保留。</p>
        <Button
          onclick={() => {
            innerOpen = true;
          }}>打开内层弹窗</Button
        ><DialogRoot
          open={innerOpen}
          onOpenChange={(value) => (innerOpen = value)}
          ><DialogPortal
            ><DialogOverlay /><DialogContent
              ><DialogHeader><DialogTitle>内层弹窗</DialogTitle></DialogHeader
              ><DialogActions><DialogClose /></DialogActions><DialogBody
                ><p>关闭此弹窗后，外层弹窗仍然保留。</p></DialogBody
              ><DialogFooter
                ><Button
                  onclick={() => {
                    innerOpen = false;
                  }}>关闭内层</Button
                ></DialogFooter
              ></DialogContent
            ></DialogPortal
          ></DialogRoot
        ></DialogBody
      ><DialogFooter
        ><Button
          onclick={() => {
            open = false;
          }}>关闭外层</Button
        ></DialogFooter
      ></DialogContent
    ></DialogPortal
  ></DialogRoot
>
