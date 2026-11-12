import { createSignal } from 'solid-js'
import { createForm } from '@tanstack/solid-form'
import {
  FormRoot,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormError,
} from '@fex-design/solid/primitive/form'
import { InputRoot, InputControl } from '@fex-design/solid/primitive/input'
import { Button } from '@fex-design/solid/primitive/button'
const partClasses = {
  root: 'rounded-xl border border-dashed p-4',
  field: 'rounded-lg border p-3',
  label: 'font-semibold',
  description: 'text-xs',
  error: 'rounded-md px-2 py-1 font-medium',
}
const partStyles = {
  root: { 'border-color': '#64748b' },
  field: { 'border-color': '#a5b4fc' },
  label: { color: '#4338ca' },
  description: { color: '#475569' },
  error: { color: '#b91c1c', 'background-color': '#fee2e2' },
}
const titleRule = ({ value }: { value: unknown }) =>
  String(value).trim().length >= 5 ? undefined : '标题至少需要 5 个字符'
export function SemanticStylesExample() {
  const [customized, setCustomized] = createSignal(true)
  const [result, setResult] = createSignal('')
  const form = createForm(() => ({
    defaultValues: { title: '' },
    onSubmit: ({ value }) => setResult('已提交：' + value.title),
  }))
  return (
    <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">定制表单语义部件</h3>
        <p class="text-sm text-muted-foreground">
          切换默认与定制样式，分别调整根容器、字段、标签、说明和错误。UI 使用
          classNames/styles，Primitive 直接定制对应部件。
        </p>
      </header>
      <Button type="button" onClick={() => setCustomized(!customized())}>
        {customized() ? '恢复默认样式' : '应用语义样式'}
      </Button>
      <FormRoot
        form={form}
        class={customized() ? partClasses.root : undefined}
        style={customized() ? partStyles.root : undefined}
      >
        <FormField
          name="title"
          validators={{ onChange: titleRule }}
          class={customized() ? partClasses.field : undefined}
          style={customized() ? partStyles.field : undefined}
        >
          {(field) => (
            <>
              <FormLabel
                required
                class={customized() ? partClasses.label : undefined}
                style={customized() ? partStyles.label : undefined}
              >
                申请标题
              </FormLabel>
              <FormControl>
                <InputRoot
                  value={field().state.value}
                  onChange={(value) => field().handleChange(value)}
                >
                  <InputControl onBlur={() => field().handleBlur()} />
                </InputRoot>
              </FormControl>
              <FormDescription
                class={customized() ? partClasses.description : undefined}
                style={customized() ? partStyles.description : undefined}
              >
                至少填写 5 个字符，提交后观察错误部件的独立样式。
              </FormDescription>
              <FormError
                class={customized() ? partClasses.error : undefined}
                style={customized() ? partStyles.error : undefined}
              />
            </>
          )}
        </FormField>
        <Button type="submit" variant="solid" color="primary">
          提交申请
        </Button>
      </FormRoot>
      <p role="status" class="text-sm text-muted-foreground">
        {result()}
      </p>
    </section>
  )
}
