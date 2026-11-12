import { Select } from '@fex-design/solid/ui/select'
import { Checkbox } from '@fex-design/solid/ui/checkbox'
import { createSignal, Show } from 'solid-js'
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
const alignOptions = [
  { value: 'start', label: '起始侧对齐' },
  { value: 'end', label: '末尾侧对齐' },
]
const widthOptions = [
  { value: '6rem', label: '6rem' },
  { value: '8rem', label: '8rem' },
  { value: '10rem', label: '10rem' },
]
const gapOptions = [
  { value: '0.375rem', label: '紧凑' },
  { value: '0.5rem', label: '默认' },
  { value: '0.75rem', label: '宽松' },
]
type LayoutOptions = {
  labelAlign: 'start' | 'end'
  labelWidth: string
  labelGap: string
  labelWrap: boolean
}
const titles = { vertical: '纵向布局', horizontal: '横向布局', inline: '行内布局' }
const requiredText = ({ value }: { value: unknown }) =>
  String(value ?? '').trim() ? undefined : '请填写此项'
function SearchLayout(props: { layout: keyof typeof titles; options: LayoutOptions }) {
  const [result, setResult] = createSignal('')
  const form = createForm(() => ({
    defaultValues: { name: '', project: '', approval: '' },
    onSubmit: ({ value }) => setResult(JSON.stringify(value)),
  }))
  return (
    <section class="grid min-w-0 gap-3 rounded-lg border border-border p-4">
      <h4 class="text-sm font-semibold">{titles[props.layout]}</h4>
      <FormRoot form={form} layout={props.layout} {...props.options}>
        <FormField name="name" validators={{ onBlur: requiredText, onSubmit: requiredText }}>
          {(field) => (
            <>
              <FormLabel required>姓名</FormLabel>
              <FormControl>
                <InputRoot
                  value={field().state.value}
                  onChange={(value) => field().handleChange(value)}
                >
                  <InputControl onBlur={() => field().handleBlur()} placeholder="请输入姓名" />
                </InputRoot>
              </FormControl>
              <FormError />
            </>
          )}
        </FormField>
        <FormField name="project" validators={{ onBlur: requiredText, onSubmit: requiredText }}>
          {(field) => (
            <>
              <FormLabel required>项目名称</FormLabel>
              <FormControl>
                <InputRoot
                  value={field().state.value}
                  onChange={(value) => field().handleChange(value)}
                >
                  <InputControl onBlur={() => field().handleBlur()} placeholder="请输入项目名称" />
                </InputRoot>
              </FormControl>
              <FormError />
            </>
          )}
        </FormField>
        <FormField name="approval" validators={{ onBlur: requiredText, onSubmit: requiredText }}>
          {(field) => (
            <>
              <FormLabel required>项目审批负责人联系方式</FormLabel>
              <FormControl>
                <InputRoot
                  value={field().state.value}
                  onChange={(value) => field().handleChange(value)}
                >
                  <InputControl
                    onBlur={() => field().handleBlur()}
                    placeholder="请输入项目审批负责人联系方式"
                  />
                </InputRoot>
              </FormControl>
              <FormDescription>用于观察长标签换行后，说明和错误是否仍与控件对齐。</FormDescription>
              <FormError />
            </>
          )}
        </FormField>
        <div data-slot="form-actions" class="flex gap-2">
          <Button type="submit" variant="solid" color="primary">
            查询
          </Button>
          <Button type="reset" onClick={() => setResult('')}>
            重置
          </Button>
        </div>
      </FormRoot>
      <Show when={result()}>
        <p role="status" class="break-all text-sm text-muted-foreground">
          查询条件：{result()}
        </p>
      </Show>
    </section>
  )
}
export function LayoutExample() {
  const [options, setOptions] = createSignal<LayoutOptions>({
    labelAlign: 'end',
    labelWidth: '8rem',
    labelGap: '0.5rem',
    labelWrap: true,
  })
  return (
    <section class="mx-auto grid w-full max-w-2xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">表单布局与标签对齐</h3>
        <p class="text-sm text-muted-foreground">
          使用长短不同的标签比较布局。调整配置后直接提交，观察标签、控件、说明、错误和按钮的对齐。
        </p>
      </header>
      <div class="grid gap-3 rounded-md bg-muted-background p-3 text-sm sm:grid-cols-3">
        <div class="grid gap-1">
          <span>标签对齐</span>
          <Select
            value={options().labelAlign}
            options={alignOptions}
            inputProps={{ 'aria-label': '标签对齐' }}
            onChange={(value) =>
              setOptions({ ...options(), labelAlign: value === 'start' ? 'start' : 'end' })
            }
          />
        </div>
        <div class="grid gap-1">
          <span>标签列宽</span>
          <Select
            value={options().labelWidth}
            options={widthOptions}
            inputProps={{ 'aria-label': '标签列宽' }}
            onChange={(value) => setOptions({ ...options(), labelWidth: String(value) })}
          />
        </div>
        <div class="grid gap-1">
          <span>标签间距</span>
          <Select
            value={options().labelGap}
            options={gapOptions}
            inputProps={{ 'aria-label': '标签间距' }}
            onChange={(value) => setOptions({ ...options(), labelGap: String(value) })}
          />
        </div>
        <Checkbox
          class="sm:col-span-3"
          checked={options().labelWrap}
          onChange={(event) => setOptions({ ...options(), labelWrap: event.currentTarget.checked })}
        >
          标签换行
        </Checkbox>
      </div>
      <SearchLayout layout="vertical" options={options()} />
      <SearchLayout layout="horizontal" options={options()} />
      <SearchLayout layout="inline" options={options()} />
    </section>
  )
}
