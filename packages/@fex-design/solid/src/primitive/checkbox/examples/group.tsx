import {
  CheckboxControl,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
} from '@fex-design/solid/primitive/checkbox'

export default function Example() {
  return (
    <div class="grid gap-3">
      <CheckboxGroup defaultValue={['email']}>
        <CheckboxRoot value="email">
          <CheckboxControl />
          <CheckboxIndicator />
          <CheckboxLabel>邮件</CheckboxLabel>
        </CheckboxRoot>
        <CheckboxRoot value="sms">
          <CheckboxControl />
          <CheckboxIndicator />
          <CheckboxLabel>短信</CheckboxLabel>
        </CheckboxRoot>
        <CheckboxRoot value="push">
          <CheckboxControl />
          <CheckboxIndicator />
          <CheckboxLabel>站内通知</CheckboxLabel>
        </CheckboxRoot>
      </CheckboxGroup>
    </div>
  )
}
