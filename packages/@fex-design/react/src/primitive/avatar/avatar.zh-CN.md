# React Avatar Primitive

提供可组合的 Avatar 原子组件。Primitive 负责图片状态、fallback、badge、分组布局和计数节点；自动截断由 UI AvatarGroup 负责。

## 导入

    import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from '@fex-design/react/primitive/avatar'

## 组件

| 组件 | 元素 | 说明 |
| --- | --- | --- |
| Avatar | span | 继承原生 span，原生 span 的所有属性和事件均可透传；头像根节点，控制 size 与 shape。 |
| AvatarImage | img | 继承原生 img，原生 img 的所有属性和事件均可透传；图片节点，仅在加载成功后显示。 |
| AvatarFallback | span | 继承原生 span，原生 span 的所有属性和事件均可透传；图片不可用时的替代内容。 |
| AvatarBadge | span | 继承原生 span，原生 span 的所有属性和事件均可透传；右下角状态或图标节点。 |
| AvatarGroup | div | 继承原生 div，原生 div 的所有属性和事件均可透传；重叠头像的布局容器，不负责自动截断。 |
| AvatarGroupCount | span | 继承原生 span，原生 span 的所有属性和事件均可透传；分组的数量或自定义溢出节点。 |

## 示例

示例保存在 `examples/<name>`，作为官网预览源码。

| 名称 | 覆盖内容 |
| --- | --- |
| basic | 图片与 fallback。 |
| badge | 状态标记。 |
| badge-with-icon | Badge 内的图标。 |
| group | 重叠头像组。 |
| group-count | 手动数量节点。 |
| group-with-icon | 自定义溢出图标。 |
| sizes | sm、md、lg。 |
| shape | circle 与 square。 |
| group-shape | 方形头像组。 |
| max-count | Primitive 手动组合计数节点。 |
| direction | LTR 与 RTL。 |

## Avatar API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 头像尺寸。 |
| shape | 'circle' \| 'square' | 'circle' | 头像形状。 |

## AvatarImage API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| src | string | — | 图片地址。 |
| alt | string | '' | 替代文本。 |
| srcSet | string | — | 响应式图片地址。 |

## 组合边界

`AvatarGroup` 只处理布局。需要 `maxCount` 自动截断时使用 UI `AvatarGroup`。

组件透传对应 HTML 元素属性与事件，使用 `ref` 获取根元素。
