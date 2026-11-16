<script lang="ts">
 import { Button } from '@fex-design/svelte/primitive/button'; import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogClose, DialogFullscreenToggle } from '@fex-design/svelte/primitive/dialog'; let open=$state(false);
</script>
<Button onclick={()=>open=true}>打开 Dialog</Button><DialogRoot {open} onOpenChange={(value)=>open=value}><DialogPortal><DialogOverlay/><DialogContent><DialogHeader><DialogTitle>Overlay</DialogTitle><DialogClose/></DialogHeader><DialogBody>Dialog overlay 场景。</DialogBody><DialogFooter><DialogClose>取消</DialogClose><Button variant="solid" color="primary">确定</Button></DialogFooter></DialogContent></DialogPortal></DialogRoot>

