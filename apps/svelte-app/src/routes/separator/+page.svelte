<script lang="ts">
  import Separator from '@fex-design/svelte/primitive/separator'
  import Card from '@fex-design/svelte/ui/card'
  import VariantsDemo from './variants-demo.svelte'
  const items = [['Workspace', 'Fex Design'], ['Plan', 'Team'], ['Region', 'Asia Pacific']]
</script>

<main class="grid gap-4 p-2 md:p-6">
  <Card title="Basic" description="Separate related sections with a semantic horizontal rule.">
    <div class="grid max-w-xl gap-2"><div><div class="font-medium">Fex Design</div><div class="text-sm text-muted-foreground">Composable components for five frameworks.</div></div><Separator/><div class="text-sm">React · Vue · Solid · Svelte · Angular</div></div>
  </Card>
  <Card title="Vertical" description="Use vertical separators between compact inline items."><div class="flex h-5 items-center gap-2"><span>Blog</span><Separator orientation="vertical"/><span>Docs</span><Separator orientation="vertical"/><span>Source</span></div></Card>
  <Card title="Menu" description="Divide groups without splitting related menu items."><div class="grid max-w-sm gap-1.5"><div><div class="font-medium">Settings</div><div class="text-sm text-muted-foreground">Manage preferences</div></div><div><div class="font-medium">Account</div><div class="text-sm text-muted-foreground">Profile and security</div></div><Separator/><div><div class="font-medium">Sign out</div><div class="text-sm text-muted-foreground">End the current session</div></div></div></Card>
  <Card title="List" description="Place separators between rows, not after the final item."><div class="grid max-w-lg">{#each items as [label, value], index (label)}<div><div class="flex justify-between py-2"><span>{label}</span><span class="text-muted-foreground">{value}</span></div>{#if index < items.length - 1}<Separator/>{/if}</div>{/each}</div></Card>
  <Card title="With Text" description="Compose a label between two separators and control its placement."><div class="grid max-w-xl gap-4"><div class="flex items-center gap-2"><Separator class="w-12"/><span class="shrink-0 text-sm text-muted-foreground">Start</span><Separator class="flex-1"/></div><div class="flex items-center gap-2"><Separator class="flex-1"/><span class="shrink-0 text-sm text-muted-foreground">Center</span><Separator class="flex-1"/></div><div class="flex items-center gap-2"><Separator class="flex-1"/><span class="shrink-0 text-sm text-muted-foreground">End</span><Separator class="w-12"/></div></div></Card>
  <VariantsDemo/>
</main>
