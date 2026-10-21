import { cn } from '@fex-design/utils'
import { RadioGroup, Radio, RadioButton } from '@fex-design/react/primitive/radio'
import { radioItemClassName, radioLabelClassName } from '@fex-design/components-styles/radio'

export function RadioSemanticStylesExample() {
  return (
    <div className="grid gap-4">
      <RadioGroup defaultValue="apple">
        <div className={cn(radioItemClassName, 'gap-3')}>
          <Radio
            id="semantic-radio-apple"
            value="apple"
            className="ring-2 ring-orange-300 [--radio-checked-color:var(--success)]"
          ></Radio>
          <label
            htmlFor="semantic-radio-apple"
            className={cn(radioLabelClassName, 'font-bold text-violet-700')}
          >
            苹果
          </label>
        </div>
      </RadioGroup>
      <RadioGroup defaultValue="apple" className="gap-0">
        <RadioButton value="apple" className="[--radio-button-checked-background:var(--success)]">
          苹果
        </RadioButton>
        <RadioButton value="pear">梨按钮</RadioButton>
      </RadioGroup>
    </div>
  )
}
