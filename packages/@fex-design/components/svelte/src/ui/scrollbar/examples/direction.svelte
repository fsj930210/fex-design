<script lang="ts">
  import { scrollbarDemoLines } from "@fex-design/docs-shared/scrollbar-demo";
  import { Scrollbar } from "@fex-design/svelte/ui/scrollbar";
</script>

<div class="flex w-full flex-wrap gap-6">
  <section class="grid gap-3">
    <h4 class="text-sm font-medium">LTR：纵向滚动条在右侧</h4>
    <Scrollbar
      class="h-48 w-72 rounded-md border"
      autoHide={"never"}
      overflow={{ x: "auto", y: "auto" }}
      dir={"ltr"}
      ><div class="grid w-[40rem] gap-3 p-4">
        {#each scrollbarDemoLines as line (line)}<p>{line}</p>{/each}
      </div></Scrollbar
    >
  </section>
  <section class="grid gap-3">
    <h4 class="text-sm font-medium">RTL：纵向滚动条在左侧</h4>
    <Scrollbar
      class="h-48 w-72 rounded-md border"
      autoHide={"never"}
      overflow={{ x: "auto", y: "auto" }}
      dir={"rtl"}
      ><div class="grid w-[40rem] gap-3 p-4">
        {#each scrollbarDemoLines as line (line)}<p>{line}</p>{/each}
      </div></Scrollbar
    >
  </section>
</div>
