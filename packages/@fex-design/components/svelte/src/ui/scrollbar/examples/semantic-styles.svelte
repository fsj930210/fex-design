<script lang="ts">
  import { scrollbarDemoLines } from "@fex-design/docs-shared/scrollbar-demo";
  import { Scrollbar } from "@fex-design/svelte/ui/scrollbar";
</script>

<div class="flex w-full flex-wrap gap-6">
  <section class="grid gap-3">
    <h4 class="text-sm font-medium">各轴部件独立设置 classNames/styles</h4>
    <Scrollbar
      showTrack
      class="h-48 w-72 rounded-md border"
      autoHide={"never"}
      overflow={{ x: "auto", y: "auto" }}
      classNames={{
        viewport: "bg-muted-background/30",
        barX: "z-20",
        barY: "z-20",
        trackX: "bg-primary/15",
        trackY: "bg-primary/15",
        thumbX: "bg-primary",
        thumbY: "bg-primary",
        corner: "bg-primary/15",
      }}
      styles={{
        viewport: "background-color:var(--background)",
        barX: "inset-inline-start:16px",
        barY: "top:16px",
        trackX: "border-radius:4px",
        trackY: "border-radius:4px",
        thumbX: "border-radius:4px",
        thumbY: "border-radius:4px",
        corner: "border-radius:2px",
      }}
      ><div class="grid w-[40rem] gap-3 p-4">
        {#each scrollbarDemoLines as line (line)}<p>{line}</p>{/each}
      </div></Scrollbar
    >
  </section>
</div>
