import { Radio, RadioButton, RadioGroup, type RadioValue } from '@fex-design/solid/primitive/radio'
import { Button } from '@fex-design/solid/ui/button'
import { createSignal } from 'solid-js'
export default function Example() {
  const [value, setValue] = createSignal<RadioValue>('pear')
  return (
    <div class="grid gap-3">
      <div class="flex gap-2">
        <Button size="sm" onClick={() => setValue('apple')}>
          选择苹果
        </Button>
        <Button size="sm" onClick={() => setValue('pear')}>
          选择梨
        </Button>
      </div>
      <RadioGroup value={value()} onValueChange={setValue} orientation="horizontal">
        <label>
          <Radio value="apple" /> 苹果
        </label>
        <label>
          <Radio value="pear" /> 梨
        </label>
      </RadioGroup>
      <RadioGroup value={value()} onValueChange={setValue} orientation="horizontal" class="gap-0">
        <RadioButton value="apple">苹果</RadioButton>
        <RadioButton value="pear">梨</RadioButton>
      </RadioGroup>
    </div>
  )
}
