# Vue UI Button

提供视觉类型、尺寸、动效、图标和加载状态的推荐 Button；此入口同时转出 ButtonGroup。

## 导入

    import { Button, ButtonGroup } from '@fex-design/vue/ui/button'

## 示例

示例保存在 `examples/<name>`，作为文档预览的源码。

| 名称              | 覆盖内容                                       |
| ----------------- | ---------------------------------------------- |
| basic             | 默认与描边按钮。                               |
| variants          | 全部视觉变体。                                 |
| sizes             | 文本与纯图标尺寸。                             |
| effects           | 全部按需开启的交互效果。                       |
| icons             | 起始、结束与纯图标内容。                       |
| loading           | 默认加载状态与位置。                           |
| loading-indicator | 自定义加载指示器。                             |
| states            | 原生表单行为、禁用状态、属性、事件与元素访问。 |
| group             | 连接、间隔、水平与垂直按钮组。                 |
| combinations      | 多属性组合以及 LTR、RTL 方向。                 |

## Button API

| 名称             | 类型                                                                                                                          | 默认值        | 说明                               |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------- | ---------------------------------- |
| variant          | 'solid' \| 'outlined' \| 'dashed' \| 'filled' \| 'text' \| 'link'                                                               | 'outlined'    | 按钮结构变体。                     |
| color            | 'primary' \| 'danger' \| 'warning' \| 'success' \| 'info'                                                                    | —             | 可选语义配色；未设置时为默认白底按钮。 |
| size             | 'xs' \| 'sm' \| 'default' \| 'lg' \| 'xl' \| 'icon-xs' \| 'icon-sm' \| 'icon' \| 'icon-lg' \| 'icon-xl'                       | 'default'     | 控件尺寸。                         |
| effect           | 'expand-icon' \| 'ring-hover' \| 'shine-hover' \| 'gooey-start' \| 'gooey-end' \| 'underline' \| 'hover-underline' \| 'press' | undefined     | 可选交互动效；默认不启用。         |
| icon             | 框架内容类型                                                                                                                  | `undefined`   | 普通状态图标。                     |
| iconPlacement    | 'start' \| 'end'                                                                                                              | 'start'       | 图标或加载指示器的位置。           |
| loading          | `boolean`                                                                                                                     | `false`       | 是否处于加载状态；加载时禁止交互。 |
| loadingIndicator | 框架内容类型                                                                                                                  | `LoadingIcon` | 自定义加载指示器。                 |
| disabled         | `boolean`                                                                                                                     | `false`       | 是否禁用按钮。                     |
| type             | 'button' \| 'submit' \| 'reset'                                                                                               | 'button'      | 原生按钮类型。                     |
| 原生属性         | Vue button attrs                                                                                                              | —             | 透传原生属性与事件。               |
| 元素访问         | exposed ref                                                                                                                   | —             | 获取原生 `HTMLButtonElement`。     |

## 视觉类型

`variant` 控制结构：`solid`、`outlined`、`dashed`、`filled`、`text`、`link`。`color` 可选 `primary`、`danger`、`warning`、`success`、`info`；未设置时使用默认白底配色。两者可以自由组合。

## 交互动效

`expand-icon`、`ring-hover`、`shine-hover`、`gooey-start`、`gooey-end`、`underline`、`hover-underline`、`press`。

所有动效默认关闭；`press` 只在按下期间提供反馈。`gooey-start` 和 `gooey-end` 使用逻辑方向，会随 `dir="ltr"` / `dir="rtl"` 自动镜像。Button 不提供空闲状态下无限循环的装饰动画。

## 书写方向

通过原生 `dir="ltr"` 或 `dir="rtl"` 设置方向。图标位置、gooey 方向、下划线动画和 ButtonGroup 连接布局均使用逻辑 `start` / `end`。

## 内容 API

默认插槽、`icon` 插槽和 `loadingIndicator` 插槽。

## ButtonGroup API

`ButtonGroup` 保持 Primitive API：`orientation`、`spacing`、原生 `div` 属性与原生元素行为。
