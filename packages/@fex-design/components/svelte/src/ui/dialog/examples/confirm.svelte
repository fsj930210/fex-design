<script lang="ts">
  import { Dialog } from "@fex-design/svelte/ui/dialog";
  import { Button } from "@fex-design/svelte/ui/button";
  let result = $state("尚未操作");
  async function show() {
    const handle = Dialog.confirm({
      title: confirmTitle,
      content: confirmContent,
    });
    result = (await handle.result) ? "已确认" : "已取消";
  }
</script>

{#snippet confirmTitle()}<span class="text-danger">确认删除</span>{/snippet}
{#snippet confirmContent()}<p>
    删除后无法恢复，<strong>请确认是否继续。</strong>
  </p>{/snippet}
<Button onclick={show}>打开确认弹窗</Button>
<p role="status">{result}</p>
