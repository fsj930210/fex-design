import { Select } from '@fex-design/react/ui/select'
import { Checkbox } from '@fex-design/react/ui/checkbox'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Form, FormField } from '@fex-design/react/ui/form'
import { Input } from '@fex-design/react/ui/input'
import { Button } from '@fex-design/react/ui/button'

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
function SearchLayout({
  layout,
  options,
}: {
  layout: keyof typeof titles
  options: LayoutOptions
}) {
  const [result, setResult] = useState('')
  const form = useForm({
    defaultValues: { name: '', project: '', approval: '' },
    onSubmit: ({ value }) => setResult(JSON.stringify(value)),
  })
  return (
    <section className="grid min-w-0 gap-3 rounded-lg border border-border p-4">
      <h4 className="text-sm font-semibold">{titles[layout]}</h4>
      <Form form={form} layout={layout} {...options}>
        <FormField
          name="name"
          label="姓名"
          required
          validators={{ onBlur: requiredText, onSubmit: requiredText }}
        >
          {(field) => (
            <Input
              value={field.state.value}
              onChange={(event) => field.handleChange(event.currentTarget.value)}
              onBlur={() => field.handleBlur()}
              placeholder="请输入姓名"
            />
          )}
        </FormField>
        <FormField
          name="project"
          label="项目名称"
          required
          validators={{ onBlur: requiredText, onSubmit: requiredText }}
        >
          {(field) => (
            <Input
              value={field.state.value}
              onChange={(event) => field.handleChange(event.currentTarget.value)}
              onBlur={() => field.handleBlur()}
              placeholder="请输入项目名称"
            />
          )}
        </FormField>
        <FormField
          name="approval"
          label="项目审批负责人联系方式"
          required
          description="用于观察长标签换行后，说明和错误是否仍与控件对齐。"
          validators={{ onBlur: requiredText, onSubmit: requiredText }}
        >
          {(field) => (
            <Input
              value={field.state.value}
              onChange={(event) => field.handleChange(event.currentTarget.value)}
              onBlur={() => field.handleBlur()}
              placeholder="请输入项目审批负责人联系方式"
            />
          )}
        </FormField>
        <div data-slot="form-actions" className="flex gap-2">
          <Button type="submit" variant="solid" color="primary">
            查询
          </Button>
          <Button type="reset" onClick={() => setResult('')}>
            重置
          </Button>
        </div>
      </Form>
      {result && (
        <p role="status" className="break-all text-sm text-muted-foreground">
          查询条件：{result}
        </p>
      )}
    </section>
  )
}
export function LayoutExample() {
  const [options, setOptions] = useState<LayoutOptions>({
    labelAlign: 'end',
    labelWidth: '8rem',
    labelGap: '0.5rem',
    labelWrap: true,
  })
  return (
    <section className="mx-auto grid w-full max-w-2xl gap-5 p-5">
      <header className="grid gap-1">
        <h3 className="text-base font-semibold">表单布局与标签对齐</h3>
        <p className="text-sm text-muted-foreground">
          使用长短不同的标签比较布局。调整配置后直接提交，观察标签、控件、说明、错误和按钮的对齐。
        </p>
      </header>
      <div className="grid gap-3 rounded-md bg-muted-background p-3 text-sm sm:grid-cols-3">
        <div className="grid gap-1">
          <span>标签对齐</span>
          <Select
            value={options.labelAlign}
            options={alignOptions}
            inputProps={{ 'aria-label': '标签对齐' }}
            onChange={(value) =>
              setOptions({ ...options, labelAlign: value === 'start' ? 'start' : 'end' })
            }
          />
        </div>
        <div className="grid gap-1">
          <span>标签列宽</span>
          <Select
            value={options.labelWidth}
            options={widthOptions}
            inputProps={{ 'aria-label': '标签列宽' }}
            onChange={(value) => setOptions({ ...options, labelWidth: String(value) })}
          />
        </div>
        <div className="grid gap-1">
          <span>标签间距</span>
          <Select
            value={options.labelGap}
            options={gapOptions}
            inputProps={{ 'aria-label': '标签间距' }}
            onChange={(value) => setOptions({ ...options, labelGap: String(value) })}
          />
        </div>
        <Checkbox
          className="sm:col-span-3"
          checked={options.labelWrap}
          onChange={(event) => setOptions({ ...options, labelWrap: event.currentTarget.checked })}
        >
          标签换行
        </Checkbox>
      </div>
      <SearchLayout layout="vertical" options={options} />
      <SearchLayout layout="horizontal" options={options} />
      <SearchLayout layout="inline" options={options} />
    </section>
  )
}
