# Dropdown UI 设计

## 目标与边界

Dropdown UI 是 Dropdown Primitive 的快捷组合。它提供一个可以直接使用的触发按钮、浮层和菜单项组合，适合最常见的操作菜单场景；它不创建第二套 Dropdown 状态、Menu 状态或 Popover 行为。

Primitive 负责所有状态、焦点、键盘、Portal、定位、关闭、子菜单和菜单激活语义。UI 只负责默认部件组合、默认样式和少量调用便利。调用方需要替换任意结构时，应直接使用 Primitive，不通过 UI 增加新的隐式行为。

五个框架的 UI 行为、默认结构、公开属性和事件语义必须保持一致；差异只体现在各框架的原生表达方式，例如 React children/render props、Vue slots、Solid accessors、Svelte snippets/actions 和 Angular content projection/directives。

## 默认组合

```text
Dropdown
├─ DropdownTrigger        默认 Button
└─ DropdownPortal
   └─ DropdownContent
      └─ MenuItem[]        由调用方数据映射
```

UI 使用同一框架的 Dropdown Primitive、Button Primitive 和 Menu Primitive。它不重新实现 Popover、MenuItem、SubMenu 或键盘导航，也不在 UI 层保存 `open`、选中值、子菜单值或焦点引用。

默认触发器使用 Button 的默认变体，默认文案由调用方提供；UI 不硬编码业务文案。默认 Content 使用 Primitive 的默认浮层和菜单样式。菜单项由调用方传入的数据映射，映射结果仍然是公开的 MenuItem API。

## UI 公开 API

### 根属性

根属性只提供最常用的快捷入口，并直接映射到 DropdownRoot：

| 属性                   | 作用                                                             |
| ---------------------- | ---------------------------------------------------------------- |
| `open` / `defaultOpen` | 受控或非受控的根浮层状态；从 Popover 快捷提到 Dropdown UI 根部。 |
| `disabled`             | 同时禁用触发器和菜单交互。                                       |
| `closeOnSelect`        | 叶子项激活后是否请求关闭，默认 `true`。                          |
| `onOpenChange`         | 透传根 Popover 的打开变化事件。                                  |
| `onActivate`           | 透传 Menu 的可取消激活前事件。                                   |
| `items`                | 透传给 UI Menu 的数据入口；不定义 Dropdown 自己的数据类型。      |
| `menuProps`            | 透传适用于 Dropdown 的 Menu 配置。                               |
| `popoverProps`         | 透传适用于 Dropdown 的 Popover 配置。                            |

UI 不把 `layout`、`inlineAccordion`、内部触发器 ID 或根状态重新开放为独立 UI 属性。Primitive 的垂直菜单约束继续生效；即使调用方通过类型绕过，也不能改变运行时约束。

### `items` 与 Menu 的关系

`items` 不是 Dropdown UI 新定义的数据协议，而是 UI Menu 已有的公开属性。Dropdown UI 直接把外层 `items` 传给 Menu UI；Menu UI 再按 Menu 自己的 `MenuItemData` / `MenuEntry` 契约生成菜单部件：

```text
items[]
├─ value       -> MenuItem.value
├─ label       -> MenuItem 内容
├─ disabled    -> MenuItem.disabled
├─ textValue   -> MenuItem.textValue
├─ icon        -> MenuItem 前置内容
├─ suffix      -> MenuItem 后置内容
└─ children[]  -> SubMenu 及其 Menu 子部件
```

Dropdown UI 不复制 Menu UI 的 `items` 类型，也不新增 `fieldNames` 或另一套字段映射。需要动态数据时由调用方更新同一个 `items`；需要受控选择时仍使用 `menuProps.value`、`menuProps.defaultValue`、`menuProps.multiple` 和对应事件。UI 不保存选中值。

`items` 是 UI 快捷组件的必填入口；使用完全手动组合时应直接使用 Primitive，不通过 UI 绕过 `items` 契约。

### 外层快捷属性与透传边界

Dropdown UI 把高频组合属性提到根部，避免调用方为了打开根浮层或提供菜单数据而深入透传对象：

| UI 外层属性                             | 实际归属                  | 透传对象中的处理                         |
| --------------------------------------- | ------------------------- | ---------------------------------------- |
| `open` / `defaultOpen` / `onOpenChange` | Popover 根状态            | 从 `popoverProps` 中剔除，根部统一处理。 |
| `items`                                 | Menu UI 数据入口          | 不放入 `menuProps`；直接传给 Menu UI。   |
| `disabled`                              | Popover 与 Menu 共同状态  | 从两个透传对象中剔除，由根部统一覆盖。   |
| `onActivate`                            | Dropdown 与 Menu 激活协调 | 从 `menuProps` 中剔除，由根部统一合并。  |

其余属性继续留在对应的 `popoverProps` 或 `menuProps` 中。UI 只做属性分流和事件合并，不新增行为。

### 结构定制

UI 提供的定制入口只能控制默认组合的展示内容：

- `trigger` 或框架等价的默认触发器内容替换。
- `itemRender` 或框架等价的菜单项内容替换。
- `classNames` / `styles` 只对应实际存在的结构部件。
- `menuProps` 和 `popoverProps` 继续用于 Primitive 行为与部件配置。

这些入口不能绕过 Menu 的注册、禁用、键盘或激活逻辑。自定义内容必须保留 Primitive 传出的属性、引用和事件；完全替换 DOM 时应改用 Primitive 或独立逻辑入口。

## 事件和状态契约

UI 不包装或改名 Primitive 的核心事件。React 使用回调属性，Vue 使用对应的 emits/v-model，Solid 使用 accessor 回调，Svelte 使用事件回调或 `$bindable`，Angular 使用 output；事件参数的字段和时序保持相同。

激活时序固定为：

1. Menu 调用可取消的 `onActivate`。
2. 未取消时更新 Menu 选择状态并调用成功激活通知。
3. `closeOnSelect` 为 `true` 时请求关闭 Dropdown 根浮层。

UI 不在 `onActivate` 外再触发一次选择事件，也不通过监听 `open`、`value` 或 `openValues` 补做业务逻辑。配置同步不产生用户事件。

## 默认样式和 CSS 变量

Dropdown UI 不声明新的 Dropdown 专属 CSS 变量。默认样式来自 Button、Popover、Menu 和 MenuItem 的现有样式模块；需要调整外观时使用这些直接子组件的 CSS 变量、结构化 class/style 或 Primitive 部件 API。

UI 可以提供默认的最小宽度、按钮和菜单间距，但这些是组合样式，不得形成第二套状态变量。`classNames` / `styles` 的部件名称必须与实际 DOM 结构一致，不能暴露一个无法独立定制的虚假 Dropdown 部件。

## 可访问性

UI 必须完整保留 Primitive 提供的：

- `aria-haspopup="menu"`、`aria-expanded`、`aria-controls` 和禁用语义。
- 唯一的根 `role="menu"` 及 Menu 子项、分组、分隔线和子菜单语义。
- 点击、Enter、Space、Arrow、Home/End、字符搜索、Escape、Tab 和焦点恢复行为。
- 延迟挂载、空菜单、全部禁用项、Portal 和自定义容器的焦点落点。

UI 不通过查询角色、文本或 DOM 冒泡实现关闭和选择，也不要求调用方提供触发器 ID。

## 五框架实现要求

五个框架都应提供同名的 UI Dropdown 入口和相同的快捷组合能力：

- React：UI 组件组合 Primitive，默认触发器支持 children/render props 的原生表达。
- Vue：UI SFC 使用 slots 和显式 emits，数据映射使用 Composition API。
- Solid：使用 accessor、细粒度派生和原生 JSX，避免重复保存菜单状态。
- Svelte：使用 Svelte 5 `$props`、snippets、actions 和派生机制，不模拟 React children。
- Angular：使用 standalone component、signal inputs/outputs 和 content projection；selector 遵循无品牌前缀规则。

各框架不得为了表面 API 一致而复制另一框架的 children、ref、Context 或 hook 模型。公共行为必须来自同一 core 和对应框架 Primitive；UI 文件只负责组合、映射和展示。

## 示例和验收

UI 示例与 Primitive 示例使用相同的场景目录，但 UI 示例展示快捷入口和数据映射。至少覆盖：基本使用、受控与非受控、弹出位置、触发方式、自定义挂载元素、多级菜单、扩展菜单、自定义 Item、LTR/RTL、CSS 变量和结构化样式。

每个场景在五个框架中必须保持相同的输入、操作、反馈和默认视觉意图。验收时比较实际 DOM、焦点、事件反馈、菜单位置和样式结果；不能因为五个框架的源码结构相似，或示例文件数量相同，就认为 UI 实现一致。

UI 不新增 Primitive 没有的行为。若某项能力需要新的状态、事件、焦点规则或数据协议，应先回到 Primitive/core 设计，而不是把它隐藏在 UI 快捷组件中。
