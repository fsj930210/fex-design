<script setup lang="ts">
import { Separator } from '@fex-design/vue/primitive/separator'
import Card from '@fex-design/vue/ui/card'
const items = [
  ['Workspace', 'Fex Design'],
  ['Plan', 'Team'],
  ['Region', 'Asia Pacific'],
]
</script>
<template>
  <Card title="Menu" description="Divide groups without splitting related menu items."
    ><div class="grid max-w-sm gap-1.5">
      <div>
        <div class="font-medium">Settings</div>
        <div class="text-sm text-muted-foreground">Manage preferences</div>
      </div>
      <div>
        <div class="font-medium">Account</div>
        <div class="text-sm text-muted-foreground">Profile and security</div>
      </div>
      <Separator />
      <div>
        <div class="font-medium">Sign out</div>
        <div class="text-sm text-muted-foreground">End the current session</div>
      </div>
    </div></Card
  >
</template>
