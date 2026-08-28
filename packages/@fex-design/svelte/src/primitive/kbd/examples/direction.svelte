<script lang="ts">import Kbd from '../kbd.svelte'; import KbdGroup from '../kbd-group.svelte'</script>
<div class="grid w-full grid-cols-2 gap-6">{#each ['ltr', 'rtl'] as dir}<div {dir} class="grid gap-3 rounded-lg border p-4"><strong>{dir.toUpperCase()}</strong><KbdGroup><Kbd>Ctrl</Kbd><Kbd>+</Kbd><Kbd>K</Kbd></KbdGroup></div>{/each}</div>
