# docs 已重构组件：五框架一致性修复记录

日期：2026-10-08。范围为 docs 当前已重构的 23 个组件族，包含 Primitive、UI、相关 core 和实际公开入口。本记录替换此前的待修复报告；此前列出的 21 组问题已全部落实源码修改，不再按优先级分批留下待办。

状态“已修复”表示报告对应的源码缺口已处理并做源码复核，不表示已执行运行验证。按照仓库约束，本次没有写测试，没有运行浏览器/MCP/UI 手动测试，也没有运行 typecheck、lint、build、format 或启动服务。

## 逐组件记录

| 组件 | 源码状态 | 修改或复核结果 | 当前源码 |
| --- | --- | --- | --- |
| Alert | 已修复 | Solid 关闭进入响应式隐藏分支；Svelte 原生样式与 root 样式用分号合并。 | [关闭条件](D:/code/fex-design/packages/@fex-design/components/solid/src/ui/alert/index.tsx:56) |
| Anchor | 已修复 | Solid 受控 keys 同步 controller；Vue/Solid/Svelte/Angular 注册项随 value、target、offset 和父项身份更新并清理旧项。 | [受控同步](D:/code/fex-design/packages/@fex-design/components/solid/src/primitive/anchor/create-anchor.ts:55)、[注册更新](D:/code/fex-design/packages/@fex-design/components/angular/src/primitive/anchor/anchor.ts:239) |
| AspectRatio | 已修复 | Solid 保留字符串与对象 style，用户声明仍可覆盖比例样式。 | [样式合并](D:/code/fex-design/packages/@fex-design/components/solid/src/primitive/aspect-ratio/index.tsx:15) |
| Avatar | 已修复 | Vue 使用响应式图像请求 props；Solid 实际 img 透传请求属性；Svelte/Angular 预加载同步这些属性；Svelte Group 使用共享溢出归一化并跟踪实际子项变化。 | [图像加载](D:/code/fex-design/packages/@fex-design/components/vue/src/primitive/avatar/avatar-image.vue:16)、[数量归一化](D:/code/fex-design/packages/@fex-design/components/svelte/src/ui/avatar/avatar-group.svelte:38) |
| Badge | 已修复 | Solid 普通、独立指示器和附着模式均为响应式条件；offset 和 indicator 样式读取最新参数，原生 style 保留。 | [模式与样式](D:/code/fex-design/packages/@fex-design/components/solid/src/ui/badge/index.tsx:37) |
| Button | 已修复 | Angular UI 默认 type=button，显式原生 type 保持可用。 | [默认按钮类型](D:/code/fex-design/packages/@fex-design/components/angular/src/ui/button/button.ts:30) |
| Card | 已修复 | Svelte header 区分字符串和 snippet；原生 style 合并为有效 CSS 声明。 | [Header 分支](D:/code/fex-design/packages/@fex-design/components/svelte/src/ui/card/card.svelte:77) |
| Checkbox | 已修复 | React 使用真实 controller 和实时 options，移除不存在的方法；Angular Group 在输入绑定完成后初始化；Vue/Angular 单项默认值只初始化一次。 | [React controller](D:/code/fex-design/packages/@fex-design/components/react/src/primitive/checkbox/checkbox-group.tsx:33)、[Angular 初始化](D:/code/fex-design/packages/@fex-design/components/angular/src/primitive/checkbox/checkbox.ts:66) |
| Empty | 已修复 | Svelte style 改为 CSS 字符串；公开入口保留具名导出，示例和组件说明同步具名导入。 | [样式合并](D:/code/fex-design/packages/@fex-design/components/svelte/src/ui/empty/empty.svelte:46)、[公开入口](D:/code/fex-design/packages/@fex-design/components/svelte/src/ui/empty/index.ts:1) |
| Input | 已修复 | React 保留用户 type；Vue Search 先调用原键盘回调并检查取消；Angular Password/Search 绑定 name 和 autocomplete；Solid/Svelte 原生根样式保留。 | [type 转发](D:/code/fex-design/packages/@fex-design/components/react/src/ui/input/index.tsx:73)、[事件取消](D:/code/fex-design/packages/@fex-design/components/vue/src/ui/input/input-search.vue:33) |
| InputNumber | 已修复 | Vue/Solid/Svelte/Angular 公开逻辑 API 根据 value 推断受控，并允许 controlled 显式覆盖；Solid/Svelte/Angular commit 结束编辑状态。 | [受控与提交](D:/code/fex-design/packages/@fex-design/components/solid/src/primitive/input-number/use-input-number.ts:49) |
| Kbd | 已复核 | 五框架 Primitive/UI 的基础展示、Group 和原生能力未发现本报告范围内需要修改的逻辑问题。 | [具名入口](D:/code/fex-design/packages/@fex-design/components/react/src/ui/kbd/index.tsx:1) |
| Popover | 已修复 | React 把触发子元素原属性、事件和 ref 交给 Primitive 合成，保留取消能力；公共 ref 合并支持 React 19 清理回调。 | [原触发属性](D:/code/fex-design/packages/@fex-design/components/react/src/ui/popover/index.tsx:38) |
| Progress | 已修复 | Svelte Primitive Root 接收 effectiveValue，汇总显示、上下文和 ARIA 使用同一值。 | [汇总值转发](D:/code/fex-design/packages/@fex-design/components/svelte/src/ui/progress/progress.svelte:102) |
| Radio | 已修复 | Angular 输入绑定完成后初始化 selection；展示、默认选择和 previousValue/changedValues 使用同一状态。 | [默认选择初始化](D:/code/fex-design/packages/@fex-design/components/angular/src/primitive/radio/radio.ts:77) |
| Select | 已修复 | 五框架禁用入口与弹层对齐；Vue/Solid/Svelte 快照同时读取外部控制值和 core 通知；Angular 初始化默认值并刷新外部输入；React/Angular 完整转发弹层参数；补齐 Vue 默认过滤和 Vue/Svelte 选中、搜索订阅。 | [共享禁用逻辑](D:/code/fex-design/packages/@fex-design/core/src/select/create-select-controller.ts:67)、[Angular 输入初始化](D:/code/fex-design/packages/@fex-design/components/angular/src/primitive/select/select-root.ts:67)、[Svelte 响应快照](D:/code/fex-design/packages/@fex-design/components/svelte/src/primitive/select/select-root.svelte:129) |
| Separator | 已复核并修正入口 | 五框架方向和语义分支一致；清除 Svelte UI 默认导出，同步两个示例的具名导入。 | [公开入口](D:/code/fex-design/packages/@fex-design/components/svelte/src/ui/separator/index.ts:1) |
| Skeleton | 已修复 | Angular 自定义 placeholder 不再被骨架宿主 aria-hidden 隐藏。 | [占位语义](D:/code/fex-design/packages/@fex-design/components/angular/src/ui/skeleton/skeleton.ts:38) |
| Slider | 已修复 | 五框架共用默认 step 与 dots 算法；core 和 UI 保留空数组、零 Thumb 和有效的空 Range；删除结果不再变成 undefined，API 文档同步空值协议。 | [统一 dots](D:/code/fex-design/packages/@fex-design/core/src/slider/utils.ts:6)、[共享空值协议](D:/code/fex-design/packages/@fex-design/core/src/slider/create-slider-controller.ts:29) |
| Spinner | 已修复 | Solid 三态模式动态切换；Angular 补齐 undefined 独立指示器；React 转发原生属性与 ref；各相关适配保留原生样式。 | [Solid 模式](D:/code/fex-design/packages/@fex-design/components/solid/src/ui/spinner/index.tsx:30)、[Angular 三态](D:/code/fex-design/packages/@fex-design/components/angular/src/ui/spinner/spinner.html:1) |
| Switch | 已修复 | Angular Primitive/UI defaultChecked 仅初始化；Svelte 样式使用分号合并。 | [一次性默认值](D:/code/fex-design/packages/@fex-design/components/angular/src/primitive/switch/switch.ts:51) |
| Tag | 已修复 | Svelte 原生与语义样式之间补齐 CSS 分隔符；关闭仍遵守通知契约。 | [样式合并](D:/code/fex-design/packages/@fex-design/components/svelte/src/ui/tag/tag.svelte:41) |
| Tooltip | 已修复 | React 合成原事件与 ref；Solid 传入响应式 state/触发属性，保留原描述 ID、清理引用并尊重事件取消；Angular defaultOpen 在输入绑定后初始化。 | [响应状态与描述](D:/code/fex-design/packages/@fex-design/components/solid/src/primitive/tooltip/tooltip-trigger.tsx:59)、[默认打开](D:/code/fex-design/packages/@fex-design/components/angular/src/primitive/tooltip/tooltip-root.ts:72) |

## 共用边界

- Angular Anchor、Avatar、Checkbox、Radio、Switch 的重复 index 实现统一成显式具名入口，避免同一组件因入口不同而使用不同类、DI token 或逻辑。
- Angular SelectRoot 独立到所属组件目录的 select-root.ts，保留既有具名出口；订阅在初始化阶段使用组件自己的 DestroyRef 清理。
- Solid 字符串/对象样式合并沉淀到公开 primitive helper，复用于涉及的组件，不再在每处丢弃合法字符串样式。
- React ref 合并在卸载时执行原 callback ref 返回的清理函数，没有清理函数的 ref 仍收到 null。
- Checkbox core 在非受控模式下缓存禁用状态的派生快照，避免 React 外部订阅在 disabled 变化后反复读取新对象。

## Slider 空值约定

省略 value/defaultValue 时仍提供默认节点。显式传入空数组，或者 editable 且 minCount=0 删除最后一个节点后，保留空数组并显示零个 Thumb；不会自动恢复为 [min]。该删除事件同样返回空数组，包含原本使用标量输入的情况。空 Range 使用有限位置值；空范围不可执行范围拖动。

## 源码检查记录

修改文件的 TypeScript/TSX 语法解析、Vue/Svelte 源文件解析、JSON 解析、相对模块路径、公开子路径及目标文件检查通过。修改范围未发现品牌前缀；代码文件实质行数未超过 300 行。具名入口变更的现有示例调用已同步。Kbd 与 Separator 的 Primitive/UI 也重新逐框架阅读。

本次没有运行类型检查或实际交互，因此类型系统、构建、渲染和交互仍需要后续允许的运行验证。未将这些未执行项目记为通过。仓库中并行出现的 Calendar/DatePicker 等改动不属于本次修复。
