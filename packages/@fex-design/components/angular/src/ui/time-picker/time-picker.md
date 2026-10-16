# TimePicker

通过 `@fex-design/angular/ui/time-picker` 具名导入 TimePicker。只组装同框架 Primitive，按 format 选择时间列，不保存第二份时间或输入草稿。

## 使用

完整源码见 examples/basic、examples/controlled、examples/trigger 和 examples/item；对应 Primitive 的规则、事件与独立逻辑见 ../../primitive/time-picker/time-picker.md。

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| value / defaultValue | TimeValue / null | undefined / null | 否 | 受控值 / 初始值 |
| format | string | HH:mm:ss | 否 | 解析、显示和默认列顺序 |
| use12Hours | boolean | false | 否 | 12 小时制，默认 hh:mm:ss A |
| step | { hour?, minute?, second? } | 每列 1 | 否 | 列步长 |
| disabled / readOnly | boolean | false | 否 | 禁用 / 只读 |
| disabledTime | DisabledTime | undefined | 否 | 输入与选择统一约束 |
| allowClear | boolean | true | 否 | 清除入口 |
| placeholder / invalid / inputProps | 原生输入配置 | undefined | 否 | 展示与属性透传 |
| open / defaultOpen | boolean | false | 否 | 浮层开关 |

Trigger、panel、footer 使用原生内容入口；React/Solid 对应 triggerRender/panelRender/footer，Vue 为具名 slot，Svelte 为 snippet，Angular 为 #trigger/#panel/#footer TemplateRef。前后缀也使用原生内容。class/style 保留在控件宿主，不引入多部件扁平样式属性。

change 和受控规则与 Primitive 相同；选择立即提交且不关闭，footer 不引入隐式确认逻辑。默认动作均受 disabled/readOnly 约束。LTR/RTL 和 reduced-motion 由 Primitive 处理。

## 完整基本示例

```ts
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TimePicker } from '@fex-design/angular/ui/time-picker'
@Component({ selector: 'time-picker-basic-example', standalone: true, imports: [TimePicker], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './basic.html' })
export class TimePickerBasicExample {
}
```

```html
<div class="flex w-full min-w-0 flex-col gap-4">
<div timePicker [defaultValue]="{ hour: 9, minute: 30, second: 0 }" ></div>

</div>
```

Popover 的定位、容器和挂载配置通过 popoverProps 转发；该配置不能创建第二份 open/disabled 状态。默认输入支持 size 与 variant。

受控示例提供外部设置、恢复、清空值和开关面板按钮；非受控输入绑定同一外部值作为 defaultValue，外部值变化不覆盖内部选择。所有示例使用显式全宽容器，避免框架宿主差异影响展示宽度。
