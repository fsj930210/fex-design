# 五框架组件一致性复查（2026-10-08）

2026-10-09 更新：以下为修复前的审计记录。A–K 已完成源码修改，修复范围和静态检查结果见 [修复记录](D:/code/fex-design/docs/component-parity-fixes-2026-10-09.md)。运行验证尚未执行。

本次复查仍限定于 docs 已重构的 23 个组件族及其 Primitive、UI、公共适配逻辑。结论：仍有 11 组源码可确认的问题，涉及 17 个组件族。以下问题同等处理，不分优先级；上一轮报告的“已修复”不能作为全部行为一致的验收结论。

本次只做源码检查，没有修改组件实现，没有编写测试、调用浏览器、启动服务或运行 typecheck、lint、build、format。已检查的 100 条公共导入均能定位到文件；这只说明该批导入可解析，不证明运行行为一致。未新增发现的组件也不等于已通过运行验证。

## 逐组件结果

| 组件 | 本轮确认的剩余问题 |
| --- | --- |
| Alert | Solid 丢弃字符串 style（G） |
| Anchor | Solid 丢弃字符串 style（G） |
| AspectRatio | Svelte UI 公开 Props 缺少原生属性和 children（K） |
| Avatar | Solid 丢弃字符串 style；Svelte AvatarGroup 缺少原生属性透传（G、K） |
| Badge | Svelte 样式字符串直接拼接，缺少声明分隔符（J） |
| Button | Angular loading 图标的 end 分支没有改变实际节点位置（F） |
| Card | Solid 将字符串 style 展开成字符索引对象（G） |
| Checkbox | Solid UI 覆盖调用方 style；Svelte CheckboxGroup 原生属性类型缺失（H、K） |
| Empty | Solid 将字符串 style 展开成字符索引对象（G） |
| Input | 本轮未新增确认问题 |
| InputNumber | Svelte UI 和 Primitive Root 捕获初始 props；Solid 丢弃字符串 style（A、G） |
| Kbd | 本轮未新增确认问题 |
| Popover | React 合并 ref 后不能正确处理挂载期间更换 ref（E） |
| Progress | 本轮未新增确认问题 |
| Radio | Solid 将字符串 style 展开成字符索引对象；Svelte RadioGroup 原生属性类型缺失（G、K） |
| Select | 本轮未新增确认问题 |
| Separator | 本轮未新增确认问题 |
| Skeleton | Vue 默认 loading 分支错误；Solid 同传字符串 style 和 styles.root 时丢弃后者（B、I） |
| Slider | 本轮未新增确认问题 |
| Spinner | Vue SpinnerContainer 丢失 undefined 模式（C） |
| Switch | Solid 丢弃字符串 style（G） |
| Tag | Solid 丢弃字符串 style（G） |
| Tooltip | Vue 可选 Boolean 覆盖 core 默认值；React 更换 ref 处理缺失（D、E） |

## 问题及证据

### A. Svelte InputNumber 的参数更新链路被截断

- [UI InputNumber](D:/code/fex-design/packages/@fex-design/components/svelte/src/ui/input-number/input-number.svelte:47) 和 [Primitive Root](D:/code/fex-design/packages/@fex-design/components/svelte/src/primitive/input-number/input-number-root.svelte:32) 都先声明 `componentProps = $props()`，再用普通 `let { ... } = componentProps` 解构。
- 第二次解构不是 `$props()` rune 声明，取出的 value、min、max、disabled、formatter、回调等是初始化时的值。后续控制器读取这些局部变量，不能读取父组件最新参数。添加 `state_referenced_locally` 忽略注释不会增加响应性。
- 触发条件：挂载后更换 value、disabled、范围或回调；同时影响 UI 与直接使用 Primitive Root。
- 修改方向：直接从 `$props()` 解构，或在适配器中持续访问 props 对象；初始受控模式判断与持续读取参数分别处理。
- 框架依据：[Svelte $props](https://svelte.dev/docs/svelte/$props)。本地安装的编译器 `VariableDeclaration.js` 也只在声明初始化表达式为 `$props` rune 时创建对应 props 绑定。

### B. Vue Skeleton 默认不显示骨架

- [Skeleton props](D:/code/fex-design/packages/@fex-design/components/vue/src/ui/skeleton/skeleton.vue:24) 仅为 avatar、paragraph、title 提供默认值，没有保留 loading 的 undefined。
- 模板在 `props.loading === false` 时显示正文。Vue 将未传入的 Boolean prop 转为 false，因此省略 loading 就直接进入正文分支。
- React/Solid 的判断均为仅在显式 false 时显示正文，undefined 时显示骨架；docs API 同样描述 false 才显示子内容。
- 修改方向：明确 loading 的默认语义，例如 true，或保留 undefined。

### C. Vue SpinnerContainer 独立指示器分支不可达

- [SpinnerContainer](D:/code/fex-design/packages/@fex-design/components/vue/src/ui/spinner/spinner-container.vue:17) 使用类型式 defineProps，没有为 spinning 设置 undefined 默认值。
- 模板依赖 `props.spinning === undefined` 选择独立 Spinner。未传 spinning 时 Vue Boolean casting 给出 false，进入内容容器分支，丢失独立指示器模式。
- [docs API](D:/code/fex-design/docs/api/ui/spinner.json:16) 明确约定 undefined、false、true 三种不同模式。
- 修改方向：保留 spinning 的三态。

### D. Vue Tooltip 的默认浮层行为与其他框架不同

- [UI Tooltip](D:/code/fex-design/packages/@fex-design/components/vue/src/ui/tooltip/tooltip.vue:25) 只保留 open、defaultOpen、disabled 的 undefined；[Primitive Root](D:/code/fex-design/packages/@fex-design/components/vue/src/primitive/tooltip/tooltip-root.vue:10) 也未保留其他可选 Boolean 的 undefined。
- 未传 avoidCollisions、lazyMount、destroyOnHidden 等属性时，被转换成 false 后经 `...props` 送入 core。
- [floating core](D:/code/fex-design/packages/@fex-design/core/src/floating/create-floating.ts:166) 默认启用碰撞规避；[presence core](D:/code/fex-design/packages/@fex-design/core/src/overlay/presence/create-presence.ts:29) 与 `lazyMount === false`、`destroyOnHidden === false` 分支有关。Vue 的隐式 false 改变了默认定位和挂载行为。
- Popover 已对同类属性设置 undefined 默认值，Tooltip 没有同步这一规则。
- 修改方向：UI 与 Primitive 两层均保留 core 所需的可选 Boolean 默认语义。
- B、C、D 的框架依据：[Vue Boolean casting](https://vuejs.org/guide/components/props.html#boolean-casting)。

### E. React 公共 ref 合并函数遗漏 ref 更换

- [useComposedRef](D:/code/fex-design/packages/@fex-design/components/react/src/hooks/use-composed-ref.ts:15) 用 useLatest 保存最新 refs，却通过 useMemoizedFn 返回始终不变的 DOM ref 回调。
- 同一已挂载节点从 refA 改为 refB 时，React 收到的合并回调身份仍然相同；refB 没有收到节点，refA 的清理也不会在更换时执行。保存最新 refs 只影响下一次回调执行，不能主动触发重新绑定。
- Popover/Tooltip 的 Trigger、Content、Arrow 均消费该公共函数。上轮增加 React 19 cleanup 返回值只修复了卸载清理，没有修复挂载期间更换 ref。
- 修改方向：让合并结果正确表达输入 ref 的变更，同时保留 React 19 cleanup 语义。
- 框架依据：[React ref callback](https://react.dev/reference/react-dom/components/common#ref-callback)。

### F. Angular Button loading + end 仍把图标放在文字前

- [模板](D:/code/fex-design/packages/@fex-design/components/angular/src/ui/button/button.template.html:1) 的 loading span 始终位于默认投影内容之前，没有按 iconPlacement 拆分前后分支。
- [ButtonIcon](D:/code/fex-design/packages/@fex-design/components/angular/src/primitive/button/button-icon.ts:11) 只设置 data-icon；[共享样式](D:/code/fex-design/packages/@fex-design/components/styles/src/button.ts:80) 没有根据这个属性调整 order。
- 触发条件：loading=true 且 iconPlacement=end。其他框架将该指示器渲染在内容之后，Angular 仅改变标记。
- 修改方向：按位置将 loading 图标放进对应模板分支。

### G. Solid 的字符串 style 支持只修复了部分组件

下列位置仍然拒绝或错误展开原生字符串 style：

| 组件 | 证据 |
| --- | --- |
| Alert | [index.tsx:62](D:/code/fex-design/packages/@fex-design/components/solid/src/ui/alert/index.tsx:62)，非 object 直接替换为空对象 |
| Anchor | [index.tsx:72](D:/code/fex-design/packages/@fex-design/components/solid/src/ui/anchor/index.tsx:72)，同上 |
| Avatar / AvatarGroup | [index.tsx:43](D:/code/fex-design/packages/@fex-design/components/solid/src/ui/avatar/index.tsx:43)、82 行，同上 |
| Card | [index.tsx:43](D:/code/fex-design/packages/@fex-design/components/solid/src/ui/card/index.tsx:43)，直接展开 rest.style |
| Empty | [index.tsx:61](D:/code/fex-design/packages/@fex-design/components/solid/src/ui/empty/index.tsx:61)，直接展开 rest.style |
| InputNumber | [index.tsx:82](D:/code/fex-design/packages/@fex-design/components/solid/src/ui/input-number/index.tsx:82)，非 object 直接替换为空对象 |
| Radio | [index.tsx:31](D:/code/fex-design/packages/@fex-design/components/solid/src/ui/radio/index.tsx:31)，类型断言后直接展开；断言不会转换运行时字符串 |
| Switch | [index.tsx:26](D:/code/fex-design/packages/@fex-design/components/solid/src/ui/switch/index.tsx:26)，非 object 直接替换为空对象 |
| Tag | [index.tsx:35](D:/code/fex-design/packages/@fex-design/components/solid/src/ui/tag/index.tsx:35)，同上 |

触发条件：`style="color:red"` 或原生样式字符串与 semantic styles 同传。仓库已有 [mergeStyle](D:/code/fex-design/packages/@fex-design/components/solid/src/primitives/merge-style.ts:6)，应补全使用范围并统一覆盖顺序。

### H. Solid Checkbox 会覆盖用户原生 style

- [UI Checkbox](D:/code/fex-design/packages/@fex-design/components/solid/src/ui/checkbox/index.tsx:35) 未将 style 分到 local；它留在 rest 中，但传入 CheckboxControl 后又被 `style={local.styles?.control}` 覆盖。
- Root 也只接收 styles.root。即使传入合法对象 style，也没有位置保留它；React UI 会将用户 style 与 Root 样式合并。
- 修改方向：将用户 style 明确分配给相同语义的 Root，合并而非覆盖。

### I. Solid Skeleton 同传两种样式时丢弃 semantic root 样式

- [Skeleton](D:/code/fex-design/packages/@fex-design/components/solid/src/ui/skeleton/index.tsx:69) 在 style 为字符串时直接返回该字符串，只在字符串不存在时才使用 styles.root。
- 触发条件：同时传 `style="color:red"` 和 `styles.root`。字符串本身能保留，但 semantic root 样式完全丢失；Vue/Svelte 会合并两者。
- 修改方向：使用统一的字符串/对象样式合并能力。

### J. Svelte Badge 仍直接拼接 CSS 字符串

- [Badge](D:/code/fex-design/packages/@fex-design/components/svelte/src/ui/badge/badge.svelte:56) 的附着 Root 和独立 Badge 分支均使用 `${style ?? ""}${styles?.root ?? ""}`。
- 触发条件：style 不带尾部分号，例如 `color:red`，同时 styles.root 为 `background:blue`，结果变成 `color:redbackground:blue`，并不是两个有效声明。
- 修改方向：统一加入声明分隔符，并复核独立 dot 分支的用户样式路由。

### K. Svelte 部分 UI 包装器没有完整的原生属性契约

- [AspectRatio](D:/code/fex-design/packages/@fex-design/components/svelte/src/ui/aspect-ratio/aspect-ratio.svelte:4) 的 `$props<AspectRatioOptions>()` 只声明 ratio，未公开 children、class、style、原生事件等。运行时 rest 可能继续转发，但公开类型拒绝这些正常用法。
- [CheckboxGroup](D:/code/fex-design/packages/@fex-design/components/svelte/src/ui/checkbox/checkbox-group.svelte:6) 和 [RadioGroup](D:/code/fex-design/packages/@fex-design/components/svelte/src/ui/radio/radio-group.svelte:6) 的 Props 未扩展对应原生属性类型；公开类型缺少 class、style、id、aria 属性和原生事件。
- [AvatarGroup](D:/code/fex-design/packages/@fex-design/components/svelte/src/ui/avatar/avatar-group.svelte:15) 除类型缺失外，解构未收集 rest，模板也未透传；传入 id、aria-label、事件等实际上被丢弃。额外 wrapper 上也没有提供公开元素绑定能力。
- 修改方向：按 Svelte 原生 HTML attributes / Snippet / 元素绑定模型完善 Props，并明确传到真正的组根元素。

## 后续修复边界

这些问题由源码中的条件判断、参数读取、属性展开和类型声明直接支持。没有将 DOM 生命周期写法、slot/snippet 表达、事件命名等正常框架差异列为缺陷。涉及浏览器实际定位、事件先后顺序、焦点和无障碍树的其他候选项，本轮没有运行证据，不写成已确认问题。

本报告新增于 docs，未改动上一轮报告和组件源码，也未介入 Calendar、DatePicker 的并行改动。
