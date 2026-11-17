<script lang="ts">
  import { Dialog } from "@fex-design/svelte/ui/dialog";
  import { Button } from "@fex-design/svelte/ui/button";
  let open = $state(false);
</script>

<Button onclick={() => (open = true)}>打开 Dialog</Button>
<Dialog
  bind:open
  title="Semantic Styles"
  classNames={{
    content:
      "top-[80px] left-[24px] translate-x-0 translate-y-0 w-[calc(100%-48px)] max-w-[480px]",
    header: "bg-blue-100",
    title: "text-xl text-blue-900",
    body: "bg-blue-50 p-8 text-base text-blue-950",
    footer: "justify-start gap-4 bg-indigo-100",
  }}
  ><p>
    通过结构化样式设置 top: 80px、left:
    24px，并分别定制标题区、正文和页脚的颜色。
  </p></Dialog
>
