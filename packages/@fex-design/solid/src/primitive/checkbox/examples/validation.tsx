import { CheckboxControl, CheckboxGroup, CheckboxIndicator, CheckboxLabel, CheckboxRoot } from '@fex-design/solid/primitive/checkbox'

export default function Example() {
  return <div class="grid gap-3"><CheckboxRoot><CheckboxControl aria-invalid="true" aria-describedby="checkbox-error" /><CheckboxIndicator /><CheckboxLabel>同意服务条款</CheckboxLabel></CheckboxRoot><p id="checkbox-error" class="text-sm text-destructive">继续前必须同意服务条款。</p></div>
}
