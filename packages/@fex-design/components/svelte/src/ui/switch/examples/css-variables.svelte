<script lang="ts">
  import { Switch } from "@fex-design/svelte/ui/switch";
</script>

<div class="grid gap-6 sm:grid-cols-2">
  <section class="grid gap-2">
    <span class="text-sm text-muted-foreground">rounded</span>
    <div class="flex flex-wrap items-center gap-3">
      <Switch
        shape="rounded"
        defaultChecked
        style="--switch-track-background:#dbeafe;--switch-track-checked-background:#7c3aed;--switch-track-border-color:#60a5fa;--switch-track-checked-border-color:#6d28d9;--switch-color:#1e3a8a;--switch-checked-color:#fff;--switch-thumb-background:#fef3c7;--switch-thumb-color:#7c3aed;"
        aria-label="rounded CSS Variables"
        >{#snippet checkedContent()}开启{/snippet}{#snippet uncheckedContent()}关闭{/snippet}</Switch
      >
    </div>
  </section>
  <section class="grid gap-2">
    <span class="text-sm text-muted-foreground">pill</span>
    <div class="flex flex-wrap items-center gap-3">
      <Switch
        shape="pill"
        defaultChecked
        style="--switch-track-background:#dbeafe;--switch-track-checked-background:#7c3aed;--switch-track-border-color:#60a5fa;--switch-track-checked-border-color:#6d28d9;--switch-color:#1e3a8a;--switch-checked-color:#fff;--switch-thumb-background:#fef3c7;--switch-thumb-color:#7c3aed;"
        aria-label="pill CSS Variables"
        >{#snippet checkedContent()}开启{/snippet}{#snippet uncheckedContent()}关闭{/snippet}</Switch
      >
    </div>
  </section>
</div>
