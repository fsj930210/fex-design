# Angular UI Input

由 Primitive Input 组合而成的开箱即用 `Input`、`InputPassword` 和 `InputSearch`；`InputGroup` 保持 Primitive API 原样转出。

## 导入

    import { Input, InputPassword, InputSearch, InputGroup } from '@fex-design/angular/ui/input'

## 示例

| 名称 | 覆盖内容 |
| --- | --- |
| basic | 空 Input 和可清除 Input。 |
| sizes | `sm`、`md`、`lg`，与 Primitive 使用相同场景。 |
| variants | 四种结构形态。 |
| controlled | 受控、非受控值以及外部更新。 |
| affixes | Prefix、Suffix、Addon、图标内容和输入框内文本操作。 |
| group | Input 与 Button、Input 与 Input 的组合。 |
| password | 密码可见性、关闭切换、清除和 `aria-invalid`。 |
| search | loading、仅 Enter 搜索、Prefix 搜索和 Addon 搜索操作。 |
| states | Input 家族的禁用、只读和错误状态。 |
| focus | 命令式聚焦、失焦和全选。 |
| semantic-styles | 结构化 class/style、状态选择器和基础 CSS Variables。 |

## Input API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value | string | — | 受控值。 |
| defaultValue | string | `''` | 非受控初始值。 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 高度为 24px、32px 或 44px。 |
| variant | `'outlined' \| 'filled' \| 'borderless' \| 'underlined'` | `'outlined'` | 视觉结构。 |
| clearable | boolean | false | 启用仅在交互状态显示的清除操作。 |
| prefix / suffix | 内容输入接受字符串或 `TemplateRef`；Primitive 使用内容投影。 | — | InputRoot 内部内容；普通 Input 中不承担交互。 |
| addonBefore / addonAfter | 内容输入接受字符串或 `TemplateRef`；Primitive 使用内容投影。 | — | 位于 Input 聚焦环之外的附加内容。 |
| classNames | 结构区域 class 映射 | — | root、control、prefix、suffix、clear、addon 和 action 的 class。 |
| styles | 结构区域 style 映射 | — | 相同语义区域的框架原生 style。 |
| 原生属性 | `input[inputControl]` 上的原生属性和事件 | — | 原生 input 属性与事件。 |

## InputPassword

增加 `visibilityToggle`，默认值为 `true`，内部使用无额外视觉样式的操作按钮。切换输入类型时保留值和真实原生输入控件。

## InputSearch

默认在结束 Addon 提供搜索 Button；将 `addonAfter` 显式设为 `null` 可移除。`loading` 使用加载指示器替换搜索图标，并阻止重复搜索。Enter、Prefix、Suffix、AddonBefore、AddonAfter 会连同当前值报告 `source`。只有 InputSearch 会让已配置的搜索位置承担点击搜索行为。

## 元素访问

`InputControl.element` 暴露原生 input；UI Input 暴露 `focus()`、`blur()` 和 `select()`。

## 样式扩展

使用原生 `class`、`classNames` 和 style 绑定。 使用 `classNames` / `styles` 定位语义区域，使用选择器覆盖 hover、focus 和错误状态；可复用主题使用 `--input-background`、`--input-border-color`、`--input-color`、`--input-placeholder-color`、`--input-ring-color` 和 `--input-group-radius` 等基础变量。

## 无障碍

UI Input 保留真实原生 input。通过 Field 或原生 Label 提供可访问名称；错误状态只使用 `aria-invalid`。Password 和 Search 操作均为带可访问名称的原生按钮，loading 时遵循禁用行为。