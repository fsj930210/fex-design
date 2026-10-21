# Menu UI

Import Menu, MenuItem, SubMenu, SubMenuTrigger, SubMenuContent, MenuGroup and MenuSeparator from @fex-design/solid/ui/menu.

Menu accepts items for default rendering or composed content, never both. MenuItem has no label prop: its content is native children, slots, snippets or content projection. icon and suffix are optional. The data item label maps to this content.

layout: vertical (side popup), horizontal (first popup below), inline (vertical nested content). multiple defaults to false; value and change payloads always remain string arrays. Multi-selection toggles values and keeps popup expansion; single selection replaces with [value].

SubMenu accepts value, popoverProps and nested content. Trigger and Content own their respective native attributes and styles. popoverProps configures positioning, collision, portal target, lazyMount and destroyOnHidden; disclosure and triggering remain owned by Menu. Angular SubMenuContent requires a content TemplateRef.

Custom hosts use render(binding) in React/Solid, #trigger in Vue, trigger snippet in Svelte, or native button[menuItem]/a[menuItem] in Angular. Bind supplied props and ref/action; binding.content preserves the assembled icon/body/suffix. Data leaf rendering uses renderItem, #item, item snippet, or itemTemplate respectively.

UI composes Primitive and shares its controller. useMenu is also available for independent custom DOM. See examples/basic, controlled, custom-item, multiple, popover-props and use-menu.

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

## Composed popup styles

SubMenu.popoverProps.classNames/styles support root (the panel) and content (the body), in both Primitive and UI, including UI items data. Default panel appearance reuses Popover styles and its menu preset. Explicit SubMenuContent class/style merges last. Inline layout ignores popup presentation. Use the framework-native MenuPopoverProps type exported by the menu entry.

UI Menu classNames/styles target root, item, subMenuTrigger, subMenuContent, group and separator. Root always applies; other keys target items-generated parts. Composed parts receive their native class/style directly. Popup interior remains owned by popoverProps.
