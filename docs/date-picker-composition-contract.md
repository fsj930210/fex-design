# DatePicker 安全组合契约

默认 Input 固定 `readOnly=true`，只展示选择值并触发面板，不支持手动输入或输入掩码。DatePicker／RangePicker 不提供 status 或可配置的 readOnly；format 仅用于展示，选择动作由 Calendar/core 完成。

安全组合配置已统一：inputProps 提供输入外观和安全原生属性，popoverProps 提供定位/容器/关闭/挂载及 root 样式，calendarProps 提供展示文字、cellRender 和七个结构化部件。三者不能拥有第二份值、面板、日期约束或内部事件。Root 的 classNames/styles 用于 separator、panelGroup、多选标签及默认 Footer。默认、结构化、显式原生配置依次合并；UI 与 Primitive 使用同一套部件和样式。

UI 不再提供 triggerProps/contentProps/panelProps/footerProps；输入配置迁入 inputProps，浮层配置迁入 popoverProps，日历配置迁入 calendarProps，Footer 样式迁入 classNames/styles。底部内容继续使用 footer。

## 状态归属

Root 唯一持有 value/defaultValue、open/defaultOpen、picker、multiple、needConfirm、disabled/clearable、日期约束、周规则以及选择/提交/关闭流程。UI 仅组装。样式与配置由独立的 Primitive 展示上下文分发，不复制状态。

## 开放配置

| 配置                          | 开放能力                                                                                                                                                             | 禁止覆盖                                                                                                                                                             |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| inputProps                    | size/variant/placeholder、prefix/suffix、class/style、root/control/prefix/suffix/clear 样式、id/name/form/title/autoComplete/required、ARIA/data、焦点/键盘/指针事件 | value/defaultValue/onValueChange、type、disabled/clearable、Picker 自己的 ARIA/data                                                                                  |
| startInputProps/endInputProps | 每个范围端点的安全原生输入属性、事件、class/style                                                                                                                    | 上述受保护字段及输入区域的 size/variant/prefix/suffix                                                                                                                |
| popoverProps                  | placement/side/align、offset、strategy、碰撞、宽度、zIndex、挂载容器、dismiss、挂载/销毁和延迟、root classNames/styles                                               | open/defaultOpen/onOpenChange/trigger/disabled、内容/标题/Arrow/hover 配置                                                                                           |
| calendarProps                 | locale 展示文字、class/style、cellRender、header/weekHeader/grid/row/cell/cellTrigger/cellContent classNames/styles                                                  | value/values/range、默认值、viewDate/panel及默认值、granularity/monthSelection、约束、周规则、内部事件、fullscreen/showWeek/headerRender/fullCellRender/footerRender |

类型和运行时使用显式白名单；未提供/undefined 被忽略，合法的 false、0、空字符串保留。classNames/styles 只影响已有默认部件，不生成新的节点或业务条件。cellRender 追加内容，默认 CalendarCellTrigger 始终保留。

## 合并与替换

默认样式 → 结构化配置 → 显式部件原生 class/style。顶层输入外观便利参数优先于 inputProps；端点属性覆盖共享输入属性，范围 id/name 只从端点读取。原生事件按框架原生表达组合，取消后的内置动作仍受共同 guard 约束。显式 footer 优先，null 隐藏，undefined 时使用 slot/template 或默认底部；隐藏底部不改变确认规则。

## CSS 变量与方向

复用 Input、Popover、Calendar 变量，不增加 DatePicker 专属主题变量。popup 的变量可直接通过 popoverProps.styles.root 传入，Calendar 默认面板背景/文字继承 Popover 变量，Portal 不依赖触发器原来的 DOM 祖先。日期范围端点圆角、输入对齐、标签 padding 和双面板分隔使用逻辑方向样式。方向与交互仍需按仓库授权规则进行运行验收。

## 框架表达

React/Solid 使用原生 JSX 渲染函数；Vue 使用 attrs、VNode 和 slot；Svelte 使用 snippet；Angular 使用 Signal 输入和 TemplateRef。参考 [Vue attrs](https://vuejs.org/guide/components/attrs.html)、[Solid props](https://docs.solidjs.com/concepts/components/props)、[Svelte snippets](https://svelte.dev/docs/svelte/snippet)、[Angular queries](https://angular.dev/guide/components/queries)。业务规则和样式部件相同。

## 验证边界

本次仅允许源码/原生模板/导出/文档及注册检查。未编写测试、未运行 typecheck/lint/build/format、未启动服务或进行浏览器/MCP/UIA 手动检查。静态结论不代表运行验收。
