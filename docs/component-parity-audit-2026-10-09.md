# 五框架一致性复核记录（2026-10-09）

本次范围取自 docs/api/ui 的 23 个已重构组件，涵盖 React、Vue、Solid、Svelte、Angular 的 Primitive、UI、组件逻辑层、公共框架能力、示例及 API。各组件同等要求，不按优先级排除任何组件。

## 当前结论与覆盖边界

已完成全范围入口、文件、场景目录及 API 示例顺序扫描，并修复本轮确认的问题。**尚不能宣称 23 个组件的全部实现和示例正文完全一致**：目录及公开名称一致不代表所有业务分支一致。以下表格明确区分结构覆盖与行为核对，未核对项目不得当作通过。

- 230 个组件公开入口（23 × 2 层 × 5 框架）解析成功，docs 声明的组件名称可从对应入口具名导入。
- 952 个组件族顶层实现文件、2032 个示例主文件进入目录扫描。
- manifest 中 400 个同层场景，对应 2000 个框架场景实例；没有缺失场景，API demos 的 id 和顺序与 manifest 一致。
- Card styling/surface、Progress compound/custom-style、Radio button 存在五框架同步的未注册示例；Solid Separator 的 demos 为辅助模块。额外文件没有被直接判定为业务错误，也没有删除。
- 上述数量不包含对 400 个场景正文、全部 hooks 和每个行为分支的完整证明。前轮 A–K 已覆盖的源码修复保留，但仍不能替代本轮完整逐项核对。

| 组件         | Primitive 场景 | UI 场景 | 本次覆盖状态                                                                             |
| ------------ | -------------: | ------: | ---------------------------------------------------------------------------------------- |
| alert        |              7 |       8 | 入口及场景目录一致；未完成全部行为分支和示例正文的逐项核对                               |
| anchor       |              8 |       9 | 入口及场景目录一致；未完成全部行为分支和示例正文的逐项核对                               |
| aspect-ratio |              3 |       3 | 入口及场景目录一致；未完成全部行为分支和示例正文的逐项核对                               |
| avatar       |             12 |      11 | 入口及场景目录一致；未完成全部行为分支和示例正文的逐项核对                               |
| badge        |             11 |      14 | 入口及场景目录一致；未完成全部行为分支和示例正文的逐项核对                               |
| button       |             11 |      11 | 入口及场景目录一致；未完成全部行为分支和示例正文的逐项核对                               |
| card         |              5 |       6 | 入口及场景目录一致；未完成全部行为分支和示例正文的逐项核对                               |
| checkbox     |             10 |      11 | 入口及场景目录一致；未完成全部行为分支和示例正文的逐项核对                               |
| empty        |              4 |       5 | 入口及场景目录一致；未完成全部行为分支和示例正文的逐项核对                               |
| input        |             11 |      12 | 入口及场景目录一致；未完成全部行为分支和示例正文的逐项核对                               |
| input-number |             10 |      11 | 入口及场景目录一致；已核对状态、格式化、清除、步进、键盘和逻辑入口，运行时待验证         |
| kbd          |              4 |       4 | 入口及场景目录一致；未完成全部行为分支和示例正文的逐项核对                               |
| popover      |              8 |       9 | 入口及场景目录一致；未完成全部行为分支和示例正文的逐项核对                               |
| progress     |             14 |      15 | 入口及场景目录一致；未完成全部行为分支和示例正文的逐项核对                               |
| radio        |              6 |       7 | 入口及场景目录一致；未完成全部行为分支和示例正文的逐项核对                               |
| select       |             17 |      17 | 入口及场景目录一致；已核对值展示、标签数量、面板扩展和部分事件转发，完整属性契约仍待核对 |
| separator    |              7 |       7 | 入口及场景目录一致；未完成全部行为分支和示例正文的逐项核对                               |
| skeleton     |              6 |       9 | 入口及场景目录一致；未完成全部行为分支和示例正文的逐项核对                               |
| slider       |             10 |      11 | 入口及场景目录一致；未完成全部行为分支和示例正文的逐项核对                               |
| spinner      |              4 |       5 | 入口及场景目录一致；未完成全部行为分支和示例正文的逐项核对                               |
| switch       |             10 |      11 | 入口及场景目录一致；未完成全部行为分支和示例正文的逐项核对                               |
| tag          |              6 |       7 | 入口及场景目录一致；未完成全部行为分支和示例正文的逐项核对                               |
| tooltip      |              6 |       7 | 入口及场景目录一致；未完成全部行为分支和示例正文的逐项核对                               |

## 已修复问题及依据

### 公共规范

AGENTS.md 新增“五框架实现、示例与 API 一致性门禁”：同一输入、状态和事件序列必须有相同的分支、结果及通知时机；默认值、空值、受控状态、取消、禁用、样式合并、原生属性、引用及逻辑入口都在核对范围内。仅允许框架响应绑定、DOM 获取、生命周期、slot/snippet/content projection 等原生表达不同。示例数据、初始值、内容、可操作控件和反馈相同，API 遵循现有结构和顺序。

### 入口、文档及示例

- Svelte 的 Alert、AspectRatio、Card、Empty、Kbd、Select、Separator、Spinner 补齐显式具名入口，package exports 指向对应入口；同步修正仍使用公开默认导入或旧部件路径的消费者。
- 18 份 API 的 demos 与共享 manifest 对齐；Empty 的独立无障碍章节并入现有 API 区块，23 份组件正文的核心章节顺序一致。
- 补齐 Solid/Svelte Primitive Card direction，十份 Card direction 示例统一数据、文本、结构和样式；Angular 同步真实插槽内容和裸 selector。
- Vue InputNumber 的数值初始值改为绑定表达式，避免字符串进入数值逻辑；同层 basic 的布局参数统一。
- 示例源码生成器支持 UI 示例对 Primitive 示例的公开路径再导出，并保留其实际逻辑层导入；使用逐组件过滤生成，避免覆盖并行 Calendar/DatePicker 工作。

### InputNumber：Primitive、UI、逻辑入口

- 控制与非控制判断、初始化 undefined 语义、动作返回值、typing/disabled/readOnly/parseDraft 能力对齐。
- 格式化订阅限定外部受控值和 formatter 更新；内部提交直接更新文本，避免各框架副作用时序造成二次格式化。
- Vue/Solid/Svelte 可选字段与 exactOptionalPropertyTypes 一致；Solid/Svelte 原生输入 size 类型与组件语义 size 分离。
- React blur/custom-logic 回调传原始 DOM 事件；取消、禁用、只读和步进规则沿用共享 core 守卫。
- 五框架操作区预留空间使用共享样式，定位改为逻辑方向 end/border-s，兼容 RTL。
- Svelte UI 的 size/variant/root style 与 Vue root style 透传补齐；Angular UI 消费 Primitive Root，移除重复状态及额外包装节点。
- Vue/Svelte Control 补齐核心输入元素引用和 focus/blur/select 的原生方法。

### Select：Primitive、UI、共享算法

- core 增加 getSelectValueLayout；五框架消费同一标签数量、溢出数量、单选/搜索/占位分支。Svelte/Angular 补齐公开 SelectValue。
- Vue 自定义 tag 插槽只在确实提供时转发，避免空插槽抹去默认标签；UI 的 option/loading/tag 等转发补齐。
- Vue/Svelte/Angular UI 补齐 getPopupContainer；Vue 去掉重复 openChange 通知来源。
- Angular 原先声明但未消费 inputProps，现在透传已声明的 name/autocomplete/inputmode/aria-label/style/class；Vue inputProps 移到真实输入，Solid/Svelte input class 合并。
- Svelte UI 补齐原生容器属性类型及向 Trigger 的透传，示例传入的 class 不再被丢弃。
- Vue/Svelte/Angular 增加完整菜单包装/替换能力及 close，分别使用 scoped slot、Snippet、TemplateRef；同层 popup-render-demo 改为消费完整菜单扩展，API 记录原生表达。
- Vue/Svelte/Angular 键盘方法补齐 defaultPrevented 守卫；Svelte 在内部键盘行为前调用原生外部处理器。

### Solid 原生事件

确认 Input、InputNumber、Radio、Anchor、Select 等拦截逻辑仅调用函数，漏掉 Solid 原生事件元组，调用方的取消行为可能失效。公共 callEventHandler 同时支持函数及 [handler, data]，对应已确认调用点统一复用，并通过 package exports 暴露。只修改 docs 范围内组件，不扩展到并行组件任务。

## 仍需逐项完成的核对

1. InputProps 已统一透传到真实输入元素；五框架现已支持相同的 classNames/styles 语义部位（root、control、prefix、suffix、clear 等）并同步 semantic-styles 示例；本轮又统一了 inputProps.style 的 root 合并位置，避免样式错误落到真实 input。
2. Select 的 focus/pointer/input/click 事件已逐项补齐主要入口，但跨框架事件取消和调用顺序仍需继续逐项核对；只加键盘守卫不代表所有事件路径通过。
3. 其余组件的全部条件分支、框架公共 hooks、原生引用与属性透传，以及 400 个示例正文尚需逐项记录证据。当前目录扫描结果不能替代这一工作。
4. 部分 API 部件 props 表为空；入口名称检查不证明 API 的每个参数、默认值、事件和可独立消费逻辑均完整。
5. 运行时未验证：特别是新增面板模板/插槽、Angular Root 继承、输入元素引用和事件顺序，仅有源码证据及语法检查。

以上项目同等要求，均未标记完成。

## 本轮静态验证

本轮修改清单 162 个文件。TypeScript/Vue/Svelte/MJS 源码解析、JSON 解析、相对导入存在性、公开包导入解析、修改文件品牌名称及代码行数扫描均无报错；Angular 修改模板 10 份解析通过。公开包导入检查 161 处、相对导入检查 115 处。23 个文档组件逐个过滤生成示例源码，后续对 Card、Select、InputNumber 的修改再次生成。

遵循用户限制：没有新增或执行测试代码，没有 UI/MCP/浏览器手动测试，没有启动服务，没有运行 typecheck、lint、build、format，没有子代理，没有读取 trash 路径。静态解析通过不能当作编译或运行时通过。

前轮问题与修复见 [前轮复核](./component-parity-reaudit-2026-10-08.md) 和 [前轮修复记录](./component-parity-fixes-2026-10-09.md)。

框架表达参考：[Angular 继承](https://angular.dev/guide/components/inheritance)、[Angular Material Table 源码](https://raw.githubusercontent.com/angular/components/main/src/material/table/table.ts)、[Solid 事件](https://docs.solidjs.com/concepts/components/event-handlers)、[Vue Slots](https://vuejs.org/guide/components/slots.html)、[Svelte Snippets](https://svelte.dev/docs/svelte/snippet)。
