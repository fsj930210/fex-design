<script lang="ts">
  import { Kbd, KbdGroup } from "@fex-design/svelte/ui/kbd";
</script>

<div class="grid w-full grid-cols-2 gap-6">
  {#each ["ltr", "rtl"] as dir}<div
      {dir}
      class="grid gap-3 rounded-lg border p-4"
    >
      <strong>{dir === "ltr" ? "LTR · 中文示例" : "RTL · مثال عربي"}</strong
      ><KbdGroup><Kbd>Ctrl</Kbd><Kbd>+</Kbd><Kbd>K</Kbd></KbdGroup>
    </div>{/each}
</div>
