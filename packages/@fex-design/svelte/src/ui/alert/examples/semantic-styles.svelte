<script lang="ts">import { Alert } from '@fex-design/svelte/ui/alert'</script>
<div class="grid w-full max-w-sm gap-4"><Alert showIcon closable title={purpleTitle} style="--alert-color:#7c3aed;--alert-color-background:#f5f3ff;--alert-color-border:#c4b5fd" classNames={{title:'uppercase tracking-wide',icon:'rounded-full bg-white/70 p-0.5'}}/><Alert showIcon closable title={pinkTitle} action={action} style="--alert-color:#be185d;--alert-color-background:#fdf2f8;--alert-color-border:#f9a8d4" styles={{action:'border-radius:999px;background:rgb(255 255 255 / 0.7);padding:2px 8px',close:'color:#831843'}}/></div>
{#snippet purpleTitle()}Custom purple semantic parts{/snippet}
{#snippet pinkTitle()}Custom pink semantic parts{/snippet}
{#snippet action()}<button>Action</button>{/snippet}
