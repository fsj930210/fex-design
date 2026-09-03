# React Primitive Empty

用于组合媒体、标题、说明和操作内容的有样式空状态区域。

## 导入

    import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from '@fex-design/react/primitive/empty'

## 组件

| 组件 | 元素 | 说明 |
| --- | --- | --- |
| Empty | div | 空状态根容器。 |
| EmptyHeader | div | 组合媒体、标题和说明。 |
| EmptyMedia | div | 媒体或图片容器。 |
| EmptyTitle | div | 空状态主标题。 |
| EmptyDescription | p | 补充说明。 |
| EmptyContent | div | 操作或自定义内容。 |

每个组件均向对应宿主元素透传原生属性、事件、class、style、ARIA 属性、children 和 ref。

## 示例

| 名称 | 覆盖内容 |
| --- | --- |
| basic | 内置空状态组合。 |
| content | 自定义操作内容。 |
| image | 自定义图片内容。 |
| direction | 中文 LTR 与阿拉伯语 RTL 布局。 |

四个示例与 UI Empty 的文案、布局和最终展示保持一致。

## API

组件族不增加状态属性。直接组合各区域，并通过对应原生宿主独立定制样式。

## 书写方向

向 `Empty` 透传原生 `dir="ltr"` 或 `dir="rtl"`。对齐和内容布局跟随继承的书写方向。

## 无障碍

Empty 默认是展示内容。仅当动态更新的空状态需要播报时，添加 `role="status"` 和 `aria-live="polite"`。
