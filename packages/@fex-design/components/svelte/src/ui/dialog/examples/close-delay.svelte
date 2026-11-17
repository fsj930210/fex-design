<script lang="ts">
  import { Button } from "@fex-design/svelte/ui/button";
  import { Dialog } from "@fex-design/svelte/ui/dialog";
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
<Dialog
  {open}
  {onOpenChange}
  closeDelay={delay}
  title="关闭延迟"
  styles={{
    content: { "--dialog-motion-duration": (open ? 200 : delay) + "ms" },
  }}
  ><p>点击右上角关闭，或通过按钮设置 open=false，对比关闭过渡。</p>
  <p>open 会立即变为 false，{delay}ms 后结束关闭阶段。</p>
  {#snippet footer()}<Button onclick={close}>设置 open=false</Button
    >{/snippet}</Dialog
>
