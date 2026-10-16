# Calendar

从 `@fex-design/react/ui/calendar` 具名导入 Calendar。

Calendar 默认显示大日历、年月控件和日期/月面板切换；fullscreen=false 显示卡片。value/defaultValue 为 CalendarDate 或 null，不公开 granularity。viewDate/panel 管理浏览，翻页和选取浏览年月不会修改选中值。

## 内容扩展

使用 headerRender/cellRender/fullCellRender/footerRender 回调。Header/Footer 收到 { state, controller }，Cell 收到 { cell, state, controller }。headerRender=false 隐藏头部；footer 未提供时不显示。cellRender 在默认日期按钮外添加内容；fullCellRender 替换 Cell 内部且优先，不与 cellRender 叠加。全量定制时组合 Primitive CalendarCellTrigger 保留默认选择和键盘能力。

农历文字与日程由自定义单元格内容提供，不改变日期选择值。

## 事件与逻辑

onChange 提交日期，onSelect 附带 source。自定义内容可调用 controller.selectCell(cell, 'customize') 标记来源。通过 controller 的 setYear/setMonth/setViewDate/navigate/setPanel 浏览日期并切换面板。

## 周数与国际化

showWeek 只在日期面板显示周数。locale 配置星期、月份、按钮文字、weekStartsOn 和 firstWeekContainsDate；组件 weekStartsOn 优先。ISO 周规则使用 weekStartsOn=1、firstWeekContainsDate=4。默认使用中文，未指定 locale 字段回退默认值。

## 样式

classNames/styles 支持 header、weekHeader、weekNumber、grid、row、cell、cellTrigger、cellContent、footer。根元素使用原生 class/style。尺寸、间距和圆角由 class/style 调整。

可通过 --calendar-hover-background、--calendar-selected-background、--calendar-selected-foreground、--calendar-today-color 调整颜色。变量可设置在根元素或祖先容器。

classNames/styles 可以是语义对象，也可以是接收 { state, controller } 并返回语义对象的函数。用户配置在默认 class 后合并；周数列宽度可通过 weekHeader/row 的 class 或 grid-template-columns 样式一起调整。
