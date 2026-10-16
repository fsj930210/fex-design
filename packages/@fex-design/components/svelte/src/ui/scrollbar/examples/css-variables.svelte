<script lang="ts">
  import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
  import { Scrollbar } from '@fex-design/svelte/ui/scrollbar';
</script>
<div class="flex w-full flex-wrap gap-6">
  <section class="grid gap-3"><h4 class="text-sm font-medium">尺寸、内边距、圆角、轨道、滑块及交角颜色</h4>
    <Scrollbar showTrack class="h-48 w-72 rounded-md border" autoHide={"never"} overflow={{"x":"auto","y":"auto"}} style="--scrollbar-size:12px;--scrollbar-padding:2px;--scrollbar-radius:6px;--scrollbar-track-color:#e0e7ff;--scrollbar-thumb-color:#6366f1;--scrollbar-thumb-hover-color:#4f46e5;--scrollbar-thumb-active-color:#312e81;--scrollbar-corner-color:#e0e7ff;--scrollbar-transition-duration:250ms"><div class="grid w-[40rem] gap-3 p-4">{#each scrollbarDemoLines as line (line)}<p>{line}</p>{/each}</div></Scrollbar>
  </section>
</div>
