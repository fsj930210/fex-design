import { InputRoot, InputControl } from '@fex-design/solid/primitive/input'
import { SelectRoot, SelectTrigger, SelectContent } from '@fex-design/solid/primitive/select'
import {
  CheckboxRoot,
  CheckboxControl,
  CheckboxIndicator,
} from '@fex-design/solid/primitive/checkbox'
import { createSignal, Show } from 'solid-js'
import { createForm } from '@tanstack/solid-form'
import {
  FormRoot,
  FormField,
  FormControl,
  FormLabel,
  FormDescription,
  FormError,
  FormSubscribe,
} from '@fex-design/solid/primitive/form'
import { Button } from '@fex-design/solid/primitive/button'

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

    onSubmit: async ({ value }) => {
      setResult(`已保存 ${value.name} 的资料，通知将发送至 ${value.email}。`)
    },
  }))

  return (
    <section class="mx-auto grid w-full max-w-2xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">团队成员资料</h3>
        <p class="text-sm text-muted-foreground">
          填写团队成员资料，使用输入框、部门选择和通知偏好完成保存。
        </p>
      </header>

      <FormRoot form={form} class="w-full">
        <FormField
          name={'name'}
          validators={{ onChange: requiredText, onBlur: requiredText, onSubmit: requiredText }}
        >
          {(field) => (
            <>
              <FormLabel required>姓名</FormLabel>
              <FormControl>
                <InputRoot>
                  <InputControl
                    value={field().state.value}
                    onInput={(event) => field().handleChange(event.currentTarget.value)}
                    placeholder={'请输入联系人姓名'}
                  />
                </InputRoot>
              </FormControl>
              <FormError />
            </>
          )}
        </FormField>
        <FormField
          name={'email'}
          validators={{ onChange: emailRule, onBlur: emailRule, onSubmit: emailRule }}
        >
          {(field) => (
            <>
              <FormLabel required>工作邮箱</FormLabel>
              <FormControl>
                <InputRoot>
                  <InputControl
                    value={field().state.value}
                    onInput={(event) => field().handleChange(event.currentTarget.value)}
                    placeholder={'name@company.com'}
                  />
                </InputRoot>
              </FormControl>
              <FormError />
            </>
          )}
        </FormField>
        <FormField
          name={'department'}
          validators={{ onChange: requiredText, onBlur: requiredText, onSubmit: requiredText }}
        >
          {(field) => (
            <>
              <FormLabel required>所属部门</FormLabel>
              <SelectRoot
                value={field().state.value}
                onChange={(value) => field().handleChange(value)}
                options={departments}
                clearable
              >
                <FormControl>
                  <SelectTrigger inputProps={{ 'aria-label': '所属部门' }} />
                  <SelectContent />
                </FormControl>
              </SelectRoot>
              <FormDescription>用于分配项目通知和审批权限。</FormDescription>
              <FormError />
            </>
          )}
        </FormField>
        <FormField
          name={'notifications'}
          validators={{ onChange: agreementRule, onBlur: agreementRule, onSubmit: agreementRule }}
        >
          {(field) => (
            <>
              <CheckboxRoot>
                <FormControl>
                  <CheckboxControl
                    checked={field().state.value}
                    onChange={(event) => field().handleChange(event.currentTarget.checked)}
                  />
                </FormControl>
                <CheckboxIndicator />
                <FormLabel>接收项目进度邮件</FormLabel>
              </CheckboxRoot>
              <FormError />
            </>
          )}
        </FormField>
        <FormSubscribe selector={(state) => state.isSubmitting}>
          {(busy) => (
            <div class="flex flex-wrap gap-3 border-t border-border pt-4">
              <Button type="submit" variant="solid" color="primary" disabled={busy()}>
                保存资料
              </Button>
              <Button type="button" disabled={busy()} onClick={() => form.reset()}>
                重置
              </Button>
            </div>
          )}
        </FormSubscribe>
      </FormRoot>

      <Show when={result()}>
        <p role="status" class="rounded-md bg-muted-background p-3 text-sm">
          {result()}
        </p>
      </Show>
    </section>
  )
}
