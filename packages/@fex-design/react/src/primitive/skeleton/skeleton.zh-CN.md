# React Primitive Skeleton

提供带基础样式、可独立组合的 Skeleton 占位组件；每个组件都以原生 `div` 为宿主。

## 导入

    import { SkeletonAvatar, SkeletonBlock, SkeletonButton, SkeletonImage, SkeletonInput, SkeletonText } from '@fex-design/react/primitive/skeleton'

## 组件

| 组件 | 元素 | 用途 |
| --- | --- | --- |
| SkeletonText | div | 单行文本占位；多行内容由多个 SkeletonText 组合。 |
| SkeletonAvatar | div | 与 Avatar 尺寸对齐的圆形或方形头像占位。 |
| SkeletonButton | div | 与 Button 高度对齐的普通、圆角、方形或圆形按钮占位。 |
| SkeletonInput | div | 与 Input 默认高度对齐的输入框占位。 |
| SkeletonBlock | div | 不预设业务尺寸的通用块，占位宽高由 class 或 style 决定。 |
| SkeletonImage | div | 带内置图片图标的图片区域占位，宽高可覆盖。 |

## 示例

示例保存在 `examples/<name>`，作为文档预览的源码。

| 名称 | 覆盖内容 |
| --- | --- |
| basic | 六个 Primitive 的默认形态、头像形状和按钮形状。 |
| list | 头像与多行文本组成的列表骨架。 |
| table | 表头、单元格和操作按钮组成的表格骨架。 |
| image | 图片、标题和正文组成的图文骨架。 |
| form | 标签、输入框和提交按钮组成的表单骨架。 |
| animation | 无动画、呼吸和流光三种模式。 |

## 公共 API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| animation | 'none' \| 'pulse' \| 'wave' | 'none' | 占位动画；`none` 静止，`pulse` 呼吸，`wave` 流光。 |
| 原生属性 | `ComponentProps<'div'>` | — | 透传原生 div 属性与事件，包括 `class`、`style`、`data-*` 和 `aria-*`。 |
| 元素访问 | 框架原生方式 | — | `ref` 获取原生 `HTMLDivElement`。 |

## SkeletonText API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| animation | SkeletonAnimation | 'none' | 占位动画。 |
| round | boolean | false | 是否使用全圆角；组件始终只表示一行文本。 |

## SkeletonAvatar API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| animation | SkeletonAnimation | 'none' | 占位动画。 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 与 Avatar 的三档尺寸对齐，也可通过 class/style 覆盖宽高。 |
| shape | 'circle' \| 'square' | 'circle' | 圆形或带基础圆角的方形头像。 |

## SkeletonButton API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| animation | SkeletonAnimation | 'none' | 占位动画。 |
| size | 'xs' \| 'sm' \| 'default' \| 'lg' \| 'xl' | 'default' | 与 Button 的五档高度对齐。 |
| shape | 'round' \| 'square' \| 'circle' | — | 不传为普通矩形；`round` 为胶囊圆角，`square` 等宽方形，`circle` 等宽圆形。 |
| block | boolean | false | 是否占满父容器宽度。 |

## SkeletonInput API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| animation | SkeletonAnimation | 'none' | 占位动画。 |
| block | boolean | false | 是否占满父容器宽度；默认宽度为 16rem。 |

## SkeletonBlock API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| animation | SkeletonAnimation | 'none' | 占位动画。 |
| width / height | class 或 style | — | 组件不提供专用宽高属性，使用原生 class/style 设置。 |

## SkeletonImage API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| animation | SkeletonAnimation | 'none' | 占位动画。 |
| width / height | class 或 style | 6rem × 6rem | 使用原生 class/style 覆盖默认图片区域尺寸。 |

## 可访问性

所有占位组件均不可交互并设置 `aria-hidden="true"`。它们只表达加载布局，不替代真实内容的语义和可访问名称。

