<script lang="ts">
  import { Dialog } from "@fex-design/svelte/ui/dialog";
  import { Button } from "@fex-design/svelte/ui/button";
  let result = $state("尚未操作");
  async function show() {
    const handle = Dialog.alert({
      title: "操作成功",
      content: "资料已经保存，可以继续操作。",
    });
    result = (await handle.result) ? "已确认" : "已取消";
  }
</script>

<Button onclick={show}>打开提示弹窗</Button>
<p role="status">{result}</p>
