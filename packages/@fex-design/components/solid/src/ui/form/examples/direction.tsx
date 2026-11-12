import { createSignal } from 'solid-js'
import { createForm } from '@tanstack/solid-form'
import { Form, FormField } from '@fex-design/solid/ui/form'
import { Input } from '@fex-design/solid/ui/input'
import { Button } from '@fex-design/solid/ui/button'
const nameRule = ({ value }: { value: unknown }) =>
  String(value).trim() ? undefined : '请输入账号名称'
const emailRule = ({ value }: { value: unknown }) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? undefined : '请输入有效邮箱'
export function DirectionExample() {
  const [direction, setDirection] = createSignal<'ltr' | 'rtl'>('ltr')
  const [result, setResult] = createSignal('')
  const form = createForm(() => ({
    defaultValues: { account: '', email: '' },
    onSubmit: ({ value }) => setResult('已保存账号：' + value.account),
  }))
  return (
    <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">LTR 与 RTL 表单方向</h3>
        <p class="text-sm text-muted-foreground">
          切换原生
          dir，观察横向布局的标签列、说明、错误与操作区如何镜像；切换方向保留当前值和校验状态。
        </p>
      </header>
      <div class="flex items-center gap-3">
        <Button type="button" onClick={() => setDirection(direction() === 'ltr' ? 'rtl' : 'ltr')}>
          切换为 {direction() === 'ltr' ? 'RTL' : 'LTR'}
        </Button>
        <span>当前方向：{direction().toUpperCase()}</span>
      </div>
      <Form
        form={form}
        dir={direction()}
        layout="horizontal"
        labelAlign="end"
        labelWidth="8rem"
        labelWrap
      >
        <FormField
          name="account"
          label="账号名称"
          description="说明和错误始终与控件列对齐。"
          required
          validators={{ onChange: nameRule }}
        >
          {(field) => (
            <Input
              value={field().state.value}
              onChange={(event) => field().handleChange(event.currentTarget.value)}
              onBlur={() => field().handleBlur()}
            />
          )}
        </FormField>
        <FormField
          name="email"
          label="团队通知联系邮箱"
          description="长标签允许换行，方向切换保留输入内容。"
          required
          validators={{ onChange: emailRule }}
        >
          {(field) => (
            <Input
              value={field().state.value}
              onChange={(event) => field().handleChange(event.currentTarget.value)}
              onBlur={() => field().handleBlur()}
            />
          )}
        </FormField>
        <div data-slot="form-actions" class="flex flex-wrap gap-3">
          <Button type="submit" variant="solid" color="primary">
            保存账号
          </Button>
        </div>
      </Form>
      <p role="status" class="text-sm text-muted-foreground">
        {result()}
      </p>
    </section>
  )
}
