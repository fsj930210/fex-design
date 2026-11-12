import { createSignal, Show, For } from 'solid-js'
import { createForm, type AnyFieldApi } from '@tanstack/solid-form'
import {
  FormRoot,
  FormField,
  FormLabel,
  FormControl,
  FormError,
  FormSubscribe,
} from '@fex-design/solid/primitive/form'
import { InputRoot, InputControl } from '@fex-design/solid/primitive/input'
import { RadioGroup, Radio } from '@fex-design/solid/primitive/radio'
import { SelectRoot, SelectTrigger, SelectContent } from '@fex-design/solid/primitive/select'
import { Button } from '@fex-design/solid/primitive/button'
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
  const [result, setResult] = createSignal('')
  const form = createForm(() => ({
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
  }))
  function changeKind(value: string) {
    form.setFieldValue('kind', value)
    if (value === 'personal') form.setFieldValue('company', '')
  }
  function changeRegion(value: unknown) {
    form.setFieldValue('region', typeof value === 'string' ? value : 'east')
    form.setFieldValue('city', '')
  }
  return (
    <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">账号类型、地区与密码依赖</h3>
        <p class="text-sm text-muted-foreground">
          企业账号显示公司名称并要求填写；切换地区清空城市。确认密码通过 TanStack onChangeListenTo
          依赖密码，修改密码会重新校验确认字段。
        </p>
      </header>
      <FormRoot form={form}>
        <FormField name="kind">
          {(field) => (
            <>
              <FormLabel>账号类型</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field().state.value}
                  onChange={(value) => changeKind(String(value))}
                  orientation="horizontal"
                >
                  <For each={accountKinds}>
                    {(option) => (
                      <label class="inline-flex items-center gap-2">
                        <Radio value={option.value} />
                        {option.label}
                      </label>
                    )}
                  </For>
                </RadioGroup>
              </FormControl>
              <FormError />
            </>
          )}
        </FormField>
        <FormSubscribe selector={(state) => state.values.kind}>
          {(kind) => (
            <Show when={kind() === 'business'}>
              <FormField name="company" validators={companyValidators}>
                {(field) => (
                  <>
                    <FormLabel required>公司名称</FormLabel>
                    <FormControl>
                      <InputRoot
                        value={field().state.value}
                        onChange={(value) => field().handleChange(value)}
                      >
                        <InputControl type="text" onBlur={() => field().handleBlur()} />
                      </InputRoot>
                    </FormControl>
                    <FormError />
                  </>
                )}
              </FormField>
            </Show>
          )}
        </FormSubscribe>
        <FormField name="region">
          {(field) => (
            <>
              <FormLabel required>地区</FormLabel>
              <FormControl>
                <SelectRoot
                  value={field().state.value || []}
                  options={regions}
                  onChange={(value) => changeRegion(value)}
                >
                  <SelectTrigger placeholder="请选择" />
                  <SelectContent />
                </SelectRoot>
              </FormControl>
              <FormError />
            </>
          )}
        </FormField>
        <FormSubscribe selector={(state) => state.values.region}>
          {(region) => (
            <FormField name="city" validators={{ onChange: requiredText }}>
              {(field) => (
                <>
                  <FormLabel required>城市</FormLabel>
                  <FormControl>
                    <SelectRoot
                      value={field().state.value || []}
                      options={cities[region() as keyof typeof cities]}
                      onChange={(value) =>
                        field().handleChange(typeof value === 'string' ? value : '')
                      }
                    >
                      <SelectTrigger placeholder="请选择" />
                      <SelectContent />
                    </SelectRoot>
                  </FormControl>
                  <FormError />
                </>
              )}
            </FormField>
          )}
        </FormSubscribe>
        <FormField name="password" validators={{ onChange: passwordRule }}>
          {(field) => (
            <>
              <FormLabel required>密码</FormLabel>
              <FormControl>
                <InputRoot
                  value={field().state.value}
                  onChange={(value) => field().handleChange(value)}
                >
                  <InputControl type="password" onBlur={() => field().handleBlur()} />
                </InputRoot>
              </FormControl>
              <FormError />
            </>
          )}
        </FormField>
        <FormField name="confirmation" validators={confirmationValidators}>
          {(field) => (
            <>
              <FormLabel required>确认密码</FormLabel>
              <FormControl>
                <InputRoot
                  value={field().state.value}
                  onChange={(value) => field().handleChange(value)}
                >
                  <InputControl type="password" onBlur={() => field().handleBlur()} />
                </InputRoot>
              </FormControl>
              <FormError />
            </>
          )}
        </FormField>
        <Button type="submit" variant="solid" color="primary">
          保存账号
        </Button>
        <FormSubscribe selector={(state) => state.values}>
          {(values) => (
            <pre class="overflow-auto rounded-md bg-muted-background p-3 text-sm">
              {JSON.stringify(values(), null, 2)}
            </pre>
          )}
        </FormSubscribe>
      </FormRoot>
      <p role="status" class="text-sm text-muted-foreground">
        {result()}
      </p>
    </section>
  )
}
