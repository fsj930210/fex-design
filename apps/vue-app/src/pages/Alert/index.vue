<script setup lang="ts">
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@fex-design/vue/primitive/alert'
import { Badge } from '@fex-design/vue/primitive/badge'
import Card from '@fex-design/vue/ui/card'
import { InfoIcon } from '@fex-design/vue/icon/info'

const variants = ['default', 'success', 'warning', 'destructive'] as const
</script>

<template>
  <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
    <div class="mx-auto w-full max-w-5xl space-y-4">
      <header class="space-y-2">
        <RouterLink class="text-sm text-muted-foreground hover:text-foreground" to="/"
          >Back home</RouterLink
        >
        <h1 class="text-2xl font-semibold text-foreground">Alert</h1>
        <p class="max-w-2xl text-sm leading-6 text-muted-foreground">
          Show status messages with clear semantics.
        </p>
      </header>
      <Card title="Primitive" description="Structure with icon, title, description, and action."
        ><div class="grid gap-2">
          <Alert v-for="variant in variants" :key="variant" :variant="variant"
            ><InfoIcon /><AlertTitle>{{ variant }}</AlertTitle
            ><AlertDescription
              >The current task is in {{ variant }} state. Continue with the page
              action.</AlertDescription
            ><AlertAction><Badge variant="outline">New</Badge></AlertAction></Alert
          >
        </div></Card
      >
    </div>
  </main>
</template>
