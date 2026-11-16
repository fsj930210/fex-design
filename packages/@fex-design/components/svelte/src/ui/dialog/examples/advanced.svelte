<script lang="ts">
  import { Dialog } from '@fex-design/svelte/ui/dialog'
  import { Button } from '@fex-design/svelte/ui/button'
  let open = $state(false); let minimized = $state(false); let maximized = $state(false); let position = $state({x:0,y:0}); let start = {x:0,y:0}
  function down(event: PointerEvent){start={x:event.clientX-position.x,y:event.clientY-position.y};window.addEventListener('pointermove',move);window.addEventListener('pointerup',up,{once:true})}
  function move(event: PointerEvent){position={x:event.clientX-start.x,y:event.clientY-start.y}}
  function up(){window.removeEventListener('pointermove',move)}
</script>
<Button onclick={() => open = true}>打开 Dialog</Button>
<Dialog {open} onOpenChange={(value) => open = value} title="高级交互"><div style={`transform:translate(calc(-50% + ${position.x}px),calc(-50% + ${position.y}px))`} class={maximized ? 'resize min-w-80 max-w-none min-h-55 max-h-none w-screen h-screen' : 'resize min-w-80 max-w-[860px] min-h-55 max-h-[620px]'}><div role="button" tabindex="0" class="cursor-move select-none" onpointerdown={down}>拖动这里移动 Dialog</div><Button onclick={() => minimized = !minimized}>{minimized ? '恢复' : '最小化'}</Button><Button onclick={() => maximized = !maximized}>{maximized ? '还原' : '最大化'}</Button>{#if !minimized}<p>调整右下角尺寸，并使用最小化/最大化控制。</p>{/if}</div></Dialog>
