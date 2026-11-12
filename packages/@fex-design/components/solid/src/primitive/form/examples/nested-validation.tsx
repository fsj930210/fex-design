import { createSignal, For } from 'solid-js'
import { createForm } from '@tanstack/solid-form'
import { z } from 'zod'
import {
  FormRoot,
  FormField,
  FormLabel,
  FormControl,
  FormError,
  FormSubscribe,
} from '@fex-design/solid/primitive/form'
import { InputRoot, InputControl } from '@fex-design/solid/primitive/input'
import { Button } from '@fex-design/solid/primitive/button'
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
  const [result, setResult] = createSignal('')
  const form = createForm(() => ({
    defaultValues: initialValues,
    validators: { onChange: budgetSchema },
    onSubmit: ({ value }) => setResult('已保存预算：' + value.project.name),
  }))
  return (
    <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">项目预算的嵌套结构与联合校验</h3>
        <p class="text-sm text-muted-foreground">
          对象字段与数组项分别校验；分配名称不能重复，分配合计不能超过预算。联合错误归属具体数组字段，修改预算或任一分配会重新校验。
        </p>
      </header>
      <FormRoot form={form}>
        <FormField name="project.name">
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
              <FormError />
            </>
          )}
        </FormField>
        <FormField name="project.budget">
          {(field) => (
            <>
              <FormLabel required>项目预算</FormLabel>
              <FormControl>
                <InputRoot
                  value={field().state.value}
                  onChange={(value) => field().handleChange(value)}
                >
                  <InputControl onBlur={() => field().handleBlur()} />
                </InputRoot>
              </FormControl>
              <FormError />
            </>
          )}
        </FormField>
        <For each={initialValues.allocations}>
          {(allocation, index) => (
            <section
              class="grid gap-3 rounded-lg border border-border p-4"
              aria-label={`分配 ${index() + 1}`}
            >
              <h4 class="font-semibold">分配 {index() + 1}</h4>
              <FormField name={`allocations[${index()}].name`}>
                {(field) => (
                  <>
                    <FormLabel required>分配名称</FormLabel>
                    <FormControl>
                      <InputRoot
                        value={field().state.value}
                        onChange={(value) => field().handleChange(value)}
                      >
                        <InputControl onBlur={() => field().handleBlur()} />
                      </InputRoot>
                    </FormControl>
                    <FormError />
                  </>
                )}
              </FormField>
              <FormField name={`allocations[${index()}].amount`}>
                {(field) => (
                  <>
                    <FormLabel required>分配金额</FormLabel>
                    <FormControl>
                      <InputRoot
                        value={field().state.value}
                        onChange={(value) => field().handleChange(value)}
                      >
                        <InputControl onBlur={() => field().handleBlur()} />
                      </InputRoot>
                    </FormControl>
                    <FormError />
                  </>
                )}
              </FormField>
            </section>
          )}
        </For>
        <Button type="submit" variant="solid" color="primary">
          保存预算
        </Button>
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
