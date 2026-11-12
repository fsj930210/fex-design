import { createSignal } from 'solid-js'
import { createForm } from '@tanstack/solid-form'
import { Form, FormField, FormSubscribe } from '@fex-design/solid/ui/form'
import { Input } from '@fex-design/solid/ui/input'
import { Button } from '@fex-design/solid/ui/button'
const initialProfile = { name: '林晓', email: 'lin@example.com' }
const loadedProfile = { name: '陈晨', email: 'chen@example.com' }
export function ResetExample() {
  const [action, setAction] = createSignal('当前为初始化资料')
  const form = createForm(() => ({ defaultValues: initialProfile }))
  function fillProfile() {
    form.setFieldValue('name', loadedProfile.name)
    form.setFieldValue('email', loadedProfile.email)
    setAction('已回填陈晨的资料，初始化值仍为林晓')
  }
  return (
    <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">资料回填与重置</h3>
        <p class="text-sm text-muted-foreground">
          回填只修改当前值；重置姓名只恢复姓名，重置全部恢复初始化资料和字段状态。
        </p>
      </header>
      <Form form={form}>
        <FormField name="name" label="姓名">
          {(field) => (
            <Input
              value={field().state.value}
              onChange={(event) => field().handleChange(event.currentTarget.value)}
              onBlur={() => field().handleBlur()}
            />
          )}
        </FormField>
        <FormField name="email" label="邮箱">
          {(field) => (
            <Input
              value={field().state.value}
              onChange={(event) => field().handleChange(event.currentTarget.value)}
              onBlur={() => field().handleBlur()}
            />
          )}
        </FormField>
        <div class="flex flex-wrap gap-3">
          <Button type="button" onClick={fillProfile}>
            回填资料
          </Button>
          <Button
            type="button"
            onClick={() => {
              form.resetField('name')
              setAction('已重置姓名，邮箱保持当前值')
            }}
          >
            仅重置姓名
          </Button>
          <Button
            type="button"
            onClick={() => {
              form.reset()
              setAction('已恢复全部初始化资料')
            }}
          >
            重置全部
          </Button>
        </div>
        <FormSubscribe selector={(state) => state.values}>
          {(values) => (
            <pre class="overflow-auto rounded-md bg-muted-background p-3 text-sm">
              {JSON.stringify(values(), null, 2)}
            </pre>
          )}
        </FormSubscribe>
      </Form>
      <p role="status" class="text-sm text-muted-foreground">
        {action()}
      </p>
    </section>
  )
}
