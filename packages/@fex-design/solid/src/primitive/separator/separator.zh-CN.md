# Solid Primitive Separator

提供语义分隔和原生 `div` 属性透传的底层 Separator。

## 导入

    import { Separator } from '@fex-design/solid/primitive/separator'

## 示例

示例保存在 `examples/<name>`，作为文档预览源码。

| 名称 | 覆盖内容 |
| --- | --- |
| basic | 语义水平分隔线。 |
| vertical | 语义垂直分隔线。 |

## Separator API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| orientation | `'horizontal' \| 'vertical'` | `horizontal` | 分隔线方向。 |
| 原生属性 | Solid div attrs | — | 透传原生属性与事件。 |

## 无障碍

Separator 始终输出 `role="separator"`，并通过 `aria-orientation` 暴露方向。
