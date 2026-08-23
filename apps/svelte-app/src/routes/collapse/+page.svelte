<script lang="ts">
  import AccordionDemo from './accordion-demo.svelte'
  import BasicDemo from './basic-demo.svelte'
  import ControlledDemo from './controlled-demo.svelte'
  import CustomDemo from './custom-demo.svelte'
  import NestedDemo from './nested-demo.svelte'
  import RefDemo from './ref-demo.svelte'
  import VariantDemo from './variant-demo.svelte'
</script>

<main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
  <div class="mx-auto w-full max-w-5xl space-y-4">
    <header class="space-y-1.5">
      <a class="text-sm text-muted-foreground hover:text-foreground" href="/">Back home</a>
      <div>
        <h1 class="text-2xl font-semibold text-foreground">Collapse</h1>
        <p class="max-w-3xl text-sm leading-6 text-muted-foreground">
          Composable disclosure panels with multiple mode, accordion mode, controlled state,
          instance methods and complete custom rendering.
        </p>
      </div>
    </header>
    <div class="space-y-4">
      <BasicDemo />
      <AccordionDemo />
      <ControlledDemo />
      <RefDemo />
      <CustomDemo />
      <VariantDemo />
      <NestedDemo />
    </div>
  </div>
</main>
