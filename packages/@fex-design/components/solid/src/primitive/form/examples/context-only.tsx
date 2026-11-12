import { createSignal } from 'solid-js'
import { createForm } from '@tanstack/solid-form'
import {
  FormRoot,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormError,
  FormSubscribe,
} from '@fex-design/solid/primitive/form'
import { InputRoot, InputControl } from '@fex-design/solid/primitive/input'
import { Button } from '@fex-design/solid/primitive/button'
const nameRule = ({ value }: { value: unknown }) =>
  String(value).trim() ? undefined : '请输入昵称'
const signatureRule = ({ value }: { value: unknown }) =>
  String(value).trim().length >= 10 ? undefined : '签名至少需要 10 个字符'
export function ContextOnlyExample() {
  const [result, setResult] = createSignal('')
  const form = createForm(() => ({
    defaultValues: { nickname: '小林', signature: '' },
    onSubmit: ({ value }) => setResult('已保存 ' + value.nickname + ' 的个人签名'),
  }))
  return (
    <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">个人资料面板：只提供上下文</h3>
        <p class="text-sm text-muted-foreground">
          业务面板组织内容和操作按钮，Form 只提供字段上下文，不输出原生 form。保存按钮直接调用
          TanStack handleSubmit，恢复按钮调用 reset。
        </p>
      </header>
      <FormRoot form={form} component={false}>
        <div class="grid gap-4 rounded-md border border-border p-4" aria-label="个人资料编辑区">
          <FormField name="nickname" validators={{ onChange: nameRule }}>
            {(field) => (
              <>
                <FormLabel required>昵称</FormLabel>
                <FormControl>
                  <InputRoot
                    value={field().state.value}
                    onChange={(value) => field().handleChange(value)}
                  >
                    <InputControl onBlur={() => field().handleBlur()} />
                  </InputRoot>
                </FormControl>
                <FormDescription>这项资料只在当前面板中编辑。</FormDescription>
                <FormError />
              </>
            )}
          </FormField>
          <FormField name="signature" validators={{ onChange: signatureRule }}>
            {(field) => (
              <>
                <FormLabel required>个人签名</FormLabel>
                <FormControl>
                  <InputRoot
                    value={field().state.value}
                    onChange={(value) => field().handleChange(value)}
                  >
                    <InputControl onBlur={() => field().handleBlur()} />
                  </InputRoot>
                </FormControl>
                <FormDescription>至少 10 个字符，错误消息仍由 FormError 展示。</FormDescription>
                <FormError />
              </>
            )}
          </FormField>
        </div>
        <div class="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="solid"
            color="primary"
            onClick={() => {
              void form.handleSubmit()
            }}
          >
            保存签名
          </Button>
          <Button
            type="button"
            onClick={() => {
              form.reset()
              setResult('')
            }}
          >
            恢复初始资料
          </Button>
        </div>
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
