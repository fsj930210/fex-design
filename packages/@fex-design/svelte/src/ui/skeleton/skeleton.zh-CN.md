# Svelte UI Skeleton

提供结构化组合版 `Skeleton`，并从同一入口直接重导出全部 Primitive；重导出的单体组件与 Primitive 行为、样式完全一致。

## 导入

    import { Skeleton, SkeletonAvatar, SkeletonBlock, SkeletonButton, SkeletonImage, SkeletonInput, SkeletonText } from '@fex-design/svelte/ui/skeleton'

## 组件

| 组件 | 用途 |
| --- | --- |
| Skeleton | 根据 avatar、title、paragraph 快速生成结构，也可通过 loading 作为内容容器。 |
| SkeletonText | 重导出的单行文本 Primitive。 |
| SkeletonAvatar | 重导出的头像 Primitive。 |
| SkeletonButton | 重导出的按钮 Primitive。 |
| SkeletonInput | 重导出的输入框 Primitive。 |
| SkeletonBlock | 重导出的自由尺寸块 Primitive。 |
| SkeletonImage | 重导出的图片区域 Primitive。 |


## 示例

示例保存在 `examples/<name>`，作为文档预览的源码。

| 名称 | 覆盖内容 |
| --- | --- |
| basic | 从 UI 入口单独使用六个重导出的 Primitive。 |
| list | 头像与多行文本列表。 |
| table | 表头、单元格和操作按钮。 |
| image | 横向图片、标题和正文。 |
| form | 标签、输入框和提交按钮。 |
| animation | 无动画、呼吸和流光。 |
| content | 通过 loading 在自动骨架与真实内容之间切换。 |
| width | 标题宽度、段落末行宽度和逐行宽度。 |
| styles | 通过 classNames/styles 定制四个语义区域。 |

## Skeleton API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| loading | boolean | — | `false` 显示真实内容；其他值显示自定义 placeholder 或自动骨架。 |
| animation | 'none' \| 'pulse' \| 'wave' | 'none' | 传递给自动生成的头像、标题和段落行。 |
| avatar | boolean \| SkeletonAvatarOptions | false | 是否生成头像，也可配置头像 size、shape 和 animation。 |
| title | boolean \| SkeletonTitleOptions | true | 是否生成一行标题，也可配置标题 width。 |
| paragraph | boolean \| SkeletonParagraphOptions | true | 是否生成段落，也可配置 rows 和 width。 |
| round | boolean | false | 标题和段落行是否使用全圆角。 |
| classNames | SkeletonClassNames | — | 分别设置 root、avatar、title、paragraph 的 class。 |
| styles | SkeletonStyles<`string`> | — | 分别设置 root、avatar、title、paragraph 的行内样式。 |
| 原生属性 | `HTMLAttributes<HTMLDivElement>` | — | 骨架状态下透传到根 div；`class`、`style` 与 root 结构化配置合并。 |

## SkeletonAvatarOptions

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| animation | SkeletonAnimation | 继承 Skeleton | 仅覆盖头像动画。 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 头像尺寸。 |
| shape | 'circle' \| 'square' | 'circle' | 头像形状。 |

## SkeletonTitleOptions

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| width | number \| string | 38% | 标题宽度；数字按像素处理。 |

## SkeletonParagraphOptions

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| rows | number | 3 | 段落行数；小数向下取整，小于 0 按 0 处理。 |
| width | number \| string \| Array<number \| string> | — | 单值只设置最后一行；数组按索引逐行设置；数字按像素处理。 |

## 结构化样式

`classNames` 和 `styles` 使用相同的四个语义区域：

| 区域 | 目标 |
| --- | --- |
| root | 自动骨架的根容器。 |
| avatar | 内部 SkeletonAvatar。 |
| title | 标题 SkeletonText。 |
| paragraph | 每一条段落 SkeletonText。 |

根节点仍接受原生 `class` 和 `style`。结构化配置用于内部区域，不需要手写自动骨架 DOM。

## 内容 API

`children` snippet 提供真实内容，`placeholder` snippet 提供自定义骨架。

优先级固定为：`loading === false` 显示真实内容；否则存在自定义 placeholder 时显示它；否则显示根据 avatar、title、paragraph 生成的自动骨架。

## Primitive 重导出

六个单体组件保持 Primitive API，不增加第二套属性或样式。仅需要一个占位块时可以直接从 UI 入口导入；需要快速生成头像、标题和段落结构时使用 `Skeleton`。

## 可访问性

自动生成的骨架根节点和 Primitive 均使用 `aria-hidden`。当 `loading === false` 时，真实内容按原有语义渲染。

