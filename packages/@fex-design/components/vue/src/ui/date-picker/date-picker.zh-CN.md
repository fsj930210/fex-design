# DatePicker / RangePicker

日期与日期范围选择，默认通过 Input 触发、Popover 承载浮层、Calendar 提供面板内容。Primitive 有默认样式且可覆盖；UI 是相同部件与逻辑的快捷组合。


默认 Input 只用于展示和触发，固定 `readOnly=true`；通过面板选择日期，不支持手动输入。`format` 只控制展示。

## 导入与使用


```vue
<script setup lang="ts">
import { DatePicker, RangePicker } from '@fex-design/vue/ui/date-picker'
</script>

<template>
  <div class="flex flex-wrap items-start gap-4">
    <DatePicker :input-props="{ size: 'sm', variant: 'filled' }" />
    <RangePicker :need-confirm="true" />
  </div>
</template>
```

## 值与选择粒度

值使用 Calendar 的语义对象，不是字符串或原生 Date。`CalendarDate` / `CalendarYearMonth` 可通过 `@fex-design/core/calendar/temporal` 的 `Temporal.PlainDate.from()` / `Temporal.PlainYearMonth.from()` 创建。

| picker | TValue | 默认格式 |
| --- | --- | --- |
| date | CalendarDate | YYYY-MM-DD |
| week | CalendarWeek: { start, end } | YYYY-W |
| month | CalendarYearMonth | YYYY-MM |
| quarter | CalendarQuarter: { year, quarter: 1 \| 2 \| 3 \| 4 } | YYYY-[Q]Q |
| year | CalendarYear: { year } | YYYY |

DatePicker 单选空值为 `null`，多选空值为 `[]`；RangePicker 值为 `{ start?: TValue; end?: TValue }`，空值为 `{}`。未使用的 `defaultValue` 直接省略。`format` 不改变值类型；日期与月份按格式显示，周、季度、年份使用对应内置分支，周文字不支持任意格式覆盖。

## DatePicker 参数

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `value` | `` TValue \| readonly TValue[] \| null `` | — | 否 | 受控选择值；TValue 与 picker 对应。 |
| `defaultValue` | `` TValue \| readonly TValue[] \| null `` | — | 否 | 初始选择，省略时单选为 null、多选为 []；只在初始化读取。 |
| `open` | `` boolean `` | — | 否 | 受控浮层状态；在开关事件中更新。 |
| `defaultOpen` | `` boolean `` | false | 否 | 初始浮层状态，只在初始化读取。 |
| `picker` | `` 'date' \| 'week' \| 'month' \| 'quarter' \| 'year' `` | "date" | 否 | 日期选择粒度及对应值类型。 |
| `multiple` | `` boolean `` | false | 否 | 启用多选；值为数组，默认需要确认。默认输入展示标签， |
| `maxCount` | `` number `` | — | 否 | 多选时最大可见标签数；不设默认值，省略时全部展示并换行。设置后超出部分显示 +N，0 表示只显示计数；不限制可选择的日期数量。 |
| `needConfirm` | `` boolean `` | "multiple" | 否 | 保留选择草稿直到 confirm；默认值随 multiple，单选 false、多选 true。 |
| `clearable` | `` boolean `` | true | 否 | 允许清除；输入有内容且触发区域 hover/focus 时显示清除入口，禁用时不显示。 |
| `disabled` | `` boolean `` | false | 否 | 禁止打开及修改选择。 |
| `format` | `` string `` | — | 否 | 日期和月份用于显示；季度按 YYYY/[Q]Q 替换，年份显示年份，周显示内置周文字。默认格式见值类型表。 |
| `weekStartsOn` | `` 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 `` | 0 | 否 | 每周起始日，影响周值归一化及日历排列；0 为周日。 |
| `minDate` | `` CalendarDate `` | — | 否 | 最早可选日期，包含该日期。 |
| `maxDate` | `` CalendarDate `` | — | 否 | 最晚可选日期，包含该日期。 |
| `disabledDate` | `(date: CalendarDate, info: DatePickerDisabledDateInfo<TValue>) => boolean` | — | 否 | 返回 true 禁用。info 包含 picker、panel；范围还包含 activePart、from（另一端）和 rangeValue，可据此动态限制跨度。 |
| `size` | `` 'sm' \| 'md' \| 'lg' `` | "md" | 否 | 默认输入尺寸；显式值优先于 inputProps.size。 |
| `variant` | `` 'outlined' \| 'filled' \| 'borderless' \| 'underlined' `` | "outlined" | 否 | 默认输入外观；显式值优先于 inputProps.variant。 |
| `placeholder` | `` string `` | — | 否 | 输入占位文字；省略时使用 inputProps.placeholder 或当前格式，多选已有标签时为空。 |
| `inputProps` | `` DatePickerInputProps `` | — | 否 | 默认 Input 的外观、安全原生属性和事件；class/style 作用于输入区域，属性和事件作用于实际 input。 |
| `popoverProps` | `` DatePickerPopoverProps `` | — | 否 | 仅开放定位、挂载容器、关闭策略、挂载策略及 root 样式；默认 placement=bottom、sideOffset=6。 |
| `calendarProps` | `DatePickerCalendarProps` | — | 否 | locale 控制星期、月份、年月标题、导航名称和今天文字；支持 cellRender 与结构化样式。 |
| `classNames` | `` DatePickerClassNames `` | — | 否 | separator、panelGroup、tags、tag、tagRemove、tagOverflow、footer、today、cancel、confirm 的类名。只作用于已有部件，按钮键用于默认底部。 |
| `styles` | `` DatePickerStyles<DatePickerStyle> `` | — | 否 | 与 classNames 相同的结构键，值使用当前框架的 DatePickerStyle。 |
| `footer` | `` VNodeChild \| ((actions: DatePickerFooterActions) => VNodeChild) `` | — | 否 | 省略或 undefined 显示今天；needConfirm 时另显示取消与确定。null 隐藏整个底部，有效内容或渲染函数替换；隐藏不改变确认规则。 |
| `class` | `` string `` | — | 否 | 合并到可见触发区域。 |
| `style` | `` StyleValue `` | — | 否 | 可见触发区域样式；浮层样式通过 popoverProps 配置。 |

## RangePicker 参数

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `value` | `` CalendarRange<TValue> `` | — | 否 | 受控选择值；TValue 与 picker 对应。 |
| `defaultValue` | `` CalendarRange<TValue> `` | — | 否 | 初始范围，省略时为空对象；只在初始化读取。 |
| `open` | `` boolean `` | — | 否 | 受控浮层状态；在开关事件中更新。 |
| `defaultOpen` | `` boolean `` | false | 否 | 初始浮层状态，只在初始化读取。 |
| `picker` | `` 'date' \| 'week' \| 'month' \| 'quarter' \| 'year' `` | "date" | 否 | 日期选择粒度及对应值类型。 |
| `allowEmpty` | `` boolean \| { start?: boolean; end?: boolean } `` | false | 否 | 允许指定端点为空；提交时仍须至少有一个有效端点。 |
| `order` | `` boolean `` | true | 否 | 提交和范围高亮时排序；面板草稿保留当前端点，第一次选择时不交换文字。 |
| `needConfirm` | `` boolean `` | false | 否 | 保留范围草稿直到 confirm；默认选完符合 allowEmpty 和约束的范围即提交。 |
| `clearable` | `` boolean `` | true | 否 | 允许清除；输入有内容且触发区域 hover/focus 时显示清除入口，禁用时不显示。 |
| `disabled` | `` boolean `` | false | 否 | 禁止打开及修改选择。 |
| `format` | `` string `` | — | 否 | 日期和月份用于显示；季度按 YYYY/[Q]Q 替换，年份显示年份，周显示内置周文字。默认格式见值类型表。 |
| `weekStartsOn` | `` 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 `` | 0 | 否 | 每周起始日，影响周值归一化及日历排列；0 为周日。 |
| `minDate` | `` CalendarDate `` | — | 否 | 最早可选日期，包含该日期。 |
| `maxDate` | `` CalendarDate `` | — | 否 | 最晚可选日期，包含该日期。 |
| `disabledDate` | `(date: CalendarDate, info: DatePickerDisabledDateInfo<TValue>) => boolean` | — | 否 | 返回 true 禁用。info 包含 picker、panel；范围还包含 activePart、from（另一端）和 rangeValue，可据此动态限制跨度。 |
| `size` | `` 'sm' \| 'md' \| 'lg' `` | "md" | 否 | 默认输入尺寸；显式值优先于 inputProps.size。 |
| `variant` | `` 'outlined' \| 'filled' \| 'borderless' \| 'underlined' `` | "outlined" | 否 | 默认输入外观；显式值优先于 inputProps.variant。 |
| `startPlaceholder` | `` string `` | "开始日期" | 否 | 开始日期占位文字，优先于开始输入配置。 |
| `endPlaceholder` | `` string `` | "结束日期" | 否 | 结束日期占位文字，优先于结束输入配置。 |
| `separator` | `` string `` | — | 否 | 开始与结束等宽区域之间居中的内容，两侧间距相同；省略时为箭头。 |
| `inputProps` | `` DatePickerInputProps `` | — | 否 | 默认 Input 的外观、安全原生属性和事件；class/style 作用于输入区域，属性和事件作用于实际 input。 |
| `startInputProps` | `` DatePickerEndpointProps `` | — | 否 | 开始输入的安全原生属性；优先于共享配置，id/name 应在此设置。 |
| `endInputProps` | `` DatePickerEndpointProps `` | — | 否 | 结束输入的安全原生属性；优先于共享配置，id/name 应在此设置。 |
| `popoverProps` | `` DatePickerPopoverProps `` | — | 否 | 仅开放定位、挂载容器、关闭策略、挂载策略及 root 样式；默认 placement=bottom、sideOffset=6。 |
| `calendarProps` | `DatePickerCalendarProps` | — | 否 | locale 控制星期、月份、年月标题、导航名称和今天文字；支持 cellRender 与结构化样式。 |
| `classNames` | `` DatePickerClassNames `` | — | 否 | separator、panelGroup、tags、tag、tagRemove、tagOverflow、footer、today、cancel、confirm 的类名。只作用于已有部件，按钮键用于默认底部。 |
| `styles` | `` DatePickerStyles<DatePickerStyle> `` | — | 否 | 与 classNames 相同的结构键，值使用当前框架的 DatePickerStyle。 |
| `footer` | `` VNodeChild \| ((actions: DatePickerFooterActions) => VNodeChild) `` | — | 否 | 省略或 undefined 显示今天；needConfirm 时另显示取消与确定。null 隐藏整个底部，有效内容或渲染函数替换；隐藏不改变确认规则。 |
| `class` | `` string `` | — | 否 | 合并到可见触发区域。 |
| `style` | `` StyleValue `` | — | 否 | 可见触发区域样式；浮层样式通过 popoverProps 配置。 |

## 事件与受控状态

所有语义事件只在用户动作请求提交或开关时通知；初始化、属性同步及语义相同的值不重复通知。`value` 和 `open` 传入后由调用方更新；默认值仅初始化读取。未完成的范围端点保留在草稿中，取消或关闭会丢弃未提交草稿。

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| change | DatePickerSelectionValue / CalendarRange | 提交有效选择。 |
| openChange | boolean | 请求浮层开关变化。 |
| update:value | DatePickerSelectionValue / CalendarRange | v-model:value |
| update:open | boolean | v-model:open |

以下为单选受控写法；将值换成 `CalendarRange`、组件换成 RangePicker / RangePickerRoot 可控制范围。

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { DatePicker } from '@fex-design/vue/ui/date-picker'
import type { DatePickerSelectionValue } from '@fex-design/vue/primitive/date-picker'
const value = ref<DatePickerSelectionValue>(null)
const open = ref(false)
</script>

<template>
  <DatePicker v-model:value="value" v-model:open="open" />
</template>
```

## 安全组合配置

以下字段在 UI 与 Primitive Root 中相同。配置会按白名单过滤；值、默认值、禁用/只读、日期约束、面板、周规则和内部回调均由 Root 管理。

| 配置 | 可用字段 |
| --- | --- |
| inputProps | size/variant/placeholder、prefix/suffix、class/style、classNames/styles；id/name/form/title、autoComplete/required、ARIA/data、焦点/键盘/指针事件 |
| startInputProps / endInputProps | id, name, form, title, placeholder, required; autocomplete, inputmode, maxlength, minlength; onChange, onFocus, onBlur, onClick, onKeydown, onKeyup, onPointerdown, onPointerup; class, style, aria-*, data-* |
| calendarProps | locale, cellRender, class, style, classNames, styles |
| popoverProps | placement, side, align, sideOffset, alignOffset, strategy, avoidCollisions, collisionBoundary, collisionPadding, matchReferenceWidth, hideWhenDetached, zIndex, getPopupContainer, closeDelay, dismiss, lazyMount, destroyOnHidden, classNames, styles |

`aria-haspopup`、`aria-expanded`、`data-slot`、`data-state`、`data-range-part`、`data-active` 为内部状态属性，不能覆盖。端点配置仅 RangePicker 支持，没有尺寸、前后缀、结构化样式或引用；端点的 class/style 用于实际 input。范围共享 inputProps 的 id/name 不生效，应分别设置 startInputProps/endInputProps。

`calendarProps.locale` 只接受 weekdays、months、year、yearSuffix、month、datePanel、monthPanel、previous、next、today、week 的展示文字；yearSuffix 默认为“年”，传空字符串不显示单位；不接受 weekStartsOn/firstWeekContainsDate。`cellRender` 在默认日期按钮旁追加内容，不移除日期选择、ARIA 或键盘行为。

`calendarProps.cellRender`: `(context: CalendarCellRenderContext) => VNodeChild`. 参数为 `{ state, controller, cell }`。

`popoverProps.dismiss` 接受 escapeKey/outsidePointer/overlayPointer。默认定位 bottom、距离 6；lazyMount 默认 true，destroyOnHidden 默认 false。`side/align` 覆盖 placement 的对应部分，例如 `{ side: 'bottom', align: 'start' }`；快捷 placement 使用 `bottomLeft` 等值。open/defaultOpen/trigger/disabled/onOpenChange、箭头及内容不属于该安全配置。

## 结构化样式与方向

| 入口 | 样式键 |
| --- | --- |
| classNames / styles | separator, panelGroup, tags, tag, tagRemove, tagOverflow, footer, today, cancel, confirm |
| inputProps.classNames / styles | root, control, prefix, suffix, clear |
| popoverProps.classNames / styles | root |
| calendarProps.classNames / styles | header, weekHeader, grid, row, cell, cellTrigger, cellContent |

默认样式、结构化样式和显式原生样式依次合并，后者优先。顶层输入便利参数在非 nullish 时优先于 inputProps；范围端点配置优先于共享输入属性。按钮样式键只作用于默认 Footer，替换内容自行设置样式。样式配置不增加新部件。

本框架的 `DatePickerStyle`：`StyleValue`.

方向使用原生 `dir="ltr"` / `dir="rtl"`，不增加 direction 属性。默认布局采用逻辑方向样式；使用 Portal 时，在实际浮层容器或全局根节点设置方向。


## 内容替换入口

| 入口 | 参数 / 内容 |
| --- | --- |
| #trigger | `` { props, ref, state } `` |
| #panel | `` { panel, state } `` |
| #container | `` { content, state } `` |
| #footer | `` { canConfirm, today, close, clear, confirm, cancel } `` |
| #prefix / #suffix | `` — `` |

Primitive Root 的容器入口接收默认组合内容；Trigger 的内容入口替换输入，Panel 的内容入口替换日历内部结构。替换容器时渲染提供的内容，并连接当前开关状态和关闭动作。默认面板入口可以复用，渲染入口存在但返回空内容仍视为替换。RangePicker 只提供后缀便利入口；前缀可通过 inputProps.prefix 配置。

底部动作参数：`canConfirm: boolean`, `today()`, `close()`, `clear()`, `confirm()`, `cancel()`. Angular 模板从 state 中读取这些字段与方法。

null 隐藏整个底部。自定义内容未渲染任何内容时，不保留底部边框和间距；框架类型允许的 0 仍正常显示。Primitive 中使用 DatePickerFooter 的原生内容入口，footer 是 UI 的便利参数。

## 原生属性与元素引用

UI attrs 透传至 Trigger，class/style 合并至可见输入区域；实际 input 属性通过 inputProps 传入。Primitive 部件使用 attrs 与原生事件。自定义 Trigger 插槽传出 props/ref/state，绑定 v-bind="props" 和 :ref="ref"。Primitive Root 的模板引用暴露 controller；UI 没有声明命令式方法。

## 公开类型

安全配置与样式类型在两层入口均导出：`DatePickerInputProps`, `DatePickerEndpointProps`, `DatePickerCalendarProps`, `DatePickerPopoverProps`, `DatePickerClassNames`, `DatePickerStyles<TStyle>`, `DatePickerStyle`.

UI 另导出 `DatePickerProps` / `RangePickerProps`；值与逻辑类型从 Primitive 入口导入。


## 交互规则与组合

单选默认选中即提交并请求关闭；多选默认需要确认。纯日期范围在同一个浮层中显示两个 Calendar，开始和结束输入分别激活端点；默认完整范围提交，allowEmpty 可以放宽指定端点要求，但仍须至少一个有效端点。needConfirm=true 时确认整个范围。

默认 Footer 显示今天；需要确认时增加取消与确定。今天仅定位到今天，不选中或提交。footer 省略使用默认内容，null 隐藏，有效内容替换；显式 footer 优先于插槽或模板。隐藏 Footer 不关闭 needConfirm，自定义内容应提供确认动作。清除即时提交空值且不关闭浮层，clearable 只控制默认清除入口。


触发元素、面板、容器和底部可以独立替换，继续消费同一 Root 逻辑及样式。UI 只组装有默认样式的 Primitive，不添加选择业务。当前版本只选择日期粒度；日期时间组合将在 TimePicker 重构后提供，当前没有 showTime 或 selectionMode。
