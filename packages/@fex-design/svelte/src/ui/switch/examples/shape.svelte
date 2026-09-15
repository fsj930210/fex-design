<script lang="ts">
  import { Switch } from "@fex-design/svelte/ui/switch";
</script>

<div class="grid gap-6 sm:grid-cols-2">
  <section class="grid gap-2">
    <span class="text-sm text-muted-foreground">两种形状</span>
    <div class="flex flex-wrap items-center gap-3">
      <Switch shape="rounded" defaultChecked aria-label="rounded"
      ></Switch><Switch shape="pill" defaultChecked aria-label="pill"></Switch>
    </div>
  </section>
</div>
