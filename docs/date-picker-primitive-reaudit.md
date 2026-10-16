# DatePicker 五框架条件与事件审计

默认 Input 固定 `readOnly=true`，只展示选择值并触发面板，不支持手动输入或输入掩码。DatePicker／RangePicker 不提供 status 或可配置的 readOnly；format 仅用于展示，选择动作由 Calendar/core 完成。

本次范围是 React、Vue、Solid、Svelte、Angular 的 DatePicker／RangePicker Primitive、组件逻辑适配、公开入口、默认 Input／Popover／Calendar 依赖边界及现有调用。目标是相同输入与事件采用同一业务规则；原生响应式绑定、引用、生命周期和内容传入方式按框架表达。

下面的“共用”表示五框架调用同一个 core 实现；“对齐”表示逐项检查并修正了适配器或模板分支。它们是源码审计结论，尚未通过运行时交互验证。

## 复核发现及修正

| 原差异 | 根因 | 当前处理 |
| --- | --- | --- |
| Vue 缺省 Boolean 与显式 false 无法稳定区分 | vnode 参数存在性不是响应式来源 | 可选 Boolean 原生声明保留 undefined，再统一删除缺省配置 |
| popup 位置与偏移覆盖规则不同 | 各 Root 独立填写默认值；部分无结构化配置 | 全部用 getDatePickerPopoverOptions；支持 popoverProps |
| 范围输入重复开面板或跳过外层事件 | 内层和外层同时调用动作；Angular 内层停止冒泡 | 内层只处理焦点，外层处理一次 click；统一识别 start/end |
| 提供空内容后意外回退默认内容 | truthy 判定、slot 原生 fallback、snippet 存在性混用 | 自定义渲染入口以是否提供为准；提供空 renderer 不回退默认 Input／Panel |
| 替换容器后关联外部 Popover，或忽略新的 Popover | 仅按是否存在 Popover／是否自定义容器判断 | 记录 Root 外部 Popover，排除它；保留替换容器内部 Popover 的绑定 |
| Angular 替换容器后默认 Popover 仍可能关闭日期状态 | 默认 host directive 保持活动 | 替换容器时默认 Popover 保持关闭和禁用，使用新的容器 |
| 嵌套 DatePicker／RangePicker 的 Header／Footer 找错 Root | 固定先找 DatePicker 再找 RangePicker | 两种 Root 提供同一私有 owner 作用域，采用最近 Root |
| Today 各自设置日期、面板与 hover | 五份动作代码 | 统一调用 core.today，原子更新浏览日期、默认面板与 hover |
| HeaderLabel 有的删除节点、有的隐藏 | 框架模板各自处理可见性 | 同一 labelParts 规则，保留节点并设置 hidden |
| 多选数组调换顺序后不更新 | 使用集合相等，忽略显示顺序 | 按长度和逐项日期身份比较，顺序属于值语义 |
| format 为空时有值却不能清除 | clear 条件依赖格式化文本 | core.canClear 判断语义选择值 |
| 重复日期产生相同 tag key | key 只包含日期身份 | 公共标签模型附加同值出现序号，五框架使用相同 key |
| 默认 Panel 可覆写 Root 约束或月面板行为 | props 覆盖顺序不同 | Root 的值、约束、panel 和 drilldown 行为统一覆盖默认 Calendar 绑定 |
| Svelte RangePickerPanel 未转发原生属性 | wrapper 解构后遗漏 rest | 原生属性透传到默认 Panel |
| 原生事件取消／按钮禁用后仍执行动作 | 不同框架事件处理顺序和 guard 不同 | 调用方事件在动作前；公共 isPickerActionBlocked 检查取消与当前按钮 disabled |

## 条件与状态矩阵

| 输入／条件 | 统一结果／入口 | React | Vue | Solid | Svelte | Angular |
| --- | --- | --- | --- | --- | --- | --- |
| 可选参数缺省或 undefined | definedPickerOptions 删除字段 | 共用 | 共用 | 共用 | 共用 | 共用 |
| false、0、空字符串、空数组 | 保留显式值，不用 truthy 补默认值 | 共用 | 共用 | 共用 | 共用 | 共用 |
| value 未提供／null／[] | 未提供走非受控默认；null 与 [] 是 DatePicker 显式受控值 | 共用 | 共用 | 共用 | 共用 | 共用 |
| open 未提供／false | 未提供为非受控；false 为受控关闭 | 共用 | 共用 | 共用 | 共用 | 共用 |
| defaultValue／defaultOpen 后续更新 | 仅创建时读取，不重新初始化 | 共用 | 共用 | 共用 | 共用 | 共用 |
| 初始化／参数同步 | 不通知 change／openChange | 共用 | 共用 | 共用 | 共用 | 共用 |
| 受控动作 | 通知请求，保持受控值／open，等待外部更新 | 共用 | 共用 | 共用 | 共用 | 共用 |
| 相同语义选择值 | 不重复通知 change；多选按顺序比较 | 共用 | 共用 | 共用 | 共用 | 共用 |
| 单选、不需确认 | 归一化、校验、提交，随后请求关闭 | 共用 | 共用 | 共用 | 共用 | 共用 |
| multiple、needConfirm 缺省 | multiple=false；needConfirm 默认跟随 multiple | 共用 | 共用 | 共用 | 共用 | 共用 |
| multiple、显式 needConfirm=false | 选择／移除即时提交，保持打开 | 共用 | 共用 | 共用 | 共用 | 共用 |
| needConfirm=true | select 更新 pending；confirm 提交；cancel 丢弃草稿 | 共用 | 共用 | 共用 | 共用 | 共用 |
| clearable=false | 默认清除入口隐藏；显式 clear 动作仍可消费 | 共用 | 共用 | 共用 | 共用 | 共用 |
| clear、包括确认模式 | 即时提交 null／[]／{}，不请求关闭 | 共用 | 共用 | 共用 | 共用 | 共用 |
| disabled | 阻止打开、选择、清除、移除和确认；默认 Input 始终只读，不提供 readOnly 选项 | 共用 | 共用 | 共用 | 共用 | 共用 |
| 单选输入清空／范围端点清空 | 单选即时清除；范围删除当前端点，遵循确认模式 | 共用 | 共用 | 共用 | 共用 | 共用 |
| 范围端点／order | 每次打开重置本轮选择记录，首端选完激活另一端；草稿保留端点，order 默认 true，在提交和 hover 高亮时排序 | 共用 | 共用 | 共用 | 共用 | 共用 |
| 范围确认／allowEmpty | 至少一个端点，缺失端点需允许为空，已有端点需合法 | 共用 | 共用 | 共用 | 共用 | 共用 |
| minDate／maxDate／disabledDate | Calendar 选择和确认执行共同约束 | 共用 | 共用 | 共用 | 共用 | 共用 |
| open／close | 同一 pending、原文本、hover、panel、activePart 重置协议 | 共用 | 共用 | 共用 | 共用 | 共用 |
| 标签及溢出数量 | getDatePickerTagItems；maxCount 无默认值，省略时全部展示并换行，显式设置才折叠，0 保留 | 共用 | 共用 | 共用 | 共用 | 共用 |
| multiple 标签区／placeholder | triggerView.showTags／hasTags 驱动相同分支 | 对齐 | 对齐 | 对齐 | 对齐 | 对齐 |
| clear 与 suffix 二选一 | 只消费 core.canClear；无业务条件重算 | 对齐 | 对齐 | 对齐 | 对齐 | 对齐 |
| range placeholder／separator | ?? 默认，空字符串保留 | 共用 | 共用 | 共用 | 共用 | 共用 |
| date 面板月导航／周头 | getDatePickerPanelView，仅 date 面板显示 | 共用 | 共用 | 共用 | 共用 | 共用 |
| year／month 标题 | getDatePickerHeaderLabelParts；隐藏采用 hidden | 对齐 | 对齐 | 对齐 | 对齐 | 对齐 |
| 1／2 个范围面板 | getVisibleRangePanelViewDates；panelCount 默认 2 | 共用 | 共用 | 共用 | 共用 | 共用 |
| 自定义 Trigger／Panel／容器 | 已提供 renderer 则采用它；不判断输出内容是否为空 | 对齐 | 对齐 | 对齐 | 对齐 | 对齐 |
| click／focus／取消事件 | 调用方优先；取消后不执行内置动作；focus 使用所属 Popover | 对齐 | 对齐 | 对齐 | 对齐 | 对齐 |
| confirm／cancel／today／preset | 按钮 type=button；统一 guard；委托 controller 动作 | 对齐 | 对齐 | 对齐 | 对齐 | 对齐 |
| Trigger ARIA／data 状态 | aria-haspopup=dialog；expanded 与 data-state 读取同一 open | 对齐 | 对齐 | 对齐 | 对齐 | 对齐 |

null 不是所有参数的合法值：RangePicker.value 的清空值为 {}，不接受 null；Boolean／数量等按声明类型传入。表中的显式空值规则针对相应 API 的合法输入。

JSX 的自定义 children、Vue slot、Svelte snippet、Angular TemplateRef 表达不同。传入一个返回空内容的 renderer 表示主动替换；普通 prefix／suffix 的值以 nullish 缺省判断，0 与空字符串保留。Angular 普通文字部件使用原生 content projection。

## 代码与 UI 边界

业务状态和动作统一由 [session](../packages/@fex-design/core/src/date-picker/session.ts)、[DatePicker controller](../packages/@fex-design/core/src/date-picker/create-date-picker.ts)、[RangePicker controller](../packages/@fex-design/core/src/date-picker/create-range-picker.ts) 执行。公共条件在 [view](../packages/@fex-design/core/src/date-picker/view.ts)、[panel](../packages/@fex-design/core/src/date-picker/panel.ts)、[input](../packages/@fex-design/core/src/date-picker/input.ts)。框架适配器只同步原生配置、订阅 core 和暴露原生响应式状态。

Angular 原生事件通过 listenNativeEvent 在视图原生绑定建立后注册，并随 DestroyRef 清理；避免宿主业务处理先于调用方原生事件。[Angular afterNextRender](https://angular.dev/api/core/afterNextRender)

UI 封装采用 Root → Input Trigger + Popover Content → Calendar Panel + Footer。UI 只处理组装、布局、默认部件和 props／slot 转发。五框架已新增 ui/date-picker。默认 Footer 由 Primitive 根据共同 footerView 组装 Today／Cancel／Confirm。UI 不判断 needConfirm、canClear、disabledDate，不计算范围，不执行提交与关闭流程，不创建第二份状态，也不通过监听连接业务动作。

UI 交付阶段进一步统一了范围提交：中间端点保留为 pendingValue；无需确认时完整且有效才通知，确认模式等待 confirm；显式 clear 仍即时提交空值。Footer undefined/default、null/hidden、有效内容/custom 的判定通过共同 getPickerContentKind 处理。默认输入的 value、placeholder、aria-invalid 等由共同属性策略交给 Picker 绑定，原生扩展属性不会覆盖这些派生字段。

日期时间采用两个端点触发位置、一个复用的日期时间面板与独立端点时间；具体 TimePicker 和端点确认动作本轮延后。本版本仅提供纯日期双 Calendar，不新增 selectionMode 或尚未实现的 showTime。

## UI 包装复核（2026-10-14）

本轮再次对比五框架的 UI props 转发和 Primitive 条件分支，发现并修正以下源码差异；共同 core 并不能自动保证包装层一致。

| 复核项 | 原差异 | 修正后的共同规则 |
| --- | --- | --- |
| 顶层与 triggerProps 的尺寸、占位符、输入属性 | Vue 用顶层 undefined 覆盖分组值；Angular 分组只有 class/style | 顶层非 nullish 值优先，缺省时读取 triggerProps，最后使用 Primitive 默认值；空字符串保留 |
| 分组与顶层 style | Solid 替换整份分组样式；Angular 顶层样式只停留在外层宿主 | 先分组后顶层，合并声明；同名样式由顶层覆盖。Solid 复用 mergeStyle，Angular 在原生 style 绑定提交后读取并转发 |
| footer 与 footer slot/template | Vue slot 覆盖显式 footer，Angular 使用显式 footer | footer 不是 undefined 时采用显式内容；null 隐藏，undefined 时使用 slot/template，否则默认 Footer |
| Angular 原生属性、事件 | 分组无法扩展 id、ARIA、事件等 | Trigger、Content、Panel、Footer 转发原生属性；日期状态及保留的 data-slot/ARIA 由 Primitive 管理 |
| Angular prefix/suffix | 只能传文字 | 支持文字、数字和 TemplateRef；UI 可使用 #prefix/#suffix，RangePicker 仅 suffix |
| Angular 输入原生属性 | 重复 DOM 属性/监听同步，ARIA false 被删除 | Input 与组装部件复用 native-attributes；ARIA/data false 保留为文字，属性撤销及监听清理共用 |

五框架适配器均创建相同的 createDatePicker/createRangePicker；选择、约束、排序、端点推进、草稿、确认/取消、清除和回调去重不存在 UI 层的另一个业务实现。UI 仅进行部件选择、配置合并和原生转发。框架的组件宿主、模板、ref/action/DI 和响应式同步边界允许采用原生表达。

原生事件转发使用 Angular Renderer2 及生命周期清理；点击/焦点回调在 Trigger 事件方法中先执行，再读取 defaultPrevented 决定是否调用共同动作。[Angular Renderer2](https://angular.dev/api/core/Renderer2)

## 验证与未验证范围

已进行源码语法解析、导入／导出解析、Angular 模板语法解析、词法引用候选扫描、旧 API 扫描、公开品牌前缀和文件长度检查。DatePicker 家族源码没有 allowClear 或显式 defaultValue: undefined。

按仓库规则，没有编写测试，没有触发浏览器／MCP／UI 手动检查，也没有运行 typecheck、lint、build、format。尚未验收原生响应式更新时间、焦点恢复、事件绑定顺序、portal、键盘行为、实际 DOM 与视觉；这些不能由本次静态检查证明。此文记录的是源码规则和分支收敛，不是运行时完全一致的验收声明。

## 安全组合契约更新

安全组合配置已统一：inputProps 提供输入外观和安全原生属性，popoverProps 提供定位/容器/关闭/挂载及 root 样式，calendarProps 提供展示文字、cellRender 和七个结构化部件。三者不能拥有第二份值、面板、日期约束或内部事件。Root 的 classNames/styles 用于 separator、panelGroup、多选标签及默认 Footer。默认、结构化、显式原生配置依次合并；UI 与 Primitive 使用同一套部件和样式。

UI 不再提供 triggerProps/contentProps/panelProps/footerProps；输入配置迁入 inputProps，浮层配置迁入 popoverProps，日历配置迁入 calendarProps，Footer 样式迁入 classNames/styles。底部内容继续使用 footer。
通过共享白名单限制运行时转发；样式的展示上下文独立于 core 状态，样式更新不会创建或提交日期值。CalendarGrid 的 rowProps 保留原有布局和交互，默认 row/cell 布局由共享样式生成并直接应用到对应 Primitive，避免后代选择器压过用户部件类名。
