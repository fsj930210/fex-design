import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogActions,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
} from '@fex-design/solid/primitive/dialog'
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

export function DialogFormExample() {
  const [open, setOpen] = createSignal(false)
  const [result, setResult] = createSignal('')

  const form = createForm(() => ({
    defaultValues: { name: '', email: '', department: 'product', notifications: true },

    onSubmit: async ({ value }) => {
      setResult(`已保存 ${value.name} 的资料，通知将发送至 ${value.email}。`)

      setOpen(false)
    },
  }))

  return (
    <>
      <Button onClick={() => setOpen(true)}>打开表单弹窗</Button>
      <p role="status">{result() || '尚未提交'}</p>
      <DialogRoot open={open()} onOpenChange={setOpen}>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>编辑团队成员</DialogTitle>
            </DialogHeader>
            <DialogActions>
              <DialogClose />
            </DialogActions>
            <DialogBody>
              <FormRoot form={form} class="w-full">
                <FormField
                  name={'name'}
                  validators={{
                    onChange: requiredText,
                    onBlur: requiredText,
                    onSubmit: requiredText,
                  }}
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
                  validators={{
                    onChange: requiredText,
                    onBlur: requiredText,
                    onSubmit: requiredText,
                  }}
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
                  validators={{
                    onChange: agreementRule,
                    onBlur: agreementRule,
                    onSubmit: agreementRule,
                  }}
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
              </FormRoot>
            </DialogBody>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>取消</Button>
              <Button variant="solid" color="primary" onClick={() => void form.handleSubmit()}>
                保存资料
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </>
  )
}
