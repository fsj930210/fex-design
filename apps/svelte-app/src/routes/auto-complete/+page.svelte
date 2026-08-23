<script lang="ts">
  import BasicDemo from './basic-demo.svelte'
  import ControlledDemo from './controlled-demo.svelte'
  import CustomDemo from './custom-demo.svelte'
  import RemoteDemo from './remote-demo.svelte'
</script>
<svelte:head><title>AutoComplete</title></svelte:head>
<main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
  <div class="mx-auto w-full max-w-5xl space-y-4">
    <header class="space-y-2">
      <a class="text-sm text-muted-foreground hover:text-foreground" href="/">Back home</a>
      <h1 class="text-2xl font-semibold text-foreground">AutoComplete</h1>
      <p class="max-w-2xl text-sm text-muted-foreground">Free text input with optional local or remote suggestions. Selection metadata preserves complete backend records.</p>
    </header>
    <div class="grid gap-4"><BasicDemo /><ControlledDemo /><RemoteDemo /><CustomDemo /></div>
  </div>
</main>
