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
const presets = {
  compact: {
    '--form-gap': '12px',
    '--form-item-gap': '4px',
    '--form-label-color': '#0f766e',
    '--form-description-color': '#475569',
    '--form-error-color': '#b91c1c',
  },
  spacious: {
    '--form-gap': '24px',
    '--form-item-gap': '10px',
    '--form-label-color': '#4338ca',
    '--form-description-color': '#6d28d9',
    '--form-error-color': '#be123c',
  },
}
const requiredText = ({ value }: { value: unknown }) =>
  String(value).trim() ? undefined : '请填写此项'
export function CssVariablesExample() {
  const [spacious, setSpacious] = createSignal(false)
  const [result, setResult] = createSignal('')
  const form = createForm(() => ({
    defaultValues: { project: '', owner: '' },
    onSubmit: ({ value }) => setResult('已保存项目：' + value.project),
  }))
  return (
    <section
      class="mx-auto grid w-full max-w-xl gap-5 p-5"
      style={presets[spacious() ? 'spacious' : 'compact']}
    >
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">通过 CSS 变量定制表单</h3>
        <p class="text-sm text-muted-foreground">
          切换两组局部变量，观察字段间距、内部间距及标签、说明、错误颜色。变量由业务容器继承到
          Form，不修改控件的数据绑定。
        </p>
      </header>
      <div class="flex items-center gap-3">
        <Button type="button" onClick={() => setSpacious(!spacious())}>
          切换为{spacious() ? '紧凑' : '宽松'}变量
        </Button>
        <span>当前配置：{spacious() ? '宽松' : '紧凑'}</span>
      </div>
      <FormRoot form={form}>
        <FormField name="project" validators={{ onChange: requiredText }}>
          {(field) => (
            <>
              <FormLabel required>项目名称</FormLabel>
              <FormControl>
                <InputRoot
                  value={field().state.value}
                  onChange={(value) => field().handleChange(value)}
                >
                  <InputControl onBlur={() => field().handleBlur()} />
                </InputRoot>
              </FormControl>
              <FormDescription>字段之间的距离由 --form-gap 控制。</FormDescription>
              <FormError />
            </>
          )}
        </FormField>
        <FormField name="owner" validators={{ onChange: requiredText }}>
          {(field) => (
            <>
              <FormLabel required>负责人</FormLabel>
              <FormControl>
                <InputRoot
                  value={field().state.value}
                  onChange={(value) => field().handleChange(value)}
                >
                  <InputControl onBlur={() => field().handleBlur()} />
                </InputRoot>
              </FormControl>
              <FormDescription>标签、控件与反馈之间由 --form-item-gap 控制。</FormDescription>
              <FormError />
            </>
          )}
        </FormField>
        <Button type="submit" variant="solid" color="primary">
          保存项目
        </Button>
      </FormRoot>
      <pre class="overflow-auto rounded-md bg-muted-background p-3 text-sm">
        {JSON.stringify(presets[spacious() ? 'spacious' : 'compact'], null, 2)}
      </pre>
      <p role="status" class="text-sm text-muted-foreground">
        {result()}
      </p>
    </section>
  )
}
