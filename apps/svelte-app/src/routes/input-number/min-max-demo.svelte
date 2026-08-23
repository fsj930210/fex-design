<script>
  import InputNumber from '@fex-design/svelte/primitive/input-number'
  import Card from '@fex-design/svelte/ui/card'
</script>

<Card title="Min and max" description="Actions are disabled when the value reaches its boundary.">
  <div class="grid gap-3 md:grid-cols-2">
    <label class="grid gap-1.5 text-sm text-foreground">
      Minimum: 0
      <InputNumber defaultValue={0} min={0} max={10} aria-label="Value at minimum" />
    </label>
    <label class="grid gap-1.5 text-sm text-foreground">
      Maximum: 10
      <InputNumber defaultValue={10} min={0} max={10} aria-label="Value at maximum" />
    </label>
  </div>
</Card>
