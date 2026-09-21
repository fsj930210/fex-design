<script lang="ts">
  import {
    SwitchRoot,
    SwitchContent,
    SwitchThumb,
  } from "@fex-design/svelte/primitive/switch";
</script>

<div class="grid gap-6 sm:grid-cols-2">
  <section class="grid gap-2">
    <span class="text-sm text-muted-foreground">两种形状</span>
    <div class="flex flex-wrap items-center gap-3">
      <SwitchRoot shape="rounded" defaultChecked aria-label="rounded"
        ><SwitchThumb /></SwitchRoot
      ><SwitchRoot shape="pill" defaultChecked aria-label="pill"
        ><SwitchThumb /></SwitchRoot
      >
    </div>
  </section>
</div>
