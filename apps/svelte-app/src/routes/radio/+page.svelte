<script lang="ts">
  import Radio from '@fex-design/svelte/primitive/radio'
  import RadioButton from '@fex-design/svelte/primitive/radio-button'
  import RadioGroup from '@fex-design/svelte/primitive/radio-group'
  import Card from '@fex-design/svelte/ui/card'
  import type { SelectionValue } from '@fex-design/core/selection/types'

  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Pear', value: 'pear' },
    { label: 'Orange', value: 'orange' },
  ] as const

  type RadioValue = SelectionValue

  let controlled: RadioValue = $state('pear')
  let groupValue: RadioValue = $state('orange')
  let buttonValue: RadioValue = $state('apple')
</script>

<main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
  <div class="mx-auto w-full max-w-5xl space-y-4">
    <header class="space-y-4">
      <a class="text-sm text-muted-foreground hover:text-foreground" href="/">Back home</a>
      <div>
        <h1 class="text-2xl font-semibold text-foreground">Radio</h1>
        <p class="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Single-value radio group with native aria state and button-style radio options.
        </p>
      </div>
    </header>

    <div class="space-y-4">
      <Card title="Basic" description="RadioGroup owns one selected value.">
        <RadioGroup defaultValue="apple" orientation="horizontal">
          {#each options as option (option.value)}
            <label class="inline-flex min-w-0 items-center gap-2 text-sm">
              <Radio value={option.value} />
              <span>{option.label}</span>
            </label>
          {/each}
        </RadioGroup>
      </Card>

      <Card title="Controlled" description="Controlled state uses value and onValueChange.">
        <div class="grid min-w-0 gap-2">
          <RadioGroup value={controlled} onValueChange={(value) => (controlled = value)} orientation="horizontal">
            {#each options as option (option.value)}
              <label class="inline-flex min-w-0 items-center gap-2 text-sm">
                <Radio value={option.value} />
                <span>{option.label}</span>
              </label>
            {/each}
          </RadioGroup>
          <p class="text-sm text-muted-foreground">Current value: {controlled}</p>
        </div>
      </Card>

      <Card title="Group" description="Vertical group layout still uses one selected value.">
        <div class="grid min-w-0 gap-2">
          <RadioGroup value={groupValue} onValueChange={(value) => (groupValue = value)}>
            {#each options as option (option.value)}
              <label class="inline-flex min-w-0 items-center gap-2 text-sm">
                <Radio value={option.value} />
                <span>{option.label}</span>
              </label>
            {/each}
          </RadioGroup>
          <p class="text-sm text-muted-foreground">Selected: {groupValue}</p>
        </div>
      </Card>

      <Card title="RadioButton" description="Button-form radios share the same RadioGroup value.">
        <div class="grid min-w-0 gap-2">
          <RadioGroup value={buttonValue} onValueChange={(value) => (buttonValue = value)} orientation="horizontal" class="grid grid-cols-3 gap-0">
            {#each options as option (option.value)}
              <RadioButton value={option.value}>{option.label}</RadioButton>
            {/each}
          </RadioGroup>
          <p class="text-sm text-muted-foreground">Current value: {buttonValue}</p>
        </div>
      </Card>

      <Card title="Disabled" description="Disabled state can live on the group or a single radio.">
        <div class="grid min-w-0 gap-2">
          <RadioGroup defaultValue="pear" orientation="horizontal">
            <label class="inline-flex min-w-0 items-center gap-2 text-sm"><Radio value="apple" /><span>Apple</span></label>
            <label class="inline-flex min-w-0 items-center gap-2 text-sm"><Radio value="pear" /><span>Pear</span></label>
            <label class="inline-flex min-w-0 items-center gap-2 text-sm"><Radio value="orange" disabled /><span>Orange disabled</span></label>
          </RadioGroup>
          <RadioGroup defaultValue="apple" disabled orientation="horizontal" class="grid grid-cols-3 gap-0">
            {#each options as option (option.value)}
              <RadioButton value={option.value}>{option.label}</RadioButton>
            {/each}
          </RadioGroup>
        </div>
      </Card>
    </div>
  </div>
</main>
