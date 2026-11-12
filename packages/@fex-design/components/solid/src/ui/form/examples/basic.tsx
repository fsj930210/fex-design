import { createSignal, Show } from 'solid-js'
import { createForm } from '@tanstack/solid-form'
import { Input } from '@fex-design/solid/ui/input'
import { Select } from '@fex-design/solid/ui/select'
import { Checkbox } from '@fex-design/solid/ui/checkbox'
import { Button } from '@fex-design/solid/ui/button'
import { Form, FormField } from '@fex-design/solid/ui/form'
import { FormSubscribe } from '@fex-design/solid/ui/form'

const departments = [
  { value: 'product', label: '产品与设计' },
  { value: 'engineering', label: '研发团队' },
  { value: 'operations', label: '客户运营' },
]
const requiredText = ({ value }: { value: unknown }) =>
  String(value ?? '').trim() ? undefined : '请填写此项'
const emailRule = ({ value }: { value: unknown }) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? undefined : '请输入有效邮箱'

const agreementRule = ({ value }: { value: unknown }) =>
  value === true ? undefined : '请确认接收项目进度邮件'

export function BasicExample() {
  const [result, setResult] = createSignal('')
  const form = createForm(() => ({
    defaultValues: { name: '', email: '', department: 'product', notifications: true },
    onSubmit: async ({ value }) =>
      setResult(`已保存 ${value.name} 的资料，通知将发送至 ${value.email}。`),
  }))
  return (
    <section class="mx-auto grid w-full max-w-2xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">团队成员资料</h3>
        <p class="text-sm text-muted-foreground">
          填写团队成员资料，使用输入框、部门选择和通知偏好完成保存。
        </p>
      </header>
      <Form form={form} class="w-full">
        <FormField
          name="name"
          label="姓名"
          required
          validators={{ onChange: requiredText, onBlur: requiredText, onSubmit: requiredText }}
        >
          {(field) => (
            <Input
              value={field().state.value}
              onChange={(event) => field().handleChange(event.currentTarget.value)}
              placeholder="请输入联系人姓名"
            />
          )}
        </FormField>
        <FormField
          name="email"
          label="工作邮箱"
          required
          validators={{ onChange: emailRule, onBlur: emailRule, onSubmit: emailRule }}
        >
          {(field) => (
            <Input
              value={field().state.value}
              onChange={(event) => field().handleChange(event.currentTarget.value)}
              placeholder="name@company.com"
            />
          )}
        </FormField>
        <FormField
          name="department"
          label="所属部门"
          required
          defaultValue="product"
          validators={{ onChange: requiredText, onBlur: requiredText, onSubmit: requiredText }}
          description="用于分配项目通知和审批权限。"
        >
          {(field) => (
            <Select
              value={field().state.value}
              onChange={(value) => field().handleChange(value)}
              options={departments}
              clearable
            />
          )}
        </FormField>
        <FormField
          name="notifications"
          validators={{ onChange: agreementRule, onSubmit: agreementRule }}
        >
          {(field) => (
            <Checkbox
              checked={field().state.value}
              onChange={(event) => field().handleChange(event.currentTarget.checked)}
            >
              接收项目进度邮件
            </Checkbox>
          )}
        </FormField>
        <FormSubscribe selector={(state) => state.isSubmitting}>
          {(busy) => (
            <div class="flex flex-wrap gap-3 border-t border-border pt-4">
              <Button type="submit" variant="solid" color="primary" loading={busy()}>
                保存资料
              </Button>
              <Button type="reset" disabled={busy()}>
                重置
              </Button>
            </div>
          )}
        </FormSubscribe>
      </Form>
      <Show when={result()}>
        <p role="status" class="rounded-md bg-muted-background p-3 text-sm">
          {result()}
        </p>
      </Show>
    </section>
  )
}
