<script lang="ts">
import Separator from '../separator.svelte'
import Card from '@fex-design/svelte/ui/card'
</script>
<Card title="Basic" description="Separate related sections with a semantic horizontal rule.">
  <div class="grid max-w-xl gap-2">
    <div>
      <div class="font-medium">Fex Design</div>
      <div class="text-sm text-muted-foreground">
        Composable components for five frameworks.
      </div>
    </div>
    <Separator />
    <div class="text-sm">React · Vue · Solid · Svelte · Angular</div>
  </div>
</Card>
