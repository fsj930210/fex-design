# Vue Avatar UI

可直接使用的完整 Avatar 与 AvatarGroup。UI Avatar 组合图片与 fallback；UI AvatarGroup 统一提供 `maxCount` 自动截断。

## 导入

    import { Avatar, AvatarGroup } from '@fex-design/vue/ui/avatar'

## 组件

| 组件 | 说明 |
| --- | --- |
| Avatar | 完整的图片或 fallback 头像。 |
| AvatarGroup | 组合头像并自动显示溢出数量。 |

## Avatar API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| src | string | — | 图片地址。 |
| alt | string | '' | 替代文本。 |
| srcSet | string | — | 响应式图片地址。 |
| fallback | 框架原生内容类型 | — | 图片不可用时的内容。 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 头像尺寸。 |
| shape | 'circle' \| 'square' | 'circle' | 头像形状。 |

## AvatarGroup API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| maxCount | number | — | 最多显示的头像数量。 |
| renderOverflow | 框架原生内容类型 | — | 自定义溢出节点。 |

`AvatarGroup` 接收默认 slot 中的 `Avatar`，通过 `#overflow="{ count, items }"` 自定义溢出节点。

## 示例

示例保存在 `examples/<name>`，覆盖 basic、group、group-count、group-with-icon、sizes、shape、group-shape、max-count 和 direction。
