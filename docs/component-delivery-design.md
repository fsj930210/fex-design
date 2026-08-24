# Fex Component Documentation and Source Delivery Design

## 1. 核心定义

Fex 不是五个相似组件库，而是一套组件系统的五种框架适配：

```text
公共语义一致
公共行为一致
公共视觉一致
框架表达符合各自最佳实践
```

组件不发布为公共 npm 组件包。`packages/@fex-design/*` 是 monorepo 中的源码母版，CLI 通过 Registry 将源码复制到用户项目，类似 shadcn 的源码交付模式。

用户可能在公司内部将取得的源码重新封装为 npm 包，因此公开 API、CSS Variables、class/style、部件定制和无障碍契约仍必须稳定。

## 2. 五框架一致性边界

必须一致：

- 组件和部件语义。
- 属性名称和含义。
- 默认值和枚举值。
- 受控/非受控规则。
- 事件触发时机和 payload。
- disabled、loading、readonly 等状态。
- 键盘、焦点、Portal、dismiss 行为。
- role、aria、data-slot、data-state 等公开 DOM 契约。
- CSS Variables 和视觉规格。
- Primitive/UI/Pro 边界。
- Demo 场景与初始数据。

允许不同：

```text
React children / hooks
Vue slots / composables
Solid children/accessors / primitives
Svelte snippets/actions/stores
Angular content projection/directives/signals/services
```

框架语法可以不同，能力和结果不能不同。

### 2.1 源码交付组件命名

Fex 通过 CLI 把组件源码复制到用户项目，不在组件定义名和公开导出名中携带品牌前缀或层级装饰：

```text
正确：Button、ButtonGroup、Dialog、DialogTrigger
错误：FexButton、ElButton、ButtonPrimitive、PrimitiveButton
```

Primitive、UI、Pro 的层级由目录、Registry target 和导入路径表达，不写进组件定义名。同一个组件族的 Primitive Button 和 UI Button 都公开为 `Button`；UI 实现组合 Primitive 时，只允许在当前实现文件中使用局部别名：

```ts
import { Button as PrimitiveButton } from '../../primitive/button/button'
```

局部别名只用于消除当前文件中的符号冲突，不得成为组件定义名、公开导出名、DevTools 名称或生成源码中的稳定 API。Vue 使用 `defineOptions({ name: 'Button' })` 明确稳定名称；React、Solid 使用 `Button` 函数名；Svelte 使用 `button.svelte` 对应的 `Button` 导出；Angular 使用 `Button` 类名。

所有公开组件入口只提供具名导出，调用方统一使用 `import { Button, ButtonGroup } from '...'`，不提供公开 `default export`。Vue SFC 和 Svelte 组件文件的内部默认模块导出必须由同目录入口映射成具名导出，不能向调用方泄漏默认 API。

### 2.2 框架原生类型表达

公共属性的名称、语义、枚举和默认值必须一致，但不得为了表面一致把 React 类型模型复制到其它框架：

```text
React   → ComponentProps、ReactNode、ref
Vue     → Props、emits、template slots、attrs
Solid   → JSX attributes、ParentProps、accessors
Svelte  → HTML attributes、Snippet、$props、@render
Angular → signal inputs/outputs、原生元素、content projection
```

Core 只定义五框架共享的公共语义类型。`children`、Vue slot、Svelte Snippet、Angular content projection、React ref 等框架表达留在各自框架。无 Slot Props 的 Vue 默认/具名 Slot 直接写 `<slot>`，不为形式统一手写 `ButtonSlots`；只有作用域 Slot 确实需要声明传出参数时才使用 `defineSlots`。Angular 不为 signal inputs 额外制造 React Props 风格的 `ButtonInputs` 汇总接口。

React 是公共语义、行为、视觉和 Demo 场景的参考实现，不是其它框架的类型与代码模板。每次实现或重构非 React 适配前，必须核对该框架官方推荐能力和成熟组件库的当前源码：

```text
Vue    → Vue 官方文档、Element Plus、Reka UI
Solid  → Solid 官方文档、Kobalte、Ark UI Solid
Svelte → Svelte 5 官方文档、Bits UI、Ark UI Svelte
Angular → Angular 官方文档、Angular Material、CDK
```

审查重点包括 Props/Inputs、原生属性继承、children/slot/snippet/content projection、ref/element 暴露、事件、样式合并、组件命名和文件组织。参考成熟库是为了遵循框架惯例，不代表复制其品牌前缀、第三方特有 API、历史兼容层或与 Fex 公共 Contract 冲突的设计。

## 3. 分层

```text
Themes
→ 全局 token、主题、Tailwind 映射和 CSS

Shared Styles
→ 五框架唯一组件 class、variant、size 和 data-state 样式事实源

Core
→ 框架无关状态、controller、模型、键盘和纯逻辑

Framework Adapter
→ 响应式、生命周期、DOM ref、Portal、slot/template 和事件绑定

Primitive
→ 最小 DOM、行为、ARIA 和组合部件

UI
→ Primitive 的推荐组合和业务友好默认结构

Pro
→ 仅用于明确、复杂、高复用的工作流
```

依赖方向：

```text
Pro → UI → Primitive → Core/Styles/Utils
```

禁止反向依赖。

## 4. API JSON 是自动生成的文档数据

每个组件族生成一份框架无关 API JSON，不按 Primitive/UI/Pro 拆成多份，也不由人工直接维护：

```text
packages/@fex-design/core/src/button/button.types.ts
→ docs/generated/api/button.json

packages/@fex-design/core/src/dialog/dialog.types.ts
→ docs/generated/api/dialog.json
```

Core 中的公共类型是组件 API 的唯一事实源。各框架的 `button.types.ts` 负责把公共类型组合成本框架的 Props、Slots、Events 和原生元素属性；生成工具同时用这些框架类型检查五框架实现是否完整，但不会把五份框架表达复制进 JSON。

API JSON 是构建产物。禁止人工修改生成后的 JSON，也不要求开发者重复录入每个 Prop 的类型、枚举、默认值和编辑器配置。

用途：

- 官网 API Table。
- 属性添加器。
- 属性值编辑控件。
- Events JSON 面板。
- Markdown/AI 文档生成。
- Registry 和 CLI 查询。
- 五框架 API 一致性校验。

### 4.1 类型定义要求

公共类型必须提供足够的信息供工具生成 API JSON：

```ts
export interface ButtonOptions {
  /**
   * 按钮视觉类型。
   * @default 'default'
   * @example 'outline'
   */
  variant?: ButtonVariant

  /**
   * 是否显示加载状态。加载时按钮不可点击。
   * @default false
   * @example true
   */
  loading?: boolean
}
```

生成工具读取类型结构和 JSDoc：

```text
类型和联合类型 → type、enum values、required
正文           → description
@default       → defaultValue
@example       → example
@deprecated    → deprecated
@since         → since
@remarks       → 补充说明
@preview false → 不进入属性编辑器
```

简单类型的 Playground 编辑器由类型自动推导：

```text
boolean    → Switch
enum       → Select
string     → Input
number     → InputNumber
color      → Color Input
简单数组   → Tags Input
复杂对象   → JSON Editor
```

函数、render、slot、children、snippet 和 template 不允许在线输入任意代码，默认不进入属性编辑器，应由真实 Demo 展示。原生 HTML 属性不逐项复制进公共类型和 JSON，只记录对应的原生元素继承关系。

### 4.2 复杂类型必须提供 Example

对象、复杂数组和对象联合类型必须在公共类型上提供 `@example`。Example 必须是合法 JSON，并同时通过 TypeScript 类型和 API Schema 校验：

```ts
export interface TreeOptions {
  /**
   * 字段名称映射。
   * @example
   * {
   *   "label": "title",
   *   "value": "key",
   *   "children": "nodes"
   * }
   */
  fieldNames?: FieldNames
}
```

生成后的 API JSON 使用结构化类型数据，不只保存 TypeScript 字符串。复杂属性的 Example 作为 JSON Editor 初始内容；非法 Example、缺少 Example 或与类型不匹配都应使生成失败。

### 4.3 生成和校验

API JSON 是公共类型契约的序列化结果，五框架源码是实现。构建时双向校验：

```text
Core 公共类型但某框架缺失 → 失败
框架新增公共 API 但 Core 未记录 → 失败
默认值、枚举或事件参数不同 → 失败
JSON 指向不存在 Demo → 失败
Playground editor 与类型不兼容 → 失败
复杂类型缺少合法 Example → 失败
```

## 5. 组件文档和 Demo

组件源码文档采用双语文件：`<component>.md` 为默认英文，`<component>.zh-CN.md` 为简体中文。语言由文件名区分，文档标题不追加“中文文档”或 “English Documentation”。两份文档共享同一份 Core 类型/JSDoc 和生成后的 API JSON 事实源，公开 API、API 顺序与示例覆盖必须一致；语言文件只改变标题、表头和说明文字，不改变类型、默认值、导入路径和代码标识符。除代码标识符与类型表达外，说明文字必须完整使用当前文件对应语言，不允许中英文说明混写。

每个组件页面重点解决：用户看到属性后可以立即观察效果，不需要复制项目或跳到依赖库文档猜测。

每个 Demo 提供：

```text
真实 Preview
+ 添加属性
+ Code
+ Events
```

所有组件从首次交付起同时支持 LTR 与 RTL。公共方向值使用逻辑 `start` / `end`，原生元素透传 `dir`，五框架 Demo 必须包含 RTL 预览；布局、图标、动效、键盘导航、弹层定位和连接边框均以逻辑方向实现，不能把物理 `left` / `right` 固化为公共契约。

### 5.1 添加属性

每个 Demo 右上角有 `添加属性`：

```text
点击
→ 搜索/多选当前 Demo 支持的属性
→ 在 Preview 下方生成属性名和编辑控件
→ 修改后立即发送给 iframe Preview
→ Code 同步更新
```

编辑器根据 API JSON 自动选择：

```text
boolean → Switch
enum    → Select
string  → Input
number  → InputNumber
color   → Color Input
简单数组 → Tags Input
复杂数组/对象 → JSON Editor
function → 不进入属性选择器
slot/render/hook → 专门 Demo
```

每个 Demo 可以默认使用组件全部安全可编辑属性，也可以用少量 include/exclude 限制当前场景。

### 5.2 对象属性

第一版使用经过 Schema 校验的 JSON Editor：

```json
{
  "checkable": true,
  "defaultExpandAll": true
}
```

例如 TreeTransfer：

```text
treeProps
transferProps
```

生成工具根据公共类型引用生成 TreeProps/TransferProps reference，并排除由 TreeTransfer 自己拥有的 data、value、defaultValue、onChange 等状态来源。此类复杂对象必须在类型定义中提供合法的 `@example`，不在生成后的 API JSON 中手工补写。

非法 JSON 不发送给 Preview，继续使用最后一次合法值并显示错误位置。

### 5.3 回调

回调不进入属性选择器，不允许用户在线编写任意函数。

Preview Harness 自动连接当前 Demo 相关业务事件，触发后显示 JSON：

```json
{
  "event": "change",
  "arguments": {
    "value": ["node-1", "node-2"],
    "detail": {
      "action": "add"
    }
  }
}
```

事件序列化必须处理 DOM Element、Event、Function 和循环引用。高频原生事件如 pointermove、mousemove、scroll 不默认记录。

所有公开事件在 API Table 中说明参数，并链接到可以触发它的 Demo。

### 5.4 不支持在线编辑的能力

以下使用官方 Demo 和源码展示：

```text
Hook
自定义 render
slot/children/template
异步 request
自定义组件
多组件复杂组合
```

例如 `useDraggable + Dialog` 是组合 Demo。官网直接展示五框架真实效果和代码；用户需要自由修改时再打开外部 Sandbox。

第一阶段不建设五框架浏览器内代码编译器。

## 6. Demo 源码

Demo 不能写成 MDX 内的字符串。真实源码按框架保存，并同时服务 Preview、Code、测试、Registry 和 AI：

```text
docs/examples/dialog/basic/
├── meta.json
├── react.tsx
├── vue.vue
├── solid.tsx
├── svelte.svelte
├── angular.ts
└── angular.html
```

每个 Demo 只回答一个明确问题：

```text
基础用法
禁用
受控模式
多选
搜索
异步
自定义 Trigger
表单组合
键盘行为
```

复杂组件允许有多个基础 Harness，如 Select 的 Basic、Multiple、Search、Async。

公开属性必须至少满足一项：

```text
有独立 Demo
可在属性编辑器中立即试用
标记为结构型 API，并链接真实组合 Demo
```

不允许只留一行类型和说明而没有可观察方式。

## 7. Preview Runtime 协议

Solid Docs 和 iframe 使用同源 `postMessage`：

```text
Docs → Preview
- SET_PROPS
- SET_THEME
- SET_VIEWPORT
- RESET

Preview → Docs
- READY
- RESIZE
- EVENT
- ERROR
- STATE_CHANGE
```

Props 只传经过 API Schema 校验的 JSON。回调函数不跨 iframe 传递，由 Preview Harness 本地连接。

iframe 进入视口附近再加载，默认只加载当前框架。五框架比较由用户显式触发。

## 8. Registry 和源码交付

组件不作为公共 npm 组件包发布。CLI 从 Registry 复制当前框架源码和共享依赖。

Registry Item 负责：

```text
组件 ID
layer
framework files
target path
registry dependencies
第三方 dependencies
CSS/theme dependencies
API JSON ID
Demo IDs
import 转换
```

API JSON 和 Registry JSON 职责分离，通过组件 ID 关联：

```text
API JSON      → 如何使用和展示
Registry JSON → 如何安装源码
```

用户项目保留共享分层：

```text
src/fex/
├── core/
├── themes/
├── utils/
├── icons/
├── framework helpers/
└── components/
    ├── primitive/
    ├── ui/
    └── pro/
```

Core、Utils 和全局 Theme 只复制一份，不内联进每个组件。

## 9. Shared Styles 的分发

仓库母版继续使用一份 `@fex-design/styles` 保证五框架一致。

CLI 分发时：

```text
简单组件
→ 将静态 Tailwind class 和 CVA 定义放入组件文件

复杂组件
→ 放入组件同目录的 component.styles.ts

全局 token/theme
→ 保留共享 CSS

Core
→ 保留共享目录
```

用户打开组件或组件目录即可看到 Tailwind 样式，不需要跳转全局 styles 目录。生成物必须由同一 Styles 母版产生，不能让五个框架分别手写 class。

## 10. CLI 冲突策略

CLI 不做自动逻辑合并、Tailwind 语义合并或 AST 合并。

```text
文件不存在 → 添加
文件存在，无参数 → 询问是否覆盖
用户选择否 → 跳过
用户选择是 → 覆盖
--overwrite / -o → 直接覆盖
--dry-run → 预览变更
--diff → 查看差异
--view → 查看 Registry 源码
```

`--yes` 不隐式覆盖已有组件。覆盖必须明确使用 `--overwrite`。

安装完成后代码归用户所有。用户改过逻辑时，CLI 不猜测如何合并；用户先查看 diff，再决定保留或覆盖。

## 11. Skill、MCP 和 llms

不是每个组件各维护一套。

整个 Fex 提供：

```text
一个 Fex Skill
一个 Fex MCP Server
一个 /llms.txt
可选一个 /llms-full.txt
每个组件一份 API JSON 和生成的 AI Markdown
```

Skill 说明：

- 如何识别项目框架。
- 如何选择 Primitive/UI/Pro。
- 如何查询 Registry/API/Demo。
- 如何运行 CLI 安装。
- 如何遵循公共 API 和验证要求。

MCP 工具建议：

```text
search_components
get_component
get_component_api
get_component_files
get_component_dependencies
get_component_demos
get_install_command
compare_frameworks
```

`llms.txt` 是索引。每组件 AI Markdown 由 API JSON、公共正文和真实 Demo 生成，不人工复制维护。

## 12. 逐组件交付流程

每次重构或新增组件按固定顺序：

1. 审计 Primitive 五框架 API、行为、DOM、视觉和 exports。
2. 确定 Primitive/UI/Pro 边界。
3. 在 Core 中设计或更新公共类型、默认值、JSDoc 和复杂类型 Example。
4. 设计共享 Core 行为和 Styles CSS 边界。
5. 实现五框架 `*.types.ts` 和 Adapter/UI/Pro。
6. 由公共类型自动生成 API JSON。
7. 写五框架同场景 Demo。
8. 接入属性编辑和 Events JSON，并校验生成结果与五框架实现。
9. 运行公共行为、无障碍和关键视觉验证。
10. 生成文档、Registry 和 AI 数据，生成后的 API JSON 不人工修改。

完成标准：

```text
公共 Contract 已确定
Core/Styles 边界明确
五框架 API 对齐
五框架行为对齐
五框架视觉对齐
公共类型信息完整，复杂类型包含合法 Example
API JSON 可重复自动生成且无人工修改
Demo 覆盖公开能力
Registry 依赖闭包完整
独立 Demo URL 可运行
验证证据明确
```

## 13. 首批验证组件

先用三个组件验证整套架构：

```text
Button
- 简单 Props、size、class/style、事件

Dialog
- 组合部件、受控状态、Portal、Escape、outside click

TreeTransfer
- UI 组合、treeProps/transferProps、对象编辑、多个事件
```

三者跑通后再批量推进 UI/Pro 和文档，避免 API Schema、Preview 协议和 Registry 结构反复返工。
