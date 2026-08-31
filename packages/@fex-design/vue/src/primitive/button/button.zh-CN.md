# Vue Primitive Button

提供原生元素透传的底层 Button 家族原子组件。

## 导入

    import { Button, ButtonGroup, ButtonIcon } from '@fex-design/vue/primitive/button'

## 组件

| 组件        | 元素   | 说明                                                                  |
| ----------- | ------ | --------------------------------------------------------------------- |
| Button      | button | 继承原生 button，原生 button 的所有属性和事件均可透传；原生按钮基础。 |
| ButtonIcon  | span   | 继承原生 span，原生 span 的所有属性和事件均可透传；图标容器。         |
| ButtonGroup | div    | 继承原生 div，原生 div 的所有属性和事件均可透传；布局与连接按钮分组。 |

## 示例

示例保存在 `examples/<name>`，作为文档预览的源码。

| 名称          | 覆盖内容                         |
| ------------- | -------------------------------- |
| basic         | 默认与 Primary 按钮。            |
| variants      | 视觉变体与语义色。               |
| sizes         | 文本与图标尺寸。                 |
| states        | 禁用、加载与按压状态。           |
| loading       | 加载位置与自定义指示器。         |
| icons         | 前置、后置与纯图标内容。         |
| direction     | LTR 与 RTL。                     |
| effects       | hover、press、underline 等反馈。 |
| combinations  | 常见属性组合。                   |
| group         | 连接式、有间距与垂直按钮组。     |
| css-variables | 实例级 CSS Variables。           |

## Button API

| 名称     | 类型                                                              | 默认值     | 说明                                   |
| -------- | ----------------------------------------------------------------- | ---------- | -------------------------------------- |
| variant  | 'solid' \| 'outlined' \| 'dashed' \| 'filled' \| 'text' \| 'link' | 'outlined' | 按钮结构变体。                         |
| color    | 'primary' \| 'danger' \| 'warning' \| 'success' \| 'info'         | —          | 可选语义配色；未设置时为默认白底按钮。 |
| type     | 'button' \| 'submit' \| 'reset'                                   | 'button'   | 原生按钮类型。                         |
| 原生属性 | Vue button attrs                                                  | —          | 透传原生属性与事件。                   |
| 元素访问 | exposed ref                                                       | —          | 获取原生 `HTMLButtonElement`。         |

## ButtonIcon API

| 名称     | 类型           | 默认值 | 说明                       |
| -------- | -------------- | ------ | -------------------------- |
| 原生属性 | Vue span attrs | —      | 透传原生 span 属性与事件。 |

## 书写方向

`Button`、`ButtonIcon` 和 `ButtonGroup` 透传原生 `dir="ltr"` / `dir="rtl"`。Button 动效和分组连接样式使用逻辑 `start` / `end`。

## ButtonGroup API

| 名称        | 类型                       | 默认值       | 说明                                     |
| ----------- | -------------------------- | ------------ | ---------------------------------------- |
| orientation | 'horizontal' \| 'vertical' | 'horizontal' | 排列方向。                               |
| spacing     | `number \| string`         | `0`          | 间距；数字按像素处理，`0` 启用连接样式。 |
| 原生属性    | Vue div attrs              | —            | 透传原生 div 属性与事件。                |
