<script lang="ts">
  import { Dialog } from "@fex-design/svelte/ui/dialog";
  import { Button } from "@fex-design/svelte/ui/button";
  let open = $state(false);
</script>

<Button onclick={() => (open = true)}>打开 Dialog</Button>
<Dialog
  bind:open
  title="CSS Variables"
  classNames={{
    content:
      "[--dialog-header-background:var(--color-blue-100)] [--dialog-content-background:var(--color-blue-50)] [--dialog-footer-background:var(--color-indigo-100)]",
  }}><p>通过 CSS 变量分别设置标题区、正文和页脚的背景色。</p></Dialog
>
