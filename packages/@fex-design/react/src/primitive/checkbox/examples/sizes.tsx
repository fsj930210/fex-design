import { CheckboxControl, CheckboxGroup, CheckboxIndicator, CheckboxLabel, CheckboxRoot } from '@fex-design/react/primitive/checkbox'

export default function Example() {
  return <div className="grid gap-3"><CheckboxRoot size="sm"><CheckboxControl defaultChecked /><CheckboxIndicator /><CheckboxLabel>小尺寸</CheckboxLabel></CheckboxRoot><CheckboxRoot size="md"><CheckboxControl defaultChecked /><CheckboxIndicator /><CheckboxLabel>中尺寸</CheckboxLabel></CheckboxRoot><CheckboxRoot size="lg"><CheckboxControl defaultChecked /><CheckboxIndicator /><CheckboxLabel>大尺寸</CheckboxLabel></CheckboxRoot></div>
}
