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

```typescript
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  FormRoot,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
  FormError,
  FormSubscribe,
  injectForm,
} from '@fex-design/angular/primitive/form'
import type { AnyFormState } from '@fex-design/angular/primitive/form'

@Component({
  selector: 'form-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormRoot,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormDescription,
    FormError,
    FormSubscribe,
  ],
  templateUrl: './basic.html',
})
export class BasicExample {
  readonly result = signal('尚未提交')

  readonly form = injectForm({
    defaultValues: { email: '' },

    onSubmit: ({ value }) => {
      this.result.set(JSON.stringify(value))
    },
  })
  readonly valuesSelector = (state: AnyFormState) => JSON.stringify(state.values)
}
```

```html
<section class="mx-auto grid w-full max-w-2xl gap-5 p-5">
  <header class="grid gap-1">
    <h3 class="text-base font-semibold">团队成员资料</h3>
    <p class="text-sm text-muted-foreground">
      填写团队成员资料，使用输入框、部门选择和通知偏好完成保存。
    </p>
  </header>
  <form formRoot [form]="form" [scrollToFirstError]="true">
    <ng-container formField name="name" [validators]="validators0">
      <div formItem class="">
        <label formLabel required>姓名</label>
        <ng-template #controlContent0>
          <input inputControl [placeholder]="'请输入联系人姓名'" />
        </ng-template>
        <ng-container
          formControl
          [component]="inputComponent"
          [props]="{ content: controlContent0 }"
        >
        </ng-container>
        <div formError></div>
      </div>
    </ng-container>
    <ng-container formField name="email" [validators]="validators1">
      <div formItem class="">
        <label formLabel required>工作邮箱</label>
        <ng-template #controlContent1>
          <input inputControl [placeholder]="'name@company.com'" />
        </ng-template>
        <ng-container
          formControl
          [component]="inputComponent"
          [props]="{ content: controlContent1 }"
        >
        </ng-container>
        <div formError></div>
      </div>
    </ng-container>
    <ng-container formField name="department">
      <div formItem class="">
        <label formLabel>所属部门</label>
        <ng-template #controlContent2>
          <div selectTrigger></div>
          <div selectContent></div>
        </ng-template>
        <ng-container
          formControl
          [component]="selectComponent"
          [props]="{ options: departments, content: controlContent2 }"
          trigger="change"
          [getValueFromEvent]="selectValue"
        >
        </ng-container>
        <p formDescription>用于分配项目通知和审批权限。</p>
        <div formError></div>
      </div>
    </ng-container>
    <ng-container formField name="notifications">
      <div formItem>
        <div class="flex items-start gap-3">
          <div checkboxRoot>
            <ng-container
              formControl
              [component]="checkboxComponent"
              [props]="{  }"
              valuePropName="checked"
              trigger="change"
              [getValueFromEvent]="checkedValue"
            >
            </ng-container>
            <span checkboxIndicator> </span>
          </div>
          <label formLabel>接收项目进度邮件</label>
        </div>
        <div formError></div>
      </div>
    </ng-container>
    <ng-template [formSubscribe]="selector0" let-busy>
      <div class="flex flex-wrap gap-3 border-t border-border pt-4">
        <button button type="submit" variant="solid" color="primary" [loading]="busy">
          保存资料
        </button>
        <button button type="reset" [disabled]="busy">重置</button>
      </div>
    </ng-template>
  </form>
  @if(result()) {
  <p role="status" class="rounded-md bg-muted-background p-3 text-sm">{{ result() }}</p>
  }
</section>
```

## API

| Property                 | Type                                        | Default                | Required | Meaning                                                 |
| ------------------------ | ------------------------------------------- | ---------------------- | -------- | ------------------------------------------------------- |
| form                     | TanStack FormApi                            | —                      | Yes      | FormRoot: the original framework instance.              |
| component                | 'form' \| false                             | 'form'                 | No       | Root host mode; Angular uses form/div selectors.        |
| scrollToFirstError       | boolean \| FormScrollOptions                | false                  | No       | Root-owned invalid submits only.                        |
| name                     | DeepKeys<TData>                             | —                      | Yes      | Field path, including objects and arrays.               |
| validators / listeners   | TanStack native types                       | —                      | No       | Native field validation and business events.            |
| defaultValue / mode      | TanStack native types                       | Native                 | No       | Native field initialization and array mode.             |
| valuePropName / trigger  | string                                      | Framework default      | No       | Control value property and value event.                 |
| getValueFromEvent        | (...args: unknown[]) => unknown             | Native event/value     | No       | Synchronous event-to-value conversion.                  |
| getValueProps            | (value: unknown) => Record<string, unknown> | Value property mapping | No       | Value properties only; cannot replace handlers or ARIA. |
| required                 | boolean                                     | false                  | No       | Label marker and aria-required; not a validator.        |
| selector                 | (state) => TSelected                        | —                      | Yes      | FormSubscribe selects a local slice.                    |
| className / class, style | Host native types                           | —                      | No       | Passed to the owning DOM part.                          |

### Control binding

Use formControl on the actual native input/select/textarea/button. For a custom component, use ng-container[formControl] with component and props; inputs use ComponentRef.setInput and the default output is change. Expose an actual element or provide target for focus and ARIA. Angular native event handlers retain Angular ordering.

The default input conversion reads the native event target or takes the first direct value argument. Custom controls use their standard ControlValueAccessor contract; native controls are handled directly by their own events.

### State and instance

Create the instance with injectForm. Configure defaultValues, validators, listeners, onSubmit and onSubmitInvalid there. No schema library is bundled. Use reset(data) for a new default baseline, setFieldValue for a local update, setFieldMeta/setErrorMap for errors, and native array methods for lists.

Programmatic setFieldValue follows TanStack listener/meta/validation behavior; use its explicit options for silent updates. Reading a snapshot is not a reactive subscription. Use FormSubscribe or the native Store selector. injectFormInstance / FormRoot.targets returns the instance or target scope, not a copied state model.

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
