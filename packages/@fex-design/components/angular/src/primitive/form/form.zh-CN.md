# Form

## 用途

基于 TanStack Form 1.33.5 的有默认样式的组合部件。值、校验、事件和实例方法沿用对应版本的 TanStack 文档。

## 部件

| 部件                   | 职责                              | 宿主                                 |
| ---------------------- | --------------------------------- | ------------------------------------ |
| FormRoot               | 实例上下文和原生提交、重置        | form 或无宿主                        |
| FormField              | 原生字段注册与上下文              | 无附加 DOM                           |
| FormItem               | 字段布局与自动错误外观            | div                                  |
| FormControl            | 自动连接值、事件、ARIA 与聚焦目标 | 无附加 DOM；Angular 为原生或组件宿主 |
| FormLabel              | 标签与可选必填标记                | label                                |
| FormDescription        | 已挂载说明的关联                  | p                                    |
| FormError              | 当前可展示错误或自定义错误内容    | div                                  |
| FormGroup / FormLegend | 原生语义分组                      | fieldset / legend                    |
| FormSubscribe          | 选择订阅状态                      | 无附加 DOM                           |

## 示例

通过 InputRoot/InputControl、SelectRoot/SelectTrigger/SelectContent、CheckboxRoot/CheckboxControl/CheckboxIndicator 与 Button 组合团队成员资料表单。函数校验与 Zod 校验分别提供完整注册示例。

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

| 参数                     | 类型                                        | 默认值       | 必填 | 说明                                          |
| ------------------------ | ------------------------------------------- | ------------ | ---- | --------------------------------------------- |
| form                     | TanStack FormApi                            | —            | 是   | Root 接收原始框架实例。                       |
| component                | 'form' \| false                             | 'form'       | 否   | Root 宿主模式；Angular 使用 form/div 选择器。 |
| scrollToFirstError       | boolean \| FormScrollOptions                | false        | 否   | 只处理 Root 接管的校验失败提交。              |
| name                     | DeepKeys<TData>                             | —            | 是   | 字段路径，支持对象和数组。                    |
| validators / listeners   | TanStack native types                       | —            | 否   | 原生字段校验与业务事件。                      |
| defaultValue / mode      | TanStack native types                       | 原生默认     | 否   | 原生字段默认值和数组模式。                    |
| valuePropName / trigger  | string                                      | 框架默认     | 否   | 控件值属性和变更事件。                        |
| getValueFromEvent        | (...args: unknown[]) => unknown             | 原生事件或值 | 否   | 同步转换事件参数为字段值。                    |
| getValueProps            | (value: unknown) => Record<string, unknown> | 值属性映射   | 否   | 仅映射值属性，不覆盖事件或 ARIA。             |
| required                 | boolean                                     | false        | 否   | Label 标记和必填语义，不生成校验器。          |
| selector                 | (state) => TSelected                        | —            | 是   | Subscribe 选择当前区域所需状态。              |
| className / class, style | Host native types                           | —            | 否   | 传给当前部件宿主。                            |

### 自动绑定

原生控件在实际 input/select/textarea/button 上使用 formControl。自定义组件使用 ng-container[formControl] 的 component 和 props；通过公开 ComponentRef.setInput 和 output 连接，默认事件为 change。实际元素通过 element 或 target 提供；原生事件回调遵循 Angular 顺序。

默认读取原生事件目标值或第一个直接值参数。多参数事件使用 getValueFromEvent，展示值转换使用 getValueProps。不允许控件同时提供受控值或默认值，避免两个状态来源。支持回调注入的框架先取值并更新字段，再执行用户原回调一次。

### 状态与实例

通过 injectForm 创建实例，在此配置 defaultValues、validators、listeners、onSubmit 和 onSubmitInvalid。校验库由消费者选择。reset(data) 建立新默认基准，setFieldValue 修改局部值，setFieldMeta/setErrorMap 设置错误，数组使用原生方法。

程序化改值遵循 TanStack 的监听、元数据和校验行为，静默更新使用其显式选项。读取快照不是订阅；响应式内容使用 FormSubscribe 或原生选择订阅。injectFormInstance / FormRoot.targets 获取原实例或定位作用域，不创建第二份状态。

### 组合与类型

字段部件必须处于 Root 中的 Field 内。Item 和 Control 自动采用同一错误展示策略，不需要逐个绑定 invalid。横向和响应式布局使用宿主 class/style，不提供布局或标签对齐属性。Root 挂载期间保持实例稳定，更换实例需要重建子树。

上下文不会从任意祖先自动推断数据泛型。支持显式参数的入口可提供数据类型；模板推断不足时使用接收明确 form 的原生字段逻辑，保留完整类型推断。独立字段逻辑也从本组件入口导出。

### 可访问性

标签、说明和实际渲染的错误自动登记 ID，ID 不直接取字段名。自定义控件需要转发生成属性，并暴露实际目标才能聚焦。Angular 空错误宿主隐藏且不注册错误 ID。复杂错误对象使用自定义渲染，TanStack 中的原始载荷不变。

## CSS 变量

| 变量                     | 默认值                    | 说明             |
| ------------------------ | ------------------------- | ---------------- |
| --form-gap               | var(--space-xl, 1rem)     | 根容器与分组间距 |
| --form-item-gap          | var(--space-sm, 0.375rem) | 表单项内部间距   |
| --form-label-color       | var(--foreground)         | 标签颜色         |
| --form-description-color | var(--muted-foreground)   | 说明颜色         |
| --form-error-color       | var(--danger)             | 错误颜色         |

## 自动反馈与部件样式

TanStack 是校验状态的唯一来源。FormItem 和 FormControl 根据当前字段状态自动应用共享错误外观，并在实际输入上同步 aria-invalid。输入根、数量输入根、选择触发器和勾选控件都会消费这一状态；调用方不需要手动维护校验状态。

Primitive 的样式由每个实际部件的 class/style 定制，例如 FormItem、FormLabel、InputRoot、InputControl、InputNumberActions 和 SelectContent。FormControl 不增加包装节点；控件边框和输入样式仍属于实际控件部件。
