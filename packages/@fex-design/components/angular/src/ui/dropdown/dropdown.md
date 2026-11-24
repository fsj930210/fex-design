# angular UI Dropdown

# Dropdown UI

Dropdown UI 是 Dropdown Primitive、Menu UI 和 Button Primitive 的快捷组合。它不新增状态或数据协议。

## Props

- `items` 直接使用 Menu UI 的 `MenuItemData` / `MenuEntry` 类型并传给 Menu 的内容渲染入口。
- `open`、`defaultOpen`、`disabled`、`closeOnSelect` 和 `onOpenChange` 是常用根级快捷属性。
- `menuProps` 透传其余 Menu 配置；`popoverProps` 透传定位、触发、挂载和关闭配置。
- `layout`、`inlineAccordion`、内部触发器 ID、根 `disabled` 和根 `onActivate` 不从透传对象覆盖。

`items` 是 UI 快捷组件的必填入口。需要完全控制 DOM 时，使用对应框架的 Dropdown Primitive；UI 不重复维护 open、value、openValues 或焦点状态。

## Composition

UI 使用 Dropdown Primitive 的 Root、Trigger、Portal、Content，并将 `items` 交给 Menu UI 的 `MenuItems`。Popover、Menu 的焦点、键盘、关闭和子菜单行为均由 Primitive/core 提供。

## Styling

Dropdown UI 不声明专属 CSS 变量。外观通过 Button、Popover、Menu、MenuItem 的 CSS 变量、class/style 和结构化样式入口定制。
