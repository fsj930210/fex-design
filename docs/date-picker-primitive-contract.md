# DatePicker Primitive 统一契约

默认 Input 固定 `readOnly=true`，只展示选择值并触发面板，不支持手动输入或输入掩码。DatePicker／RangePicker 不提供 status 或可配置的 readOnly；format 仅用于展示，选择动作由 Calendar/core 完成。

默认 DatePicker 由 Input、Popover、Calendar 组装：Input 是 Trigger，Popover 是面板容器，Calendar 是面板内容。Primitive 提供默认样式，调用方可以覆盖样式，也可以分别替换这三个部分。

本次先统一 Primitive 的业务实现。Trigger 是绑定触发行为与元素引用的部件，默认渲染 Input；不新增与 Input 重复的 Field。UI 后续只负责装配这些部件、提供默认 footer 和配置转发，不包含选择、确认、清除、开关等业务逻辑。

逐项复核见 [五框架条件与事件审计](./date-picker-primitive-reaudit.md)。上一轮共享了事务内核，但模板分支与框架边界仍有差异；本轮继续修正这些差异。

## 审计结果与改动

原有五框架分别维护已提交值、待确认值、开关状态、输入文本和范围端点。公共格式化与范围工具已有复用，但事务处理仍在框架内重复：默认值读取、确认／取消和参数更新没有一个共同入口。

| 边界     | 本次实现                                                                                      |
| -------- | --------------------------------------------------------------------------------------------- |
| 缺省参数 | React 不再显式传入 `defaultValue: undefined`；各适配器进入 core 前删除值为 undefined 的可选项 |
| 默认值   | 仅 core 决定默认值；defaultValue/defaultOpen 仅在创建时读取                                   |
| 清除     | DatePicker、RangePicker 统一使用 `clearable`；清除动作立即提交空值，不关闭面板                |
| 选择事务 | 单选、多选、范围、约束检查、确认、取消统一进入 core controller                                |
| 受控状态 | 由传入的 value/open 决定；动作通知调用方，不私自替换受控值                                    |
| 参数更新 | 新 value/open 和配置经同一 setOptions 协议更新；普通参数更新不触发业务回调                    |
| 禁用     | disabled 阻止打开、选择、清除、标签移除和确认；默认 Input 始终只读                            |
| 范围     | 端点推进、order、allowEmpty、hover 预览由同一内核处理                                         |
| 框架差异 | 仅保留原生 props、事件、响应式订阅、生命周期、引用和内容投影的表达差异                        |

Vue 用可选 Boolean 的 `default: undefined` 声明阻止框架把未提供的参数转成 false，这是 Vue 的原生 props 声明，业务默认值仍由 core 决定；defaultValue 不声明这种默认值，进入 core 的配置会删除所有 undefined 项。Angular 的可选 Boolean transform 同样保留缺省。Solid 将 children 与逻辑配置分开读取，防止在 Provider 建立前求值子树；触发绑定保留 getter 的响应性。[Vue 官方说明](https://vuejs.org/guide/components/props.html#boolean-casting)

默认 Input 依赖链中，Vue／Svelte 的 InputControl 原先覆盖了原生 disabled／readonly。现在与 React／Solid 一样合并 Root 状态和原生属性，DatePicker 不再用额外的 InputRoot 状态补偿这个差异。

## 代码边界

```text
core/src/date-picker/
  options.ts                 可选配置与值身份
  session.ts                 受控状态、开关和提交协议（私有）
  create-date-picker.ts      单选与多选动作
  create-range-picker.ts     范围选择与预览动作
  value.ts / constraints.ts  格式化、解析、约束
  range.ts / panel.ts        范围与面板纯逻辑
  view.ts                    Trigger、面板及内容条件

components/<framework>/src/primitive/date-picker/
  use-date-picker.*          原生响应式适配
  use-range-picker.*         原生响应式适配
  date-picker-root.*         状态作用域与默认 Popover 组装
  date-picker-trigger.*      默认 Input 与自定义触发绑定
  date-picker-content.*      默认 popup 内容容器
  date-picker-panel.*        默认 Calendar 内容
  date-picker-header*.*      独立的标题与导航部件
  date-picker-footer.*       footer 布局与动作入口
  date-picker-confirm.* / date-picker-cancel.*
  date-picker-today.* / date-picker-preset.*
                             独立的 footer 动作部件
  range-picker-*.*/index.ts  范围部件与显式具名入口
```

Header、Footer 的公开子部件各自独立实现。默认面板依赖 Calendar 的导航和选择逻辑；新增 `monthSelection="drilldown"` 让 DatePicker 在日期模式下点选月份后进入日期面板，Calendar 自身的默认 browse 行为保持原契约。

## 替换方式

| 框架    | Trigger                                       | 容器                                             | 独立逻辑                           |
| ------- | --------------------------------------------- | ------------------------------------------------ | ---------------------------------- |
| React   | children 接收 props/ref/state                 | containerRender(children, state)                 | useDatePicker / useRangePicker     |
| Vue     | 默认 scoped slot 接收 props/ref/state         | Root 的 container slot                           | useDatePicker / useRangePicker     |
| Solid   | children 接收响应式 props/ref/state           | containerRender(children, state)                 | useDatePicker / useRangePicker     |
| Svelte  | children snippet 接收 props/action/state      | Root 的 container snippet                        | useDatePicker / useRangePicker     |
| Angular | Trigger 的 TemplateRef 接收 state/trigger/ref | Root 的 container TemplateRef 接收 state/content | DatePickerState / RangePickerState |

替换 Calendar 时，可以替换 Panel 内部内容，或直接消费公开逻辑绘制自己的面板。替换容器时，容器负责显示、定位、焦点和关闭事件，将关闭请求传回 `setOpen(false)`；日期选择规则继续由同一个 core 执行。

## UI 封装边界

后续 `ui/date-picker` 的 `DatePicker`／`RangePicker` 只组装 Root、Trigger、Content、Panel 和 Footer，提供原生 slot/snippet/TemplateRef 等替换入口。UI 将业务配置原样交给 Primitive，不创建 value、pendingValue 或 open 的第二份状态，不解析日期、不判定 clear/confirm、不排序端点、不通过监听补做确认或关闭。

五框架已新增 UI DatePicker／RangePicker，只组装上述 Primitive。默认 Footer 由 Primitive 提供 Today 和按确认规则出现的按钮；footer 未传使用默认内容，null 隐藏，有效内容替换。纯日期范围在双 Calendar 中暂存中间端点，每次打开重新记录本轮端点选择，旧值不代表本轮完成；默认首端选择后激活并聚焦另一端，本轮两端完整且有效后提交，allowEmpty 允许缺省的端点仍可省略；needConfirm=true 时等待整体确认。Vue／Svelte 的容器入口现已提供可复用的默认内容。

开始与结束输入分别激活对应端点。日期时间的单 Calendar + TimePicker、端点独立时间和逐端点确认留待 TimePicker 重构；本版本不提供 showTime 或 selectionMode。五框架 UI／Primitive 示例、文档、API 和 Preview 注册已同步，React 实际示例页增加 UI 场景。

## 验证范围

本轮执行源码语法解析、导入／导出解析、Angular 模板语法解析，以及旧 API、品牌命名与文件长度扫描。没有编写测试、调用浏览器、运行 typecheck、lint、build 或 format。源码统一与运行时验收分开报告，不将静态检查作为五框架交互或视觉完全一致的证明。

## 安全组合 props 与结构化样式

安全组合配置已统一：inputProps 提供输入外观和安全原生属性，popoverProps 提供定位/容器/关闭/挂载及 root 样式，calendarProps 提供展示文字、cellRender 和七个结构化部件。三者不能拥有第二份值、面板、日期约束或内部事件。Root 的 classNames/styles 用于 separator、panelGroup、多选标签及默认 Footer。默认、结构化、显式原生配置依次合并；UI 与 Primitive 使用同一套部件和样式。

UI 不再提供 triggerProps/contentProps/panelProps/footerProps；输入配置迁入 inputProps，浮层配置迁入 popoverProps，日历配置迁入 calendarProps，Footer 样式迁入 classNames/styles。底部内容继续使用 footer。
