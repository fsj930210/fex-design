# TimePicker Primitive

自带默认样式的时间选择部件。默认 Trigger 渲染 Input，也可以替换为本框架原生内容。样式可覆盖，UI 层只负责组装。

## 导入与组合

从 `@fex-design/react/primitive/time-picker` 具名导入 Root、Trigger、Portal、Content、Panel、HourColumn、MinuteColumn、SecondColumn、PeriodColumn 和 Column（均带 TimePicker 前缀）。Portal 独立于 Content，可在原位渲染 Content 或组合自定义容器；Angular Portal 使用 `<ng-template popoverPortal>`，其他部件使用 `<div timePickerRoot>` 等裸属性 selector。

完整可复制源码见同目录 examples/basic；自定义 Trigger、选项内容、useTimePicker 分别见 examples/trigger、examples/item、examples/logic。示例均通过公开组件族入口导入。

## Root Props

| 参数               | 类型             | 默认值                 | 必填 | 说明                                |
| ------------------ | ---------------- | ---------------------- | ---- | ----------------------------------- |
| value              | TimeValue / null | undefined              | 否   | undefined 为非受控；null 为受控空值 |
| defaultValue       | TimeValue / null | null                   | 否   | 只在创建时读取                      |
| format             | string           | HH:mm:ss 或 hh:mm:ss A | 否   | 显示与输入解析格式                  |
| use12Hours         | boolean          | false                  | 否   | 12 小时列，内部值仍为 24 小时       |
| disabled           | boolean          | false                  | 否   | 阻止打开和修改                      |
| readOnly           | boolean          | false                  | 否   | 可查看，禁止修改                    |
| disabledTime       | DisabledTime     | undefined              | 否   | 依赖当前候选时间的选项约束          |
| open / defaultOpen | boolean          | false                  | 否   | 受控 / 非受控浮层                   |

## 部件 Props

Trigger 支持 allowClear、placeholder、invalid、inputProps 和原生前后缀内容。class/style 属于当前宿主。Content 继承 PopoverContent，Panel 为 div。Hour/Minute/SecondColumn 支持 step、disabled、isItemDisabled；PeriodColumn 支持 labels、disabled、isItemDisabled，非 12 小时制不显示有效列。

选项内容入口：React/Solid itemRender、Vue item slot、Svelte item snippet、Angular itemTemplate，接收 item/selected/active；默认按钮保留事件、引用和无障碍语义。通用 Column 还接收 options/selectedValue 和选择事件（Angular selectChange）。

## useTimePicker

useTimePicker（创建 controller/snapshot，不依赖 Context）。controller 提供 setOptions、input、change、selectHour、selectMinute、selectSecond、selectPeriod、clear、scrollToValue。snapshot 包含 value、inputValue、scrollRequest。setOptions 不触发 change；disabled/readOnly 在 core 阻止修改。

## 事件与受控状态

有效且不同的值触发 change(value, details)，details 包含 reason 和 previousValue。React/Solid 为 onChange，Vue 为 change，Svelte 为 onchange，Angular 为 change({ value, details })。父级负责更新受控 value。未完成输入仅更新 inputValue，不覆盖 value；有效输入和列选择共用 disabledTime。清除不关闭面板，选择也不引入隐式确认事务。

## 键盘、滚动与方向

上下键从焦点或当前选中项移动到有效选项，Enter/Space 原生激活。所有列使用实际 offsetTop 对齐并遵循 reduced-motion。样式使用逻辑边框，默认浮层继承 Trigger 方向；可显式传 dir 覆盖。

## 完整基本示例

```tsx
import {
  TimePickerRoot,
  TimePickerTrigger,
  TimePickerPortal,
  TimePickerContent,
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
  TimePickerPeriodColumn,
} from '@fex-design/react/primitive/time-picker'

export function TimePickerBasicExample() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <TimePickerRoot defaultValue={{ hour: 9, minute: 30, second: 0 }}>
        <TimePickerTrigger></TimePickerTrigger>
        <TimePickerPortal>
          <TimePickerContent>
            <TimePickerPanel>
              <TimePickerHourColumn />
              <TimePickerMinuteColumn />
              <TimePickerSecondColumn />
            </TimePickerPanel>
          </TimePickerContent>
        </TimePickerPortal>
      </TimePickerRoot>
    </div>
  )
}
```

Popover 的定位、容器和挂载配置通过 popoverProps 转发；该配置不能创建第二份 open/disabled 状态。默认输入支持 size 与 variant。

默认后缀使用 ClockIcon，已有值时仍显示；允许清除时，在悬停或聚焦下由同一位置的清除按钮替换。自定义 suffix 优先于默认时钟。

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

`TimeRangePickerRoot` 提供共享范围会话，`TimeRangePickerTrigger` 提供一个外框中的两个字段，复用 TimePicker 的 Portal/Content/Panel/时间列，`TimeRangePickerFooter` 提供确认与取消。 两个字段共用后缀、清除和一个浮层；点击字段只切换当前端点，不提交或重建第二个独立选择器。

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

```tsx
import { useState } from 'react'
import { format } from '@fex-design/core/date/utils'
import type { TimeRangeValue } from '@fex-design/react/primitive/time-picker'
import {
  TimeRangePickerRoot,
  TimeRangePickerTrigger,
  TimeRangePickerFooter,
  TimePickerPortal,
  TimePickerContent,
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
} from '@fex-design/react/primitive/time-picker'
const initial: TimeRangeValue = [
  { hour: 9, minute: 30, second: 0 },
  { hour: 17, minute: 30, second: 0 },
]
const display = (value: TimeRangeValue | null) =>
  value ? `${format(value[0], 'HH:mm:ss')} → ${format(value[1], 'HH:mm:ss')}` : '未选择'

export function TimePickerRangeExample() {
  const [confirmed, setConfirmed] = useState<TimeRangeValue | null>(initial)
  const [immediate, setImmediate] = useState<TimeRangeValue | null>(initial)
  return (
    <div className="grid w-full gap-6">
      <section className="grid gap-2">
        <p>默认确认后提交</p>
        <TimeRangePickerRoot defaultValue={initial} onChange={setConfirmed}>
          <TimeRangePickerTrigger />
          <TimePickerPortal>
            <TimePickerContent>
              <TimePickerPanel>
                <TimePickerHourColumn />
                <TimePickerMinuteColumn />
                <TimePickerSecondColumn />
              </TimePickerPanel>
              <TimeRangePickerFooter />
            </TimePickerContent>
          </TimePickerPortal>
        </TimeRangePickerRoot>
        <output aria-live="polite">已提交：{display(confirmed)}</output>
      </section>
      <section className="grid gap-2">
        <p>关闭确认，完整有效区间即时提交</p>
        <TimeRangePickerRoot defaultValue={initial} needConfirm={false} onChange={setImmediate}>
          <TimeRangePickerTrigger />
          <TimePickerPortal>
            <TimePickerContent>
              <TimePickerPanel>
                <TimePickerHourColumn />
                <TimePickerMinuteColumn />
                <TimePickerSecondColumn />
              </TimePickerPanel>
              <TimeRangePickerFooter />
            </TimePickerContent>
          </TimePickerPortal>
        </TimeRangePickerRoot>
        <output aria-live="polite">已提交：{display(immediate)}</output>
      </section>
    </div>
  )
}
```
