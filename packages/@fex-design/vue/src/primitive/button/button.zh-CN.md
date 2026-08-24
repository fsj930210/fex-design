# Vue Primitive Button

提供原生元素透传的底层 Button 家族原子组件。

## 导入

    import { Button, ButtonGroup, ButtonIcon } from '@fex-design/vue/primitive/button'

## 组件

| 组件        | 元素   | 说明                 |
| ----------- | ------ | -------------------- |
| Button      | button | 原生按钮基础。       |
| ButtonIcon  | span   | 图标位置与动效容器。 |
| ButtonGroup | div    | 布局与连接按钮分组。 |

## 示例

示例保存在 `examples/<name>`，作为文档预览的源码。

| 名称        | 覆盖内容                                     |
| ----------- | -------------------------------------------- |
| basic       | 原生按钮基础能力。                           |
| icon        | 起始与结束位置的 ButtonIcon 组合。           |
| group       | 连接、间隔、水平与垂直 ButtonGroup 布局。    |
| native      | 原生表单属性、事件、禁用状态与元素访问。     |
| composition | Button、ButtonIcon 与 ButtonGroup 组合使用。 |

## Button API

| 名称     | 类型                            | 默认值   | 说明                           |
| -------- | ------------------------------- | -------- | ------------------------------ |
| type     | 'button' \| 'submit' \| 'reset' | 'button' | 原生按钮类型。                 |
| 原生属性 | Vue button attrs                | —        | 透传原生属性与事件。           |
| 元素访问 | exposed ref                     | —        | 获取原生 `HTMLButtonElement`。 |

## ButtonIcon API

| 名称      | 类型                                                                                                                          | 默认值    | 说明                       |
| --------- | ----------------------------------------------------------------------------------------------------------------------------- | --------- | -------------------------- |
| placement | 'start' \| 'end'                                                                                                              | 'start'   | 图标位置。                 |
| effect    | 'expand-icon' \| 'ring-hover' \| 'shine-hover' \| 'gooey-start' \| 'gooey-end' \| 'underline' \| 'hover-underline' \| 'press' | undefined | 可选交互动效；默认不启用。 |
| 原生属性  | Vue span attrs                                                                                                                | —         | 透传原生 span 属性与事件。 |

## 书写方向

`Button`、`ButtonIcon` 和 `ButtonGroup` 透传原生 `dir="ltr"` / `dir="rtl"`。图标位置、gooey 方向、下划线动画及分组连接样式均使用逻辑 `start` / `end`。

## ButtonGroup API

| 名称        | 类型                       | 默认值       | 说明                                     |
| ----------- | -------------------------- | ------------ | ---------------------------------------- |
| orientation | 'horizontal' \| 'vertical' | 'horizontal' | 排列方向。                               |
| spacing     | `number \| string`         | `0`          | 间距；数字按像素处理，`0` 启用连接样式。 |
| 原生属性    | Vue div attrs              | —            | 透传原生 div 属性与事件。                |
