# Form

## Purpose

Styled composable parts backed by TanStack Form 1.33.5. Use the native TanStack documentation for values, validators, listeners and instance methods.

## Parts

| Part                   | Responsibility                                              | Host                                                |
| ---------------------- | ----------------------------------------------------------- | --------------------------------------------------- |
| FormRoot               | Stable TanStack instance and native submit/reset            | form, or no host                                    |
| FormField              | Native field registration and context                       | No extra DOM                                        |
| FormItem               | Field layout and automatic error appearance                 | div                                                 |
| FormControl            | Automatic value/event binding and native target association | No additional DOM; native/component host in Angular |
| FormLabel              | Field label and optional required marker                    | label                                               |
| FormDescription        | Mounted description association                             | p                                                   |
| FormError              | Visible field errors or custom error content                | div                                                 |
| FormGroup / FormLegend | Native semantic grouping                                    | fieldset / legend                                   |
| FormSubscribe          | Selected reactive state                                     | No extra DOM                                        |

## Example

This example composes the public Primitive parts for text input, selection, checkbox and buttons. Complete function-based and Zod registration examples are available alongside it.

```vue
<script setup lang="ts">
import { InputRoot, InputControl } from '@fex-design/vue/primitive/input'
import { SelectRoot, SelectTrigger, SelectContent } from '@fex-design/vue/primitive/select'
import {
  CheckboxRoot,
  CheckboxControl,
  CheckboxIndicator,
} from '@fex-design/vue/primitive/checkbox'
import { ref } from 'vue'
import {
  FormRoot,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
  FormError,
  FormSubscribe,
  useForm,
} from '@fex-design/vue/primitive/form'
import { Button } from '@fex-design/vue/primitive/button'

defineOptions({ name: 'BasicExample' })

const departments = [
  { value: 'product', label: '产品与设计' },
  { value: 'engineering', label: '研发团队' },
  { value: 'operations', label: '客户运营' },
]
const requiredText = ({ value }: { value: unknown }) =>
  String(value ?? '').trim() ? undefined : '请填写此项'
const emailRule = ({ value }: { value: unknown }) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? undefined : '请输入有效邮箱'
const result = ref<string>('')
const form = useForm({
  defaultValues: { name: '', email: '', department: 'product', notifications: true },

  onSubmit: async ({ value }) => {
    result.value = `已保存 ${value.name} 的资料，通知将发送至 ${value.email}。`
  },
})
</script>
<template>
  <section class="mx-auto grid w-full max-w-2xl gap-5 p-5">
    <header class="grid gap-1">
      <h3 class="text-base font-semibold">团队成员资料</h3>
      <p class="text-sm text-muted-foreground">
        填写团队成员资料，使用输入框、部门选择和通知偏好完成保存。
      </p>
    </header>
    <FormRoot :form="form" scrollToFirstError>
      <FormField name="name" :validators="{ onBlur: requiredText, onSubmit: requiredText }">
        <FormItem class="">
          <FormLabel required>姓名</FormLabel>
          <FormControl value-prop-name="value">
            <InputRoot>
              <InputControl :placeholder="'请输入联系人姓名'" />
            </InputRoot>
          </FormControl>
          <FormError />
        </FormItem>
      </FormField>
      <FormField name="email" :validators="{ onBlur: emailRule, onSubmit: emailRule }">
        <FormItem class="">
          <FormLabel required>工作邮箱</FormLabel>
          <FormControl value-prop-name="value">
            <InputRoot>
              <InputControl :placeholder="'name@company.com'" />
            </InputRoot>
          </FormControl>
          <FormError />
        </FormItem>
      </FormField>
      <FormField name="department">
        <FormItem class="">
          <FormLabel>所属部门</FormLabel>
          <FormControl value-prop-name="value">
            <SelectRoot :options="departments">
              <SelectTrigger />
              <SelectContent />
            </SelectRoot>
          </FormControl>
          <FormDescription>用于分配项目通知和审批权限。</FormDescription>
          <FormError />
        </FormItem>
      </FormField>
      <FormField name="notifications">
        <FormItem>
          <div class="flex items-start gap-3">
            <CheckboxRoot>
              <FormControl valuePropName="checked">
                <CheckboxControl />
              </FormControl>
              <CheckboxIndicator />
            </CheckboxRoot>
            <FormLabel>接收项目进度邮件</FormLabel>
          </div>
          <FormError />
        </FormItem>
      </FormField>
      <FormSubscribe :selector="(state) => state.isSubmitting" v-slot="{ value: busy }">
        <div class="flex flex-wrap gap-3 border-t border-border pt-4">
          <Button type="submit" variant="solid" color="primary" :loading="busy">保存资料</Button>
          <Button type="reset" :disabled="busy">重置</Button>
        </div>
      </FormSubscribe>
    </FormRoot>
    <p v-if="result" role="status" class="rounded-md bg-muted-background p-3 text-sm">
      {{ result }}
    </p>
  </section>
</template>
```

## API

| Property                 | Type                                        | Default                | Required | Meaning                                                      |
| ------------------------ | ------------------------------------------- | ---------------------- | -------- | ------------------------------------------------------------ |
| form                     | TanStack FormApi                            | —                      | Yes      | FormRoot: the original framework instance.                   |
| component                | 'form' \| false                             | 'form'                 | No       | Root host mode; Angular uses form/div selectors.             |
| errorVisibility          | 'touched' \| 'submit' \| 'always'           | 'touched'              | No       | Root default or Field override; does not execute validation. |
| scrollToFirstError       | boolean \| FormScrollOptions                | false                  | No       | Root-owned invalid submits only.                             |
| name                     | DeepKeys<TData>                             | —                      | Yes      | Field path, including objects and arrays.                    |
| validators / listeners   | TanStack native types                       | —                      | No       | Native field validation and business events.                 |
| defaultValue / mode      | TanStack native types                       | Native                 | No       | Native field initialization and array mode.                  |
| valuePropName / trigger  | string                                      | Framework default      | No       | Control value property and value event.                      |
| getValueFromEvent        | (...args: unknown[]) => unknown             | Native event/value     | No       | Synchronous event-to-value conversion.                       |
| getValueProps            | (value: unknown) => Record<string, unknown> | Value property mapping | No       | Value properties only; cannot replace handlers or ARIA.      |
| required                 | boolean                                     | false                  | No       | Label marker and aria-required; not a validator.             |
| selector                 | (state) => TSelected                        | —                      | Yes      | FormSubscribe selects a local slice.                         |
| className / class, style | Host native types                           | —                      | No       | Passed to the owning DOM part.                               |

### Control binding

Pass exactly one direct control in the default slot. Native inputs use value/input, native checkboxes use checked/change, and components default to value/onChange.

The default input conversion reads the native event target or takes the first direct value argument. Use getValueFromEvent for multiple arguments and getValueProps for value conversion. Existing controlled value/defaultValue conflicts are rejected. Event conversion runs before field.handleChange, then the original callback runs once where the framework supports callback injection.

### State and instance

Create the instance with useForm. Configure defaultValues, validators, listeners, onSubmit and onSubmitInvalid there. No schema library is bundled. Use reset(data) for a new default baseline, setFieldValue for a local update, setFieldMeta/setErrorMap for errors, and native array methods for lists.

Programmatic setFieldValue follows TanStack listener/meta/validation behavior; use its explicit options for silent updates. Reading a snapshot is not a reactive subscription. Use FormSubscribe or the native Store selector. useFormInstance/useFormTargets returns the instance or target scope, not a copied state model.

### Composition and types

Field-related parts require FormField inside FormRoot. Item is layout only. Use class/style for horizontal or responsive layouts. No layout or label alignment properties are added. A mounted Root keeps its instance; replace the subtree when replacing the instance.

Context does not infer a data generic from an arbitrary ancestor. React/Solid and typed SFC entry points accept explicit data parameters; use the native field logic with an explicit form for strict inference where template inference is insufficient. The independent native field API is exported from this same entry point.

### Accessibility

Labels, descriptions and rendered errors register IDs automatically. IDs are not derived from field names. A custom control must forward the generated attributes and expose its actual target for focus. Empty Angular error hosts are hidden and do not register an error ID. Complex error objects require custom rendering; payloads remain unchanged in TanStack.

## CSS variables

| Variable                 | Default                   | Meaning                |
| ------------------------ | ------------------------- | ---------------------- |
| --form-gap               | var(--space-xl, 1rem)     | Root and group spacing |
| --form-item-gap          | var(--space-sm, 0.375rem) | Item spacing           |
| --form-label-color       | var(--foreground)         | Label color            |
| --form-description-color | var(--muted-foreground)   | Description color      |
| --form-error-color       | var(--danger)             | Error color            |

## Automatic feedback and part styling

TanStack owns validation. FormItem and FormControl apply the current field presentation automatically; controls do not maintain their own form-validation state. Native control refs associate ARIA and focus with the real input, including provider-only roots. Style each actual Primitive part through its own class/style. FormControl introduces no wrapper and preserves the original part hierarchy.
