import { Checkbox, CheckboxGroup } from '@fex-design/solid/ui/checkbox'

export default function Example() {
  return (
    <div class="grid gap-3">
      <CheckboxGroup
        defaultValue={['email']}
        options={[
          { label: '邮件', value: 'email' },
          { label: '短信', value: 'sms' },
          { label: '站内通知', value: 'push' },
        ]}
      />
    </div>
  )
}
