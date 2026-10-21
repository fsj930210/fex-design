import { Radio, RadioButton, RadioGroup } from '@fex-design/react/primitive/radio'
export function RadioCssVariablesExample() {
  return (
    <div className="grid gap-3">
      <RadioGroup defaultValue="custom">
        <div className="inline-grid min-w-0 grid-cols-[auto_1fr] items-center gap-2 align-middle">
          <Radio
            id="radio-css-custom"
            value="custom"
            className="[--radio-size:1.5rem] [--radio-checked-color:var(--success)]"
          />
          <label htmlFor="radio-css-custom" className="min-w-0 cursor-pointer select-none text-sm">
            自定义
          </label>
        </div>
      </RadioGroup>
      <RadioGroup defaultValue="button" className="gap-0">
        <RadioButton value="button" className="[--radio-button-checked-background:var(--success)]">
          自定义按钮
        </RadioButton>
      </RadioGroup>
    </div>
  )
}
