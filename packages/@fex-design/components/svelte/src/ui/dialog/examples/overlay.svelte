<script lang="ts">
  import { Dialog } from "@fex-design/svelte/ui/dialog";
  import { Button } from "@fex-design/svelte/ui/button";
  let modal = $state(true);
  let open = $state(false);
  let overlay = $state(true);
  let closable = $state(false);
</script>

<Button onclick={() => (modal = !modal)}>模态：{modal ? "是" : "否"}</Button>
<Button onclick={() => (overlay = !overlay)}
  >Overlay：{overlay ? "有" : "无"}</Button
>
<Button onclick={() => (closable = !closable)}
  >Overlay 点击关闭：{closable ? "开" : "关"}</Button
>
<Button onclick={() => (open = true)}>打开 Dialog</Button><span
  >状态：{open ? "打开" : "关闭"}</span
>
<Dialog
  {modal}
  bind:open
  {overlay}
  closeOnOverlayClick={closable}
  title="Overlay">测试 Overlay 显示和关闭行为。</Dialog
>
