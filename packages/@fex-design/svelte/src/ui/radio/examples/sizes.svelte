<script lang="ts">
  import { Radio, RadioButton, RadioGroup } from "@fex-design/svelte/ui/radio";
</script>

<div class="grid gap-4">
  <section class="grid gap-2">
    <span>Radio</span><RadioGroup defaultValue="md" orientation="horizontal"
      ><Radio value="sm" size="sm">sm · 14px</Radio><Radio value="md" size="md"
        >md · 16px</Radio
      ><Radio value="lg" size="lg">lg · 20px</Radio></RadioGroup
    >
  </section>
  <section class="grid gap-2">
    <span>RadioButton（复用全局 Button 高度）</span><RadioGroup
      defaultValue="md"
      orientation="horizontal"
      class="gap-0"
      ><RadioButton value="sm" size="sm">sm · 24px</RadioButton><RadioButton
        value="md"
        size="md">md · 32px</RadioButton
      ><RadioButton value="lg" size="lg">lg · 44px</RadioButton></RadioGroup
    >
  </section>
</div>
