<script lang="ts">
  import { SwitchRoot, SwitchContent, SwitchThumb } from '@fex-design/svelte/primitive/switch';
  
</script>
<div class="grid gap-6 sm:grid-cols-2"><section class="grid gap-2"><span class="text-sm text-muted-foreground">rounded</span><div class="flex flex-wrap items-center gap-3"><SwitchRoot shape="rounded" disabled aria-label="rounded 禁用关闭"><SwitchThumb /></SwitchRoot><SwitchRoot shape="rounded" disabled defaultChecked aria-label="rounded 禁用开启"><SwitchThumb /></SwitchRoot></div></section><section class="grid gap-2"><span class="text-sm text-muted-foreground">pill</span><div class="flex flex-wrap items-center gap-3"><SwitchRoot shape="pill" disabled aria-label="pill 禁用关闭"><SwitchThumb /></SwitchRoot><SwitchRoot shape="pill" disabled defaultChecked aria-label="pill 禁用开启"><SwitchThumb /></SwitchRoot></div></section></div>
