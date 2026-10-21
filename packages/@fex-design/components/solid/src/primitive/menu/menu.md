# Menu Primitive

Import named parts and useMenu from @fex-design/solid/primitive/menu.

## Composition

MenuRoot -> MenuContent -> MenuItem / MenuGroup / MenuSeparator / SubMenu.
SubMenu contains SubMenuTrigger and SubMenuContent; SubMenuContent can contain another SubMenu.
Root and SubMenu establish logic scopes. Their framework-specific hosts do not introduce layout boxes.

## Layout

| layout             | Root direction | Nested content                                          |
| ------------------ | -------------- | ------------------------------------------------------- |
| vertical (default) | Vertical       | Side popup                                              |
| horizontal         | Horizontal     | First popup below, subsequent popups at the logical end |
| inline             | Vertical       | Inline, indented                                        |

All parts have default styles. size is sm / md / lg (default md); dir is ltr / rtl (default ltr).
Styling belongs to each host through its native class and style. SubMenuContent.container overrides the popup mount target (default ownerDocument.body); inline mode keeps the host in document flow.

## State and events

value / defaultValue and openValues / defaultOpenValues are string arrays. Values must be unique within one MenuRoot; independent roots can reuse values. Undefined means uncontrolled. Defaults are read only at initialization. Removing a controlled value retains its latest resolved state.
multiple defaults to false: clicking a leaf replaces selection with [value]. With multiple=true, clicking toggles that value. Selection is always an array; single mode resolves only its first value. Configuration synchronization emits no user change event.
Inline mode allows several expanded branches; inlineAccordion makes siblings mutually exclusive. Popup modes open one ancestor path. Switching layout closes uncontrolled expansion without emitting a user event; controlled openValues remains caller-owned.

activate runs for every leaf activation and can be cancelled with info.preventDefault(). valueChange reports actual selection changes. openChange reports actual expansion changes. Configuration synchronization does not emit these events. Single popup activation closes the path; multi-selection and inline activation preserve expansion.
Angular exposes valueChange / openValuesChange arrays plus change / openChange details. Vue also exposes update:value / update:openValues. React, Solid and Svelte use onValueChange / onOpenChange / onActivate.

## Interaction

Arrow keys, Home / End, text navigation, Enter / Space, Escape and RTL are handled by the shared instance. Inline up/down traverses visible descendants; popup navigation stays in its current level. Tab leaves the menu and closes popup expansion. Disabled native and custom hosts suppress activation. Dynamic hosts register and clean up with their framework lifecycle.
submenuTrigger is click (default) or hover for popup layouts. Hover uses openDelay (100 ms) and closeDelay (180 ms); touch and keyboard keep explicit activation. Popover core owns popup positioning and collision handling.

## Custom hosts and independent logic

Render function receives reactive props and state getters. Spread props directly; do not destructure reactive values.

useMenu creates an independent controller, observable snapshot and dom binding. Register custom DOM with dom.bindItem(element, () => ({ value, disabled, textValue }), parent?, branch?) and dom.bindContent(element, branch?, () => ({ container })). Both return cleanup functions. A branch is { value: () => string, parent }; pass the same branch to its trigger and content. Call dom.refresh() after custom configuration changes. The built-in parts consume this same logic.
The native binding action/ref is required for custom hosts; setting ARIA attributes alone does not register behavior. Use textValue when visible content is not a suitable navigation label.

## Parts

MenuRoot, MenuContent, MenuItem, SubMenu, SubMenuTrigger, SubMenuContent, MenuGroup, MenuGroupLabel, MenuSeparator.
GroupLabel is associated with its group automatically. A leaf is role=menuitem with aria-current when selected; no checkbox/radio semantics are implied.
Menu does not provide tree semantics or filtering. DropdownMenu and ContextMenu may host MenuContent while managing their own top-level trigger and dismissal.

## Examples

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

## CSS variables

--menu-item-height, --menu-indent. Set overrides on the owning MenuContent or SubMenuContent; a portaled submenu has its own host styles.

## Submenu popup options

SubMenu.popoverProps accepts presentation-only MenuPopoverProps: positioning, collision, container, lazyMount and destroyOnHidden. Menu owns open state and trigger behavior. Inline layout ignores popup presentation and always retains child instances. Angular SubMenuContent requires a content TemplateRef, so popup presence can actually create and destroy nested content.

## Composed popup styles

SubMenu.popoverProps.classNames/styles support root (the panel) and content (the body), in both Primitive and UI, including UI items data. Default panel appearance reuses Popover styles and its menu preset. Explicit SubMenuContent class/style merges last. Inline layout ignores popup presentation. Use the framework-native MenuPopoverProps type exported by the menu entry.
