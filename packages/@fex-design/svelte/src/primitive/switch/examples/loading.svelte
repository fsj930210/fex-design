<script lang="ts">
  import { SwitchRoot, SwitchContent, SwitchThumb } from '@fex-design/svelte/primitive/switch';
  import Spinner from '@fex-design/svelte/primitive/spinner';
  
</script>
<div class="grid gap-6 sm:grid-cols-2"><section class="grid gap-2"><span class="text-sm text-muted-foreground">rounded</span><div class="flex flex-wrap items-center gap-3"><SwitchRoot shape="rounded" loading aria-label="rounded 加载"><SwitchThumb><Spinner /></SwitchThumb></SwitchRoot><SwitchRoot shape="rounded" loading defaultChecked aria-label="rounded 加载"><SwitchThumb><Spinner /></SwitchThumb></SwitchRoot></div></section><section class="grid gap-2"><span class="text-sm text-muted-foreground">pill</span><div class="flex flex-wrap items-center gap-3"><SwitchRoot shape="pill" loading aria-label="pill 加载"><SwitchThumb><Spinner /></SwitchThumb></SwitchRoot><SwitchRoot shape="pill" loading defaultChecked aria-label="pill 加载"><SwitchThumb><Spinner /></SwitchThumb></SwitchRoot></div></section></div>
