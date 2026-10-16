# Calendar Primitive

CalendarRoot 提供日期选择、浏览和面板切换能力，可组合头部、网格、单元格与底部。

## 部件

| 部件 | 用途 |
| --- | --- |
| CalendarRoot | 状态与动作作用域 |
| CalendarHeader | 自定义头部，提供当前日期、面板及导航动作 |
| CalendarNavigationButton | previous/next month、year、panel 或 today |
| CalendarPanelTrigger | 切换 date、month、quarter、year、decade 面板 |
| CalendarWeekHeader | 星期标题，labels 可覆盖 |
| CalendarGrid | 默认网格或逐 cell 自定义内容 |
| CalendarRow | 网格行 |
| CalendarCell | 布局和状态容器，默认包含 CalendarCellTrigger |
| CalendarCellTrigger | 日期选择按钮，默认撑满单元格 |
| CalendarFooter | 底部内容与操作区 |

## Root API

| 属性 | 说明 |
| --- | --- |
| value / defaultValue | 受控值与初始值；undefined 表示非受控，null 表示空值 |
| viewDate / defaultViewDate | 浏览位置；默认初始值所在月，否则今天 |
| panel / defaultPanel | 浏览面板；默认由 granularity 决定 |
| granularity | date、week、month、quarter、year；决定最终提交的值 |
| values / range | 多值或区间的展示输入，选择流程由上层组合 |
| weekStartsOn | 0 至 6，默认 0 |
| today | 覆盖今天日期 |
| min / max / disabledDate | 日期可选限制 |

default 属性仅初始化一次。翻页与切换面板不改变选中值。浏览层级单元格会下钻面板，达到选择粒度时才触发 change。cellSelect 是通知，不接管默认选择。所有部件保留原生属性、事件、class 与元素引用能力。

## 扩展单元格

CalendarCell 本身不处理点击选择。自定义内容时显式组合 CalendarCellTrigger。日期、农历文字等静态内容可以放入 Trigger；日程链接和其他按钮放在 Trigger 外，作为 Cell 的兄弟内容。通过 class 调整布局，避免操作区相互覆盖。

## 键盘

Tab 进入一个可用日期；方向键移动日期，Home/End 移动到行首/行末，PageUp/PageDown 翻页并移动焦点，Enter/Space 使用原生按钮选择。

## 使用

所有部件从 `@fex-design/vue/primitive/calendar` 具名导入。Root 使用 `@change`、`@view-date-change`、`@panel-change`；cellSelect/cellHover 分别使用 `@cell-select` / `@cell-hover`。Header 和 Grid 使用作用域 slot；Cell 的 slot 接收 cell，自定义时组合 CellTrigger。通过模板 ref 的 element 获取核心 DOM。独立逻辑接口为 `useCalendar(() => options)`。

## 自定义内容契约

WeekHeader 的自定义内容统一收到 `{ label, index }`；CellTrigger 的自定义内容统一收到 cell。React/Solid 使用 children 回调，Vue 使用作用域 slot，Svelte 使用 snippet，Angular 使用 ng-template。Grid 不提供独立 cellClass，自定义样式通过 CalendarCell 的原生 class 传入。Angular 的原生 class 支持动态绑定并与默认样式合并。

## 独立逻辑接口

返回契约统一为 `{ controller, state, grid }`，支持 `TValue extends CalendarValue` 泛型。所有动作通过 controller 调用，snapshot 仅用于内部订阅。React 的 state/grid 为当前渲染值，Vue 为 computed（脚本中读取 .value），Solid 与 Angular 为访问器（调用读取），Svelte 为响应式 getter（保持对象属性访问，不提前解构）。React 接收 options 对象，其他框架接收 options getter 以保留响应式依赖。

Root、Grid、Cell、CellTrigger 与独立逻辑接口均支持 `TValue extends CalendarValue`（默认 CalendarValue）。注入作用域不会自动传递父组件的泛型，Grid 的自定义内容类型需按框架原生方式显式指定。Angular Root 的状态统一从 state() 读取，动作统一通过 controller 调用。

change/onChange 仅在值不同的时候触发，select/onSelect 在每次提交选择时触发并携带 source。自定义 UI 可调用 controller.selectCell(cell, 'customize')。
