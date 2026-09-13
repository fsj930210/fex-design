import { CheckboxControl, CheckboxGroup, CheckboxIndicator, CheckboxLabel, CheckboxRoot } from '@fex-design/react/primitive/checkbox'

export default function Example() {
  return <div className="grid gap-3"><CheckboxRoot><CheckboxControl defaultChecked /><CheckboxIndicator><span className="text-xs">★</span></CheckboxIndicator><CheckboxLabel>收藏项目</CheckboxLabel></CheckboxRoot></div>
}
