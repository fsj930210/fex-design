# TimePicker

通过 `@fex-design/angular/ui/time-picker` 具名导入 TimePicker。只组装同框架 Primitive，按 format 选择时间列，不保存第二份时间或输入草稿。

## 使用

完整源码见 examples/basic、examples/controlled、examples/trigger 和 examples/item；对应 Primitive 的规则、事件与 useTimePicker 见 ../../primitive/time-picker/time-picker.md。

| 参数                               | 类型                        | 默认值           | 必填 | 说明                       |
| ---------------------------------- | --------------------------- | ---------------- | ---- | -------------------------- |
| value / defaultValue               | TimeValue / null            | undefined / null | 否   | 受控值 / 初始值            |
| format                             | string                      | HH:mm:ss         | 否   | 解析、显示和默认列顺序     |
| use12Hours                         | boolean                     | false            | 否   | 12 小时制，默认 hh:mm:ss A |
| step                               | { hour?, minute?, second? } | 每列 1           | 否   | 列步长                     |
| disabled / readOnly                | boolean                     | false            | 否   | 禁用 / 只读                |
| disabledTime                       | DisabledTime                | undefined        | 否   | 输入与选择统一约束         |
| allowClear                         | boolean                     | true             | 否   | 清除入口                   |
| placeholder / invalid / inputProps | 原生输入配置                | undefined        | 否   | 展示与属性透传             |
| open / defaultOpen                 | boolean                     | false            | 否   | 浮层开关                   |

Trigger、panel、footer 使用原生内容入口；React/Solid 对应 triggerRender/panelRender/footer，Vue 为具名 slot，Svelte 为 snippet，Angular 为 #trigger/#panel/#footer TemplateRef。Angular 的自定义触发模板直接使用 `<button timePickerTrigger>`，并从 primitive/time-picker 导入 TimePickerTrigger；事件、ARIA 和浮层锚点均绑定到按钮本身。前后缀也使用原生内容。

change 和受控规则与 Primitive 相同；选择立即提交且不关闭，footer 不引入隐式确认逻辑。默认动作均受 disabled/readOnly 约束。LTR/RTL 和 reduced-motion 由 Primitive 处理。

## 完整基本示例

```ts
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TimePicker } from '@fex-design/angular/ui/time-picker'
@Component({
  selector: 'time-picker-basic-example',
  standalone: true,
  imports: [TimePicker],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class TimePickerBasicExample {}
```

```html
<div class="flex w-full min-w-0 flex-col gap-4">
  <div timePicker [defaultValue]="{ hour: 9, minute: 30, second: 0 }"></div>
</div>
```

Popover 的定位、容器和挂载配置通过 popoverProps 转发；该配置不能创建第二份 open/disabled 状态。默认输入支持 size 与 variant。

受控示例提供外部设置、恢复、清空值和开关面板按钮；非受控输入绑定同一外部值作为 defaultValue，外部值变化不覆盖内部选择。所有示例使用显式全宽容器，避免框架宿主差异影响展示宽度。

## 默认输入扩展

默认 Trigger 组合 Input，原生输入类型固定为 `text`。`inputProps: TimePickerInputProps` 只扩展原生输入，不替代时间状态。该类型从本框架 `primitive/time-picker` 入口具名导出；UI 与 Primitive 使用同一契约。

| 配置                                                     | 归属                                                                  |
| -------------------------------------------------------- | --------------------------------------------------------------------- |
| id、name、form、placeholder、class/style、aria-_、data-_ | 可通过 inputProps 传入，React 使用 className                          |
| type、value、defaultValue、disabled、readOnly/readonly   | 不允许通过 inputProps 传入；值、禁用与只读由 TimePicker/Root 管理     |
| input/change 事件及其捕获版本                            | 不允许覆盖内部输入解析；通过 TimePicker/Root 的 change 事件消费值变化 |
| aria-haspopup、aria-expanded、data-slot、data-state      | 组件内部维护，不允许覆盖                                              |

约束同时应用于 TypeScript 类型与运行时属性过滤，JavaScript 或带额外字段的对象同样不能覆盖上述配置。替换 Trigger 时，inputProps 不作用于自定义内容。

## 时间范围

`TimeRangePicker` 只组装范围 Primitive。 两个字段共用后缀、清除和一个浮层；点击字段只切换当前端点，不提交或重建第二个独立选择器。

| 参数                            | 类型                                   | 默认值              | 必填 | 说明                                                       |
| ------------------------------- | -------------------------------------- | ------------------- | ---- | ---------------------------------------------------------- |
| value                           | readonly [TimeValue, TimeValue] / null | undefined           | 否   | 完整范围；undefined 非受控，null 受控空值                  |
| defaultValue                    | readonly [TimeValue, TimeValue] / null | null                | 否   | 只在初始化读取                                             |
| needConfirm                     | boolean                                | true                | 否   | 默认逐端确认，两端确认后提交；false 为有效完整范围即时提交 |
| open / defaultOpen              | boolean                                | false               | 否   | 一个共享浮层的开关                                         |
| size / variant                  | Input size / variant                   | md / outlined       | 否   | 统一设置整个输入外框                                       |
| startInputProps / endInputProps | TimePickerInputProps                   | undefined           | 否   | 原生字段扩展，沿用受保护的输入契约                         |
| placeholder                     | readonly [string, string]              | 开始时间 / 结束时间 | 否   | 两个字段的占位文字                                         |
| allowClear                      | boolean                                | true                | 否   | 一次清除整个范围并提交 null                                |

范围按端点逐次确认：确认当前时间后自动切换并聚焦另一个字段；两端都确认且范围有效后，才提交并关闭。

`format/use12Hours/disabled/readOnly/disabledTime/popoverProps` 沿用时间选择配置，UI 支持 step。确认前的输入和列选择只修改会话草稿；取消、关闭或 Escape 恢复已提交值。每个有效端点均可单独确认；完整且有序的范围才能提交。change 一次携带整个范围；onOpenChange/openChange 只报告共享浮层开关请求，配置同步不触发 change。受控调用方在 change/openChange 中更新对应 value/open。字段失焦丢弃未解析文本；resetInput 命令恢复当前有效时间而不重新解析或修改值。

React/Vue/Solid/Svelte 从 `primitive/time-picker` 导入 `useTimeRangePicker`；Angular 导入 `TimeRangePickerState` 并先 setOptions。它们公开 controller/snapshot，逻辑可独立于内置 DOM 消费。

完整范围示例：

```typescript
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { format } from '@fex-design/core/date/utils'
import type { TimeRangeValue } from '@fex-design/angular/primitive/time-picker'
import { TimeRangePicker } from '@fex-design/angular/ui/time-picker'
@Component({ selector: 'time-picker-range-example', standalone: true, imports: [TimeRangePicker], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './range.html' })
export class TimePickerRangeExample {
  readonly initial: TimeRangeValue = [{ hour: 9, minute: 30, second: 0 }, { hour: 17, minute: 30, second: 0 }]
  readonly confirmed = signal<TimeRangeValue | null>(this.initial)
  readonly immediate = signal<TimeRangeValue | null>(this.initial)
  display(value: TimeRangeValue | null) { return value ? `${format(value[0], 'HH:mm:ss')} → ${format(value[1], 'HH:mm:ss')}` : '未选择' }
}

<!-- range.html -->
<div class="grid w-full gap-6">
  <section class="grid gap-2"><p>默认确认后提交</p><div timeRangePicker [defaultValue]="initial" (change)="confirmed.set($event.value)"></div><output aria-live="polite">已提交：{{ display(confirmed()) }}</output></section>
  <section class="grid gap-2"><p>关闭确认，完整有效区间即时提交</p><div timeRangePicker [defaultValue]="initial" [needConfirm]="false" (change)="immediate.set($event.value)"></div><output aria-live="polite">已提交：{{ display(immediate()) }}</output></section>
</div>
```

## 结构化样式

TimePicker 的 `classNames`、`styles` 支持 `root`（输入外框）、`input`（原生输入）、`popup`（浮层）、`panel`（时间面板）、`column`（时间列）、`item`（选项）和 `selectedItem`（选中项）。选中项样式叠加在选项样式上，浮层部件直接接收样式，支持 Portal。

`styles` 使用本框架原生样式类型：React 为 CSSProperties，Vue 为 StyleValue，Solid 为 JSX.CSSProperties，Svelte 为样式文本，Angular 为样式映射。自定义面板负责其自身 DOM。
