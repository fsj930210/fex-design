<script lang="ts">
  import { Switch } from "@fex-design/svelte/ui/switch";
</script>

<div class="grid gap-6 sm:grid-cols-2">
  <section dir="ltr" class="grid gap-2">
    <span class="text-sm text-muted-foreground">LTR</span>
    <div class="flex flex-wrap items-center gap-3">
      <Switch shape="rounded" defaultChecked aria-label="rounded 文字开关"
        >{#snippet checkedContent()}开启{/snippet}{#snippet uncheckedContent()}关闭{/snippet}</Switch
      ><Switch shape="pill" defaultChecked aria-label="pill 文字开关"
        >{#snippet checkedContent()}开启{/snippet}{#snippet uncheckedContent()}关闭{/snippet}</Switch
      >
    </div>
  </section>
  <section dir="rtl" class="grid gap-2">
    <span class="text-sm text-muted-foreground">RTL</span>
    <div class="flex flex-wrap items-center gap-3">
      <Switch shape="rounded" defaultChecked aria-label="rounded 文字开关"
        >{#snippet checkedContent()}开启{/snippet}{#snippet uncheckedContent()}关闭{/snippet}</Switch
      ><Switch shape="pill" defaultChecked aria-label="pill 文字开关"
        >{#snippet checkedContent()}开启{/snippet}{#snippet uncheckedContent()}关闭{/snippet}</Switch
      >
    </div>
  </section>
</div>
