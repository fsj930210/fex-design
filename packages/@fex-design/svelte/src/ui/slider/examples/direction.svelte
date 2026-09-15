<script lang="ts">
  import { Slider } from "@fex-design/svelte/ui/slider";
</script>

<div class="grid w-full max-w-xl gap-6">
  <section dir="ltr">
    <p>中文 LTR</p>
    <Slider defaultValue={30} />
  </section>
  <section dir="rtl">
    <p>العربية RTL</p>
    <Slider defaultValue={30} />
  </section>
  <section><p>Reverse</p><Slider defaultValue={30} reverse /></section>
  <div class="flex h-48 gap-12">
    <section class="grid gap-2"><p>垂直</p><Slider orientation="vertical" defaultValue={35} /></section><section class="grid gap-2"><p>垂直 Reverse</p><Slider
      orientation="vertical"
      reverse
      defaultValue={35}
    /></section>
  </div>
</div>
