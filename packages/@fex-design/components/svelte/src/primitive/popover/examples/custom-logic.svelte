<script lang="ts">
  import { createPopover } from "@fex-design/svelte/primitive/popover";
  import { Button } from "@fex-design/svelte/primitive/button";

  const { overlay, snapshot } = createPopover(() => ({}));
</script>

<div class="flex items-center gap-3">
  <Button onclick={() => overlay.toggle()}
    >{$snapshot.open ? "关闭" : "打开"}</Button
  >
  <output>状态：{$snapshot.open ? "已打开" : "已关闭"}</output>
</div>
