import { Radio, RadioButton, RadioGroup } from '@fex-design/react/ui/radio'
export default function Example() {
  return (
    <div className="grid gap-3">
      <RadioGroup defaultValue="custom">
        <Radio
          value="custom"
          className="[--radio-size:1.5rem] [--radio-checked-color:var(--success)]"
        >
          自定义
        </Radio>
      </RadioGroup>
      <RadioGroup defaultValue="button" className="gap-0">
        <RadioButton value="button" className="[--radio-button-checked-background:var(--success)]">
          自定义按钮
        </RadioButton>
      </RadioGroup>
    </div>
  )
}
