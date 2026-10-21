# Menu

从 `@fex-design/svelte/primitive/menu` 具名导入 MenuRoot / MenuContent provide composition and default styles. UI adds items, icon and suffix assembly; Primitive keeps direct host content.

`Menu` 可以用 `items` 快速渲染，也可以直接组合 UI 部件；两种方式互斥。`MenuItem` 不提供 `label`，内容使用 children、默认插槽或内容投影，另有可选 `icon` 和 `suffix`。数据对象的 `label` 仅作为默认选项内容。

## 布局与状态

- `layout="vertical"`：垂直排列，子菜单侧向浮层。
- `layout="horizontal"`：水平排列，首层子菜单向下浮层，后续侧向浮层。
- `layout="inline"`：垂直排列，子菜单内嵌展开。
- `multiple` 默认 `false`，点击替换选中值；为 `true` 时切换选中状态。值与事件始终使用字符串数组，单选只保留第一个值。
- `value/defaultValue` 控制选择，`openValues/defaultOpenValues` 控制展开。默认值只初始化读取；配置同步不触发用户事件。
- 单选浮层点击后关闭，多选浮层保持展开。`inlineAccordion` 控制内嵌同级互斥。

## 自定义

React/Solid 的 `render(binding)`、Vue 的 `#trigger`、Svelte 的 `trigger` snippet 可以替换宿主，绑定原生属性与 ref/action，使用 `binding.content` 保留组装内容。Angular 直接使用原生 `button[menuItem]`、`a[menuItem]`。

数据模式分别通过 `renderItem`、`#item`、`item` snippet、`itemTemplate` 自定义叶子项。更自由的层级结构直接组合 UI 部件。

`SubMenu` 接收 `value`、`popoverProps` 与子内容。`SubMenuTrigger` 接收内容、`icon`、`suffix`、`indicator`，`indicator=false` 隐藏箭头。`SubMenuContent` 接收自身的原生属性与内容。

`popoverProps` 只开放定位、碰撞、容器和挂载策略：placement、side、align、sideOffset、alignOffset、strategy、avoidCollisions、collisionBoundary、collisionPadding、matchReferenceWidth、hideWhenDetached、zIndex、getPopupContainer、lazyMount、destroyOnHidden。不开放展开状态、触发方式及状态回调；这些由 Menu 统一管理。内嵌模式始终保留子内容实例，不使用浮层定位。

Angular 的内容使用 `<div subMenuContent [content]="popup"></div>` 与 `<ng-template #popup>...</ng-template>`，以支持实际的懒挂载及销毁。

UI 只组装 Primitive，选择、展开、键盘行为与浮层共享同一套逻辑。需要自行实现 DOM 时可独立消费 `useMenu`。

## 示例

- `basic`: 基本用法 - 三个菜单项，点击后观察选中值；不混入子菜单和布局对比。
- `vertical`: 纵向菜单 - 垂直排列，打开侧向浮层并继续打开嵌套子菜单。
- `horizontal`: 横向菜单 - 水平排列，首层子菜单向下展开，嵌套子菜单侧向展开。
- `inline`: 内嵌菜单 - 垂直排列，子菜单在文档流内逐级展开。
- `state`: 受控与非受控 - 外部按钮设置受控选择与展开，对照仅传默认值的非受控菜单。
- `multiple`: 单选与多选 - 外部切换 multiple；单选替换，多选切换，值始终为数组。
- `custom-item`: 自定义渲染 - 在完整菜单中自定义个人资料项：链接宿主、头像与双行内容，保留选择和键盘交互。
- `group`: ???? - ?? MenuGroup ? MenuGroupLabel ????????
- `indicator`: 自定义 indicator - 在同一菜单中对比默认箭头与自定义指示器，点击展开子菜单。
- `semantic-styles`: 结构化样式 - 整体定制菜单容器、选项、触发器、分组、分隔线和子菜单浮层，对比默认外观。
- `css-variables`: CSS 变量 - 切换完整菜单的主题，观察背景、文字、hover、选中、禁用、圆角与尺寸。
- `direction`: LTR / RTL - 使用同一菜单对比文字、缩进、箭头和侧向浮层方向。
- `popover-props`: 子菜单浮层 - 设置偏移、碰撞、容器与挂载策略，并展示自定义浮层头部。
- `use-menu`: useMenu - 使用 useMenu 和手写 DOM 实现自己的 Menu，展示选择、子菜单、禁用与键盘导航。

## 组合浮层样式

两层均通过 SubMenu.popoverProps.classNames/styles 设置 root（浮层面板）和 content（内容区），UI items 数据同样支持。默认面板复用 Popover 样式及菜单浮层预设，不传配置时两层外观一致。SubMenuContent 显式 class/style 后合并；内嵌布局不使用浮层展示配置。MenuPopoverProps 从对应框架的 menu 入口导入，styles 使用该框架原生样式类型。
