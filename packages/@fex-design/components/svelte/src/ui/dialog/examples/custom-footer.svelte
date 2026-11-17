<script lang="ts">
  import { Dialog } from "@fex-design/svelte/ui/dialog";
  import { Button } from "@fex-design/svelte/ui/button";
  let open = $state(false);
</script>

<Button onclick={() => (open = true)}>打开 Dialog</Button>
{#snippet customFooter()}<Button onclick={() => (open = false)}>取消</Button
  ><Button>保存草稿</Button><Button variant="solid" color="primary">确定</Button
  >{/snippet}
<Dialog bind:open title="自定义 Footer" footer={customFooter}
  ><p>Dialog custom-footer 场景。</p></Dialog
>
