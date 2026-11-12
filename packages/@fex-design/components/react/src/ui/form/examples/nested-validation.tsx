import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { Form, FormField, FormSubscribe } from '@fex-design/react/ui/form'
import { Input } from '@fex-design/react/ui/input'
import { Button } from '@fex-design/react/ui/button'
const amountSchema = z
  .string()
  .regex(/^\d+(\.\d{1,2})?$/, '请输入有效金额')
  .refine((value) => Number(value) > 0, '金额必须大于 0')
const budgetSchema = z
  .object({
    project: z.object({ name: z.string().trim().min(1, '请输入项目名称'), budget: amountSchema }),
    allocations: z.array(
      z.object({
        id: z.string(),
        name: z.string().trim().min(1, '请输入分配名称'),
        amount: amountSchema,
      }),
    ),
  })
  .superRefine((value, context) => {
    const names = new Set<string>()
    value.allocations.forEach((allocation, index) => {
      const name = allocation.name.trim()
      if (name && names.has(name))
        context.addIssue({
          code: 'custom',
          path: ['allocations', index, 'name'],
          message: '分配名称不能重复',
        })
      names.add(name)
    })
    const amountsValid =
      amountSchema.safeParse(value.project.budget).success &&
      value.allocations.every((allocation) => amountSchema.safeParse(allocation.amount).success)
    if (!amountsValid || !value.allocations.length) return
    const total = value.allocations.reduce(
      (sum, allocation) => sum + Math.round(Number(allocation.amount) * 100),
      0,
    )
    if (total > Math.round(Number(value.project.budget) * 100))
      context.addIssue({
        code: 'custom',
        path: ['allocations', value.allocations.length - 1, 'amount'],
        message: '分配合计不能超过项目预算',
      })
  })
const initialValues = {
  project: { name: '官网升级', budget: '100' },
  allocations: [
    { id: 'design', name: '设计', amount: '60' },
    { id: 'build', name: '研发', amount: '60' },
  ],
}
export function NestedValidationExample() {
  const [result, setResult] = useState('')
  const form = useForm({
    defaultValues: initialValues,
    validators: { onChange: budgetSchema },
    onSubmit: ({ value }) => setResult('已保存预算：' + value.project.name),
  })
  return (
    <section className="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header className="grid gap-1">
        <h3 className="text-base font-semibold">项目预算的嵌套结构与联合校验</h3>
        <p className="text-sm text-muted-foreground">
          对象字段与数组项分别校验；分配名称不能重复，分配合计不能超过预算。联合错误归属具体数组字段，修改预算或任一分配会重新校验。
        </p>
      </header>
      <Form form={form}>
        <FormField name="project.name" label="项目名称" required>
          {(field) => (
            <Input
              value={field.state.value}
              onChange={(event) => field.handleChange(event.currentTarget.value)}
              onBlur={() => field.handleBlur()}
            />
          )}
        </FormField>
        <FormField name="project.budget" label="项目预算" required>
          {(field) => (
            <Input
              value={field.state.value}
              onChange={(event) => field.handleChange(event.currentTarget.value)}
              onBlur={() => field.handleBlur()}
            />
          )}
        </FormField>
        {initialValues.allocations.map((allocation, index) => (
          <section
            key={allocation.id}
            className="grid gap-3 rounded-lg border border-border p-4"
            aria-label={`分配 ${index + 1}`}
          >
            <h4 className="font-semibold">分配 {index + 1}</h4>
            <FormField name={`allocations[${index}].name`} label="分配名称" required>
              {(field) => (
                <Input
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.currentTarget.value)}
                  onBlur={() => field.handleBlur()}
                />
              )}
            </FormField>
            <FormField name={`allocations[${index}].amount`} label="分配金额" required>
              {(field) => (
                <Input
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.currentTarget.value)}
                  onBlur={() => field.handleBlur()}
                />
              )}
            </FormField>
          </section>
        ))}
        <Button type="submit" variant="solid" color="primary">
          保存预算
        </Button>
        <FormSubscribe selector={(state) => state.values}>
          {(values) => (
            <pre className="overflow-auto rounded-md bg-muted-background p-3 text-sm">
              {JSON.stringify(values, null, 2)}
            </pre>
          )}
        </FormSubscribe>
      </Form>
      <p role="status" className="text-sm text-muted-foreground">
        {result}
      </p>
    </section>
  )
}
