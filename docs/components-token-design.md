# Fex Components Token Design

## 1. 目标

Fex 的五个框架实现必须共享同一套视觉规格。Token 用于表达稳定、可复用、用户确实希望修改的设计决策，而不是把组件中的每个数值都变成 CSS Variable。

设计目标：

- React、Vue、Solid、Svelte、Angular 共享同一套系统 Token 和组件样式事实源。
- 用户修改 CSS Variable 后，无需修改组件 API。
- 源码交付、内网二次封装为 npm 包、局部业务覆盖三种场景都可用。
- `size="xs | sm | default | lg | xl"` 等公共 API 保持稳定，实际数值由 Token 决定。
- 用户仍可通过 `class`、`style` 和 UI 层结构化部件样式直接覆盖默认设计。
- 只沉淀有明确复用事实的 Token，避免 Token 数量失控。

## 2. Token 分层

采用三层覆盖模型：

```text
系统 Token
→ 组件规格 Token
→ 当前实例 Token / class / style
```

以 Button 的 `sm` 高度为例：

```text
--height-sm
→ --button-height-sm（可选覆盖）
→ --button-height（当前实例最终值）
→ height
```

系统 Token 必须声明默认值。组件规格 Token 通过 fallback 存在，不必全部重复声明：

```css
:root {
  --height-sm: 28px;
}
```

```ts
size: {
  sm: '[--button-height:var(--button-height-sm,var(--height-sm))]',
}
```

```ts
base: 'h-[var(--button-height)]'
```

这允许用户在不同范围覆盖：

```css
/* 所有同尺寸控件 */
:root {
  --height-sm: 30px;
}

/* 只修改所有 Button */
:root {
  --button-height-sm: 26px;
}

/* 只修改某个区域的 Button */
.compact-toolbar {
  --button-height-sm: 24px;
}
```

```tsx
/* 只修改当前实例 */
<Button size="sm" style={{ '--button-height': '42px' } as CSSProperties} />
```

## 3. 用户覆盖优先级

统一规定：

```text
系统 Token
< size/variant 默认样式
< 用户 class
< 用户 CSS Variable style
< 用户原生 inline style
```

框架组件必须将用户 class 放在默认样式之后：

```ts
cn(buttonClassName({ size, variant }), userClass)
```

`cn` 使用 `clsx + tailwind-merge`。标准 Tailwind 冲突 utility 由用户版本覆盖：

```tsx
<Button size="sm" className="h-12 px-8 rounded-none" />
```

`size-5` 同时设置宽高，适合 Icon Button、Avatar、Checkbox 等正方形组件；普通文本 Button 应优先使用 `h-*` 和 `px-*`。

复杂 UI 的内部部件由结构化 API 覆盖：

```tsx
<Dialog
  className={{
    content: 'max-w-3xl',
    header: 'border-b',
    body: 'p-8',
    footer: 'justify-start',
  }}
/>
```

Primitive 的部件本身直接接受原生 `class` / `className` 和 `style`。

## 4. 第一批系统 Token

第一阶段仅稳定以下类别。

### 4.1 语义颜色

```text
--background
--foreground
--secondary-background
--muted-background
--elevated-background
--hover-background
--active-background
--selected-background
--disabled-background
--secondary-foreground
--muted-foreground
--disabled-foreground
--placeholder-foreground
--inverse-foreground
--elevated-foreground
--primary
--primary-foreground
--border
--hover-border
--active-border
--selected-border
--focus-border
--disabled-border
--danger
--danger-background
--danger-foreground
--danger-border
--success
--success-background
--success-foreground
--success-border
--warning
--warning-background
--warning-foreground
--warning-border
--info
--info-background
--info-foreground
--info-border
--focus-ring
--mask
```

### 4.2 Control Size

```css
:root {
  --height-xs: 24px;
  --height-sm: 28px;
  --height-default: 32px;
  --height-lg: 36px;
  --height-xl: 40px;

  --icon-size-xs: 12px;
  --icon-size-sm: 14px;
  --icon-size-default: 16px;
  --icon-size-lg: 18px;
  --icon-size-xl: 20px;
}
```

适用组件：

```text
Button
Input
InputNumber
InputOTP
Select Trigger
AutoComplete Trigger
Cascader Trigger
TreeSelect Trigger
DatePicker Trigger
TimePicker Trigger
Pagination Button
Toggle
RadioButton
```

同一个 size 的表单控件高度必须一致。Padding 和 Gap 是否共用需在逐组件审查后决定，不因数值相同就自动抽取。

### 4.3 Radius

Radius 直接使用 Tailwind 的 `rounded-*` 及其内置 Theme Variable，不重复声明 Fex Token。
组件提供合理的 `rounded-md`、`rounded-full` 等默认 utility，用户通过 `class` 直接覆盖。

组件的 `variant`、`size`、`shape`、`status` 是独立维度：

```text
variant = 视觉意图
size    = 规格大小
shape   = 几何形态
status  = 状态语义
```

不允许组合成 `outline-xl-rounded` 这类爆炸式枚举。

### 4.4 Typography

字体族使用 Tailwind 的 `font-sans` 等 Theme Variable 和快捷方式，不重复声明 Fex 字体 Token。字号、字重和行高直接使用 Tailwind 的 `text-*`、`font-*`、`leading-*`。组件的 `size` variant 可以选择具体 utility，用户通过 `class` 覆盖。不建立 System、Control、Component 三层字号变量，避免为了 Token 而 Token 化。只有未来出现明确、稳定且跨大量组件无法由 utility 解决的需求时再评估。

### 4.5 Focus 和状态

```text
--hover-background / --hover-border
--active-background / --active-border
--selected-background / --selected-border
--disabled-background / --disabled-foreground / --disabled-border
--focus-border / --focus-ring
```

Active 和 Selected 保留不同语义名称，但当前默认引用相同色值，避免按下后进入选中状态时发生颜色跳变。Focus Ring 的宽度、Disabled 和 Loading 的透明度直接使用 Tailwind utility 或组件样式，不建立数值 Token。Pointer、cursor、data-state 选择器属于组件实现，不是 Token。

### 4.6 Motion

通用动画时长和缓动直接使用 Tailwind 的 `duration-*`、`ease-*`，不重复创建
`fast/default/slow` Token。只有 Drawer、Dialog 等组件存在用户确实需要覆盖的完整进入/退出动画时，
才提供组件级 Motion Variable。

### 4.7 Elevation

```text
--shadow-elevated
```

普通小阴影直接使用 Tailwind 的 `shadow-xs` 等内置快捷方式。只有多个浮起表面共同使用且 Tailwind 默认值无法表达的阴影才保留系统级 `shadow-elevated`。组件专属阴影和 z-index 通过组件变量在消费位置 fallback，不在系统层预设未使用的组件名称 Token。

### 4.8 Layout Spacing

Space Token 在系统层定义数值，并在 Tailwind 映射层提供 `gap-space-xl`、`p-space-2xl` 等
常用快捷 class。Height 和 Icon Size 由 `utilities.css` 提供 `h-xs`、`h-default`、
`icon-size-sm` 等快捷 class。Font Size、Radius 等 Tailwind 已有清晰快捷方式的能力不重复创建。
页面留白属于 App 布局，直接在 App 中使用响应式 Tailwind class，不放入通用 Token。

## 5. 第二批候选 Token

只有逐组件审查确认存在共享语义后再增加：

```text
Indicator size：Checkbox、Radio
Avatar size
Item height：Menu、Listbox、Select、Tree、Cascader
Data row height 和 cell padding：Table、DataGrid
Control padding 和 gap
```

Switch 的轨道宽高、Slider 的轨道和 Thumb、Progress 的厚度属于组件族规格，不直接套 Control Height。

## 6. 组件级公开 Token

组件只公开高价值、稳定、用户经常调整的规格。

示例：

```text
Button/Input/Select
- 当前 height、icon-size
- 各 size 的可选组件覆盖

Dialog/Drawer
- width/size、max-height、overlay、shadow、motion、z-index

Popover/Tooltip
- min/max width、background、foreground、shadow、motion

Tree
- indent、item height、line color、drop indicator color

Slider
- track size、thumb size、track/range background

Progress
- track size、track/value background

Table/DataGrid
- row height、cell padding、header background、border、sticky shadow

Avatar
- current size、各 size 的可选组件覆盖
```

组件变量默认使用系统 Token fallback，不在 `:root` 中重复声明全部默认值。

### 6.1 组件 Token 四条硬性规范

以下规则是组件 Token 的实现和审查标准，所有组件及五个框架实现都必须遵守。

#### 1. 消费时 fallback，禁止在组件节点声明默认值

组件必须在消费变量的位置回退到系统 Token：

```css
background: var(--dropdown-content-background, var(--elevated-background));
```

对应 Tailwind 写法：

```text
bg-[var(--dropdown-content-background,var(--elevated-background))]
```

禁止在组件节点先声明默认值再消费：

```css
/* 错误：组件自身的声明会遮蔽祖先节点传入的组件变量。 */
--dropdown-content-background: var(--elevated-background);
background: var(--dropdown-content-background);
```

消费时 fallback 必须保证以下覆盖层级都能工作：

```text
系统 Token
→ 用户可选的组件组 Token
→ :root 或主题节点上的组件 Token
→ 局部容器上的组件 Token
→ 单实例 style
```

#### 2. 系统主题只保留跨组件语义 Token

`packages/styles` 中的明暗主题只定义真正跨组件共享、并且用户希望共同变化的语义，例如
`background`、`elevated-background`、`border`、`selected-background` 和 `mask`。

禁止把组件名称直接沉淀为系统 Token，例如：

```text
--card-background
--popover-background
--select-content-background
```

Card、Popover、Select 等组件应分别提供组件 Token，并回退到合适的系统 Token。多个组件需要被用户编成一组时，用户可以定义组 Token，再把具体组件 Token 指向该组；组件库不为主观业务分组预设大量全局变量。

#### 3. 组件 Token 属于组件样式模块和公开 API

组件 Token 的名称、fallback 和消费方式定义在 `packages/@fex-design/styles/src/<component>.ts` 对应的组件样式事实源中。五个框架共享同一套变量名称、fallback 和部件语义；CLI 输出源码时将最终样式内联到复制出的组件源码。

`packages/styles/src/components-token.css` 是推荐的组件级集中覆盖入口，不是唯一覆盖入口。用户可以在这里定义某个组件变量以覆盖该组件的全部实例，也可以通过作用域 CSS 覆盖某个区域，或通过 `style` 覆盖单个实例。

组件 Token 默认应保持未定义，并依赖消费位置的系统 Token 或组件内置值 fallback。当前尚未完成逐组件重构的旧变量可以暂时保留在 `components-token.css` 中，以维持现有视觉；对应组件完成消费时 fallback 后必须删除这里的默认声明。不得为了列出变量而重复声明，也不得把组件 Token 提升成系统 Token。

所有稳定公开的组件 Token 必须进入组件 API JSON 和文档，至少记录：

- 变量名称和类型。
- 所属组件部件。
- 默认 fallback。
- 全局、局部作用域和单实例覆盖示例。
- 是否属于稳定公开契约。

#### 4. Portal 组件必须提供完整的局部覆盖通道

CSS Variable 只能沿真实 DOM 祖先链继承。Dropdown、Select、Popover、Dialog 等内容 Portal 到 `body` 后，无法继承触发器业务容器上的局部变量。因此所有 Portal 组件必须同时提供：

- Content 等实际浮层部件的 `class` 和 `style` 覆盖能力。
- 可配置的 Portal `container`，允许浮层挂载到局部主题容器内。
- 在 UI 组合层提供结构化的部件样式入口，例如 `partClassName`、`partStyle` 或框架等价 API。

`:root` 和主题节点上的组件变量仍可覆盖所有 Portal 实例；局部容器覆盖只有在 Portal 挂载于该容器内部时才依赖继承生效。禁止通过自动复制任意 computed CSS Variable 来掩盖 Portal 边界，这会增加运行时成本并造成不可追踪的同步行为。

## 7. 不公开的内容

以下不作为稳定 CSS Variable：

- `display`、`position`、flex/grid 结构、overflow、pointer-events。
- data-state、focus、keyboard、Portal、拖拽 transform 等交互实现。
- 每一个内部 margin、padding、gap。
- Dialog 标题 margin、Select 箭头 margin 等微小 DOM 细节。
- Slider offset、Tree line position 等计算中间值。
- 仅属于一个组件的一次性布局数字。

内部计算确实需要 CSS Variable 时使用私有命名，例如：

```text
--_dialog-content-offset
--_slider-thumb-offset
```

私有变量不进入 API JSON 和正式文档，不保证稳定。

## 8. Token 提取标准

候选值必须满足以下判断：

1. 是否至少被两个不同组件族使用？
2. 是否表达同一种设计语义，而非数字恰好相同？
3. 用户修改后是否希望相关组件共同变化？
4. 是否可能只修改某一组件族？
5. 修改后是否不破坏组件行为和可访问性？
6. 名称能否长期稳定？
7. 普通 `class/style` 是否已经足够？

结论规则：

```text
跨组件共享且希望共同变化 → 系统 Token
组件族高频独立定制       → 组件 Token
单实例偶尔修改           → class/style
内部结构与计算           → 私有变量或硬编码
```

## 9. 文档要求

API JSON 应记录公开 CSS Variable：

```json
{
  "name": "--button-height",
  "description": "当前 Button 实例的最终高度。",
  "fallback": "对应 size 的 Button Token 或 Control Token",
  "scope": "instance",
  "part": "root"
}
```

每个公开 Token 文档必须说明：

- 默认值或 fallback。
- 影响的组件或部件。
- 系统级、组件级还是实例级。
- 全局覆盖、作用域覆盖和实例覆盖示例。
- 是否属于稳定公开契约。

## 10. 后续审查流程

逐组件重构时执行：

1. 搜索硬编码尺寸、字号、图标、圆角、阴影、动画和 z-index。
2. 判断它是系统 Token、组件 Token、私有变量还是应继续保留的 class。
3. 对齐五框架最终 class、CSS Variable 名称和 fallback。
4. 验证用户 class 在默认样式之后进入 `cn`。
5. 验证 `style` 可以覆盖组件当前变量。
6. 在文档 Demo 中展示系统、组件和单实例三种覆盖方式。
