<script lang="ts">
  import { scrollbarViewportLines } from "@fex-design/docs-shared/scrollbar-demo";
  import { Scrollbar } from "@fex-design/svelte/ui/scrollbar";
  import { Button } from "@fex-design/svelte/ui/button";
  let viewport = $state<HTMLDivElement>();
  let lastKey = $state("尚未按键");
  function onkeydown(event: KeyboardEvent) {
    lastKey = event.key;
  }
</script>

<div class="grid w-full max-w-md gap-4">
  <div class="flex flex-wrap gap-2">
    <Button onclick={() => viewport?.scrollTo({ top: 0 })}>回到顶部</Button>
    <Button onclick={() => viewport?.scrollBy({ top: 120 })}>向下 120px</Button>
    <Button
      onclick={() => viewport?.scrollTo({ top: viewport?.scrollHeight ?? 0 })}
      >滚动到底部</Button
    >
  </div>
  <Scrollbar
    class="h-48 w-72 rounded-md border"
    autoHide="never"
    overflow={{ x: "hidden" }}
    bind:viewportElement={viewport}
    viewportProps={{
      role: "region",
      "aria-label": "可通过键盘滚动的内容",
      tabindex: 0,
      class:
        "outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
      onkeydown,
    }}
  >
    <div class="grid gap-3 p-4">
      {#each scrollbarViewportLines as line (line)}<p>{line}</p>{/each}
    </div>
  </Scrollbar>
  <output class="text-sm text-muted-foreground">最近按键：{lastKey}</output>
</div>
