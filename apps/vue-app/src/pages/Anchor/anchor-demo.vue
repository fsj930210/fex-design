<script setup lang="ts">
import { Anchor, type AnchorItem } from '@fex-design/vue/ui/anchor'
import Card from '@fex-design/vue/ui/card'
import { ref } from 'vue'

const container = ref<HTMLElement>()
const activeKeys = ref<readonly string[]>([])
const currentKeys = ref<readonly string[]>([])
const items: AnchorItem<string>[] = [
  { key: 'anchor-overview', title: 'Overview', target: '#anchor-overview' },
  {
    key: 'anchor-api',
    title: 'API',
    target: '#anchor-api',
    children: [{ key: 'anchor-props', title: 'Props', target: '#anchor-props' }],
  },
  { key: 'anchor-examples', title: 'Examples', target: '#anchor-examples' },
]
</script>

<template>
  <Card
    title="Current and progress"
    description="Progress mode keeps all anchors passed so far active."
  >
    <div class="grid gap-3 lg:grid-cols-[10rem_10rem_1fr]">
      <div>
        <p class="mb-1.5 text-xs font-medium text-muted-foreground">Current</p>
        <Anchor
          :items="items"
          :active-keys="currentKeys"
          :target-offset="80"
          :container="() => container ?? window"
          @change="currentKeys = $event"
        />
      </div>
      <div>
        <p class="mb-1.5 text-xs font-medium text-muted-foreground">Progress</p>
        <Anchor
          :items="items"
          active-mode="progress"
          :active-keys="activeKeys"
          :target-offset="80"
          :container="() => container ?? window"
          @change="activeKeys = $event"
        />
      </div>
      <div ref="container" class="h-72 overflow-y-auto rounded-md border border-border p-3">
        <section id="anchor-overview" class="min-h-48">
          <h3 class="font-medium">Overview</h3>
          <p class="mt-2 text-sm text-muted-foreground">
            Anchor tracks content inside any scroll container.
          </p>
        </section>
        <section id="anchor-api" class="min-h-48">
          <h3 class="font-medium">API</h3>
          <p class="mt-2 text-sm text-muted-foreground">
            Progress mode keeps previously passed anchors active.
          </p>
        </section>
        <section id="anchor-props" class="min-h-48">
          <h3 class="font-medium">Props</h3>
          <p class="mt-2 text-sm text-muted-foreground">
            Nested headings preserve their real hierarchy.
          </p>
        </section>
        <section id="anchor-examples" class="min-h-48">
          <h3 class="font-medium">Examples</h3>
          <p class="mt-2 text-sm text-muted-foreground">Click an item or scroll this panel.</p>
        </section>
      </div>
    </div>
    <p class="mt-2 text-xs text-muted-foreground">
      current: {{ currentKeys.join(', ') || 'none' }} · progress:
      {{ activeKeys.join(', ') || 'none' }}
    </p>
  </Card>
</template>
