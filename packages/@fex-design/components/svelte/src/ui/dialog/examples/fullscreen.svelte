<script lang="ts">
  import { Dialog } from "@fex-design/svelte/ui/dialog";
  import { Button } from "@fex-design/svelte/ui/button";
  let open = $state(false);
  let mode = $state<"viewport" | "screen">("viewport");
</script>

<Button onclick={() => (mode = mode === "viewport" ? "screen" : "viewport")}
  >切换为 {mode === "viewport" ? "浏览器全屏" : "视口全屏"}</Button
>
<Button onclick={() => (open = true)}>打开 Dialog</Button>
<Dialog bind:open fullscreen={{ mode }} title="全屏">全屏内容。</Dialog>
