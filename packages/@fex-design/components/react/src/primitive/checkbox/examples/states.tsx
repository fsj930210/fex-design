import {
  CheckboxControl,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
} from '@fex-design/react/primitive/checkbox'

export default function Example() {
  return (
    <div className="grid gap-3">
      <CheckboxRoot>
        <CheckboxControl />
        <CheckboxIndicator />
        <CheckboxLabel>未选中</CheckboxLabel>
      </CheckboxRoot>
      <CheckboxRoot>
        <CheckboxControl defaultChecked />
        <CheckboxIndicator />
        <CheckboxLabel>已选中</CheckboxLabel>
      </CheckboxRoot>
      <CheckboxRoot>
        <CheckboxControl indeterminate />
        <CheckboxIndicator />
        <CheckboxLabel>中间状态</CheckboxLabel>
      </CheckboxRoot>
      <CheckboxRoot>
        <CheckboxControl disabled />
        <CheckboxIndicator />
        <CheckboxLabel>禁用</CheckboxLabel>
      </CheckboxRoot>
      <CheckboxRoot>
        <CheckboxControl defaultChecked disabled />
        <CheckboxIndicator />
        <CheckboxLabel>禁用且已选中</CheckboxLabel>
      </CheckboxRoot>
    </div>
  )
}
