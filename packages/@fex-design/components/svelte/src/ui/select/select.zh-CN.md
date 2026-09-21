# Select

UI Select 是基于 items 的快捷组合。任意数据通过 `fieldNames.value` 和 `fieldNames.label` 映射；`disabled` 仍是每个项目自身的布尔字段。

共享 Input 的配置放入 `inputProps`，Popover 配置放入 `popoverProps`；`getPopupContainer` 保持在 Select 顶层并从 `popoverProps` 排除。清除内容名为 `clear`，`suffix` 可接收任意内容。loading、clear、suffix 和默认下拉箭头共用一个展示位。

Select 不定义独立 CSS Variables；通过 Input、Popover、结构化部位和 `virtual.itemHeight` 定制。

