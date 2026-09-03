# React UI Empty

基于相同 Primitive 区域组合的快捷 Empty，提供内置图形和结构化样式。

## 导入

    import { Empty } from '@fex-design/react/ui/empty'

## 示例

| 名称 | 覆盖内容 |
| --- | --- |
| basic | 内置图形、标题和说明。 |
| content | 渲染到 EmptyContent 的自定义 children。 |
| image | 图片地址和自定义 React 内容。 |
| direction | 中文 LTR 与阿拉伯语 RTL 布局。 |
| styling | 结构化 classNames 和 styles。 |

前四个示例与 Primitive Empty 的文案、布局和最终展示保持一致。

## Empty API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| image | ReactNode \| string \| null | 内置图形 | 图片地址或自定义图片；`null` 隐藏媒体区域。 |
| title | ReactNode | — | 空状态主标题。 |
| description | ReactNode | — | 补充说明。 |
| children | ReactNode | — | 渲染到 EmptyContent 的内容。 |
| classNames | EmptyClassNames | — | root、header、image、title、description、content 的类名。 |
| styles | EmptyStyles | — | 六个语义区域的行内样式。 |
| 原生属性 | ComponentProps<'div'> | — | 根元素原生属性与事件。 |

## 结构化样式

通过 `classNames` 和 `styles` 对单个实例的 root、header、image、title、description、content 进行定制。Empty 不提供组件专属 CSS 变量。

## 书写方向

透传原生 `dir="ltr"` 或 `dir="rtl"`。对齐和内容布局跟随继承的书写方向。

## 无障碍

Empty 默认是展示内容。仅在动态变化需要播报时添加实时区域语义；通过 children 提供的操作控件继续使用自身原生无障碍名称和键盘行为。
