import { useState } from 'react'
import { useForm, type AnyFieldApi } from '@tanstack/react-form'
import { Form, FormField, FormSubscribe } from '@fex-design/react/ui/form'
import { Input } from '@fex-design/react/ui/input'
import { RadioGroup } from '@fex-design/react/ui/radio'
import { Select } from '@fex-design/react/ui/select'
import { Button } from '@fex-design/react/ui/button'
const accountKinds = [
  { value: 'personal', label: '个人账号' },
  { value: 'business', label: '企业账号' },
]
const regions = [
  { value: 'east', label: '华东' },
  { value: 'south', label: '华南' },
]
const cities = {
  east: [
    { value: 'shanghai', label: '上海' },
    { value: 'hangzhou', label: '杭州' },
  ],
  south: [
    { value: 'guangzhou', label: '广州' },
    { value: 'shenzhen', label: '深圳' },
  ],
}
const requiredText = ({ value }: { value: unknown }) =>
  String(value ?? '').trim() ? undefined : '请填写此项'
const confirmationRule = ({ value, fieldApi }: { value: unknown; fieldApi: AnyFieldApi }) =>
  value === fieldApi.form.getFieldValue('password') && String(value).length >= 8
    ? undefined
    : '两次密码需一致且至少 8 个字符'
const companyRule = ({ value, fieldApi }: { value: unknown; fieldApi: AnyFieldApi }) =>
  fieldApi.form.getFieldValue('kind') !== 'business' || String(value ?? '').trim()
    ? undefined
    : '企业账号请填写公司名称'
const passwordRule = ({ value }: { value: unknown }) =>
  String(value).length >= 8 ? undefined : '密码至少需要 8 个字符'
const confirmationValidators = {
  onChangeListenTo: ['password'] as ['password'],
  onChange: confirmationRule,
}
const companyValidators = { onChangeListenTo: ['kind'] as ['kind'], onChange: companyRule }
export function LinkedFieldsExample() {
  const [result, setResult] = useState('')
  const form = useForm({
    defaultValues: {
      kind: 'personal',
      company: '',
      region: 'east',
      city: '',
      password: '',
      confirmation: '',
    },
    onSubmit: ({ value }) =>
      setResult(
        '已保存' + (value.kind === 'business' ? '企业' : '个人') + '账号，城市：' + value.city,
      ),
  })
  function changeKind(value: string) {
    form.setFieldValue('kind', value)
    if (value === 'personal') form.setFieldValue('company', '')
  }
  function changeRegion(value: unknown) {
    form.setFieldValue('region', typeof value === 'string' ? value : 'east')
    form.setFieldValue('city', '')
  }
  return (
    <section className="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header className="grid gap-1">
        <h3 className="text-base font-semibold">账号类型、地区与密码依赖</h3>
        <p className="text-sm text-muted-foreground">
          企业账号显示公司名称并要求填写；切换地区清空城市。确认密码通过 TanStack onChangeListenTo
          依赖密码，修改密码会重新校验确认字段。
        </p>
      </header>
      <Form form={form}>
        <FormField name="kind" label="账号类型">
          {(field) => (
            <RadioGroup
              value={field.state.value}
              options={accountKinds}
              onChange={(value) => changeKind(String(value))}
              orientation="horizontal"
            />
          )}
        </FormField>
        <FormSubscribe selector={(state) => state.values.kind}>
          {(kind) =>
            kind === 'business' && (
              <FormField name="company" label="公司名称" required validators={companyValidators}>
                {(field) => (
                  <Input
                    type="text"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.currentTarget.value)}
                    onBlur={() => field.handleBlur()}
                  />
                )}
              </FormField>
            )
          }
        </FormSubscribe>
        <FormField name="region" label="地区" required>
          {(field) => (
            <Select
              value={field.state.value || []}
              options={regions}
              onChange={(value) => changeRegion(value)}
              placeholder="请选择"
            />
          )}
        </FormField>
        <FormSubscribe selector={(state) => state.values.region}>
          {(region) => (
            <FormField name="city" label="城市" required validators={{ onChange: requiredText }}>
              {(field) => (
                <Select
                  value={field.state.value || []}
                  options={cities[region as keyof typeof cities]}
                  onChange={(value) => field.handleChange(typeof value === 'string' ? value : '')}
                  placeholder="请选择"
                />
              )}
            </FormField>
          )}
        </FormSubscribe>
        <FormField name="password" label="密码" required validators={{ onChange: passwordRule }}>
          {(field) => (
            <Input
              type="password"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.currentTarget.value)}
              onBlur={() => field.handleBlur()}
            />
          )}
        </FormField>
        <FormField
          name="confirmation"
          label="确认密码"
          required
          validators={confirmationValidators}
        >
          {(field) => (
            <Input
              type="password"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.currentTarget.value)}
              onBlur={() => field.handleBlur()}
            />
          )}
        </FormField>
        <Button type="submit" variant="solid" color="primary">
          保存账号
        </Button>
        <FormSubscribe selector={(state) => state.values}>
          {(values) => (
            <pre className="overflow-auto rounded-md bg-muted-background p-3 text-sm">
              {JSON.stringify(values, null, 2)}
            </pre>
          )}
        </FormSubscribe>
      </Form>
      <p role="status" className="text-sm text-muted-foreground">
        {result}
      </p>
    </section>
  )
}
