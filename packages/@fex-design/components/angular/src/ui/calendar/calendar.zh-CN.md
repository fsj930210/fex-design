# Calendar

从 `@fex-design/angular/ui/calendar` 具名导入 Calendar。

Calendar 默认显示大日历、年月控件和日期/月面板切换；fullscreen=false 显示卡片。value/defaultValue 为 CalendarDate 或 null，不公开 granularity。viewDate/panel 管理浏览，翻页和选取浏览年月不会修改选中值。

## 内容扩展

使用 header/cell/fullCell/footer ng-template；用 let-state="state"、let-controller="controller"、let-cell="cell" 读取参数。Header/Footer 收到 { state, controller }，Cell 收到 { cell, state, controller }。headerRender=false 隐藏头部；footer 未提供时不显示。cellRender 在默认日期按钮外添加内容；fullCellRender 替换 Cell 内部且优先，不与 cellRender 叠加。全量定制时组合 Primitive CalendarCellTrigger 保留默认选择和键盘能力。

## 事件与逻辑

onChange 提交日期，onSelect 附带 source。默认点击为 date；自定义内容可以调用 controller.selectCell(cell, 'customize') 标记来源。Vue 使用对应语义事件，Angular select 输出 { value, info }。controller 的 setYear/setMonth/setViewDate/navigate/setPanel 由 core 完成日期计算和范围约束。

## 周数与国际化

showWeek 只在日期面板显示周数。locale 配置星期、月份、按钮文字、weekStartsOn 和 firstWeekContainsDate；组件 weekStartsOn 优先。ISO 周规则使用 weekStartsOn=1、firstWeekContainsDate=4，跨年周号由 core 计算。默认使用中文，未指定 locale 字段回退默认值。

## 样式

classNames/styles 支持 header、weekHeader、weekNumber、grid、row、cell、cellTrigger、cellContent、footer。根元素使用原生 class/style。尺寸、间距和圆角由 class/style 调整。

Primitive 和 UI 共用 --calendar-hover-background、--calendar-selected-background、--calendar-selected-foreground、--calendar-today-color。可在根元素或祖先容器覆盖，组件不会在内联样式写死变量默认值。

## 示例

覆盖基本、通知事项、跨日期事件、卡片、受控选择、农历、周数、自定义头部、语义样式、国际化、共享变量和 Footer。农历由用户内容生成，不改变 core 的日期选择协议。

classNames/styles 可以是语义对象，也可以是接收 { state, controller } 并返回语义对象的函数。用户配置在默认 class 后合并；周数列宽度可通过 weekHeader/row 的 class 或 grid-template-columns 样式一起调整。
