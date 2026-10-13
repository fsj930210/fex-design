<script lang="ts">import { Select } from '@fex-design/svelte/ui/select'; const options=[{value:'react',label:'React'},{value:'vue',label:'Vue'}]</script>
{#snippet popupRender(menu: import("svelte").Snippet)}<div>{@render menu()}<div class="border-t border-border px-3 py-2 text-xs text-muted-foreground">选择常用框架</div></div>{/snippet}
<Select class="w-72" {options} {popupRender} />
