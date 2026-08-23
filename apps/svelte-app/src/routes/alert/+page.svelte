<script lang="ts">
  import Alert from '@fex-design/svelte/primitive/alert'
  import AlertAction from '@fex-design/svelte/primitive/alert-action'
  import AlertDescription from '@fex-design/svelte/primitive/alert-description'
  import AlertTitle from '@fex-design/svelte/primitive/alert-title'
  import Badge from '@fex-design/svelte/primitive/badge'
  import Card from '@fex-design/svelte/ui/card'
  import InfoIcon from '@fex-design/svelte/icon/info'

  const variants = ['default', 'success', 'warning', 'destructive'] as const
</script>

<main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4"><div class="mx-auto w-full max-w-5xl space-y-4"><header class="space-y-2"><a class="text-sm text-muted-foreground hover:text-foreground" href="/">Back home</a><h1 class="text-2xl font-semibold text-foreground">Alert</h1><p class="max-w-2xl text-sm leading-6 text-muted-foreground">Show status messages with clear semantics.</p></header><Card title="Primitive" description="Structure with icon, title, description, and action."><div class="grid gap-2">{#each variants as variant}<Alert {variant}><InfoIcon /><AlertTitle>{variant}</AlertTitle><AlertDescription>The current task is in {variant} state. Continue with the page action.</AlertDescription><AlertAction><Badge variant="outline">New</Badge></AlertAction></Alert>{/each}</div></Card></div></main>
