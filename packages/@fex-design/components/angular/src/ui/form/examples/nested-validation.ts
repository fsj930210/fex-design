import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { JsonPipe } from '@angular/common'
import { injectForm, type AnyFormState } from '@tanstack/angular-form'
import { z } from 'zod'
import { Form, FormField, FormSubscribe } from '@fex-design/angular/ui/form'
import { Input } from '@fex-design/angular/ui/input'
import { Button } from '@fex-design/angular/ui/button'
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
@Component({
  selector: 'section[formNestedValidationExample]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Form, FormField, FormSubscribe, Input, Button, JsonPipe],
  host: { class: 'contents' },
  template: `
    <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">项目预算的嵌套结构与联合校验</h3>
        <p class="text-sm text-muted-foreground">
          对象字段与数组项分别校验；分配名称不能重复，分配合计不能超过预算。联合错误归属具体数组字段，修改预算或任一分配会重新校验。
        </p>
      </header>
      <form uiForm [form]="form">
        <ng-template #projectNameLabel>项目名称</ng-template>
        <div
          formField
          [tanstackField]="form"
          name="project.name"
          #projectName="field"
          [label]="projectNameLabel"
          required
        >
          <div
            input
            [value]="projectName.api.state.value"
            (onChange)="projectName.api.handleChange($any($event).target.value)"
            (focusout)="projectName.api.handleBlur()"
          ></div>
        </div>
        <ng-template #budgetLabel>项目预算</ng-template>
        <div
          formField
          [tanstackField]="form"
          name="project.budget"
          #budget="field"
          [label]="budgetLabel"
          required
        >
          <div
            input
            [value]="budget.api.state.value"
            (onChange)="budget.api.handleChange($any($event).target.value)"
            (focusout)="budget.api.handleBlur()"
          ></div>
        </div>
        @for (allocation of allocations; track allocation.id; let index = $index) {
          <section
            class="grid gap-3 rounded-lg border border-border p-4"
            [attr.aria-label]="'分配 ' + (index + 1)"
          >
            <h4 class="font-semibold">分配 {{ index + 1 }}</h4>
            <ng-template #allocationNameLabel>分配名称</ng-template>
            <div
              formField
              [tanstackField]="form"
              [name]="allocationPath(index, 'name')"
              #allocationName="field"
              [label]="allocationNameLabel"
              required
            >
              <div
                input
                [value]="allocationName.api.state.value"
                (onChange)="allocationName.api.handleChange($any($event).target.value)"
                (focusout)="allocationName.api.handleBlur()"
              ></div>
            </div>
            <ng-template #allocationAmountLabel>分配金额</ng-template>
            <div
              formField
              [tanstackField]="form"
              [name]="allocationPath(index, 'amount')"
              #allocationAmount="field"
              [label]="allocationAmountLabel"
              required
            >
              <div
                input
                [value]="allocationAmount.api.state.value"
                (onChange)="allocationAmount.api.handleChange($any($event).target.value)"
                (focusout)="allocationAmount.api.handleBlur()"
              ></div>
            </div>
          </section>
        }
        <button button type="submit" variant="solid" color="primary">保存预算</button>
        <ng-template [formSubscribe]="values" let-current>
          <pre class="overflow-auto rounded-md bg-muted-background p-3 text-sm">{{
            current | json
          }}</pre>
        </ng-template>
      </form>
      <p role="status" class="text-sm text-muted-foreground">{{ result() }}</p>
    </section>
  `,
})
export class NestedValidationExample {
  readonly allocations = initialValues.allocations
  readonly result = signal('')
  readonly form = injectForm({
    defaultValues: initialValues,
    validators: { onChange: budgetSchema },
    onSubmit: ({ value }) => {
      this.result.set('已保存预算：' + value.project.name)
    },
  })
  readonly values = (state: AnyFormState) => state.values
  allocationPath(index: number, key: 'name' | 'amount') {
    return `allocations[${index}].${key}` as const
  }
}
