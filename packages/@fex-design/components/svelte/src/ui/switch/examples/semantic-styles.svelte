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
        classNames={{
          root: "ring-2",
          content: "font-semibold",
          thumb: "shadow-lg",
        }}
        styles={{
          root: "background-color:#0f766e;color:#fff;",
          content: "letter-spacing:0.08em;",
          thumb: "background-color:#ccfbf1;color:#0f766e;",
        }}
        aria-label="rounded 结构化样式"
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
        classNames={{
          root: "ring-2",
          content: "font-semibold",
          thumb: "shadow-lg",
        }}
        styles={{
          root: "background-color:#0f766e;color:#fff;",
          content: "letter-spacing:0.08em;",
          thumb: "background-color:#ccfbf1;color:#0f766e;",
        }}
        aria-label="pill 结构化样式"
        >{#snippet checkedContent()}开启{/snippet}{#snippet uncheckedContent()}关闭{/snippet}</Switch
      >
    </div>
  </section>
  <section class="grid gap-2">
    <span class="text-sm text-muted-foreground">加载图标</span><Switch
      loading
      defaultChecked
      class="[--switch-track-checked-background:#0f766e] [--switch-thumb-background:#ccfbf1]"
      spinnerProps={{ class: "text-violet-600" }}
      aria-label="加载图标"
    />
  </section>
</div>
