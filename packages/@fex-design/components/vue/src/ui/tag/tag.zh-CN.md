# Vue UI Tag

用于分类、属性和状态信息的标签，支持关闭操作及根节点、关闭按钮的样式定制。

## 导入

    import { Tag, TagAction } from '@fex-design/vue/ui/tag'

## 组件

| 组件      | 元素   | 说明                                             |
| --------- | ------ | ------------------------------------------------ |
| Tag       | span   | 推荐的组合式 Tag，支持可选关闭控件和结构化样式。 |
| TagAction | button | 从 Primitive 转出，供手动组合任意标签内操作。    |

## 示例

| 名称            | 覆盖内容                                   |
| --------------- | ------------------------------------------ |
| basic           | 常规标签、三种尺寸、可关闭组合和禁用状态。 |
| variants        | filled、solid、outlined 三种视觉变体。     |
| colors          | 五种语义色以及自定义 CSS 颜色。            |
| dynamic         | 使用业务状态添加、删除标签。               |
| css-variables   | 实例级语义颜色变量覆盖。                   |
| direction       | 原生 LTR、RTL 方向以及关闭按钮的逻辑位置。 |
| semantic-styles | UI 专属 root、close 结构化样式。           |

## Tag API

| 名称       | 类型                                 | 默认值   | 说明                                      |
| ---------- | ------------------------------------ | -------- | ----------------------------------------- |
| variant    | 'filled' \| 'solid' \| 'outlined'    | 'filled' | 标签视觉变体。                            |
| color      | TagColor                             | —        | 语义色名称或任意合法 CSS 颜色。           |
| size       | 'sm' \| 'md' \| 'lg'                 | 'md'     | 标签尺寸。                                |
| disabled   | boolean                              | false    | 设置禁用样式，并禁用自动生成的关闭按钮。  |
| closable   | boolean                              | false    | 渲染关闭控件。                            |
| 内容       | 默认插槽；`closeIcon` 具名插槽 | —        | 标签内容以及可选的关闭图标替换。          |
| 关闭事件   | `close` 事件，参数为 `MouseEvent`       | —        | 通知自动生成的关闭按钮被触发。            |
| classNames | TagClassNames                        | —        | 分别设置 `root`、`close` 类名。           |
| styles     | TagStyles                            | —        | 分别设置 `root`、`close` 的框架原生样式。 |
| 原生属性   | Vue span attrs                       | —        | 透传原生 span 属性与事件。                |

## 关闭行为

`closable` 只负责渲染并连接关闭按钮，组件不会自行隐藏，也不持有列表状态。请在 `close` 事件回调中删除对应业务数据。`disabled` 为 true 时，自动生成的关闭按钮也会禁用。

通过 `closeIcon` 具名插槽替换默认关闭图标。

## 结构化样式

`classNames.root`、`styles.root` 扩展 Tag 根节点；`classNames.close`、`styles.close` 扩展自动生成的关闭按钮。根节点原生 `class` 和 `style` 会与 root 结构化值合并。

语义色整体调整使用 CSS 变量；单个实例的根节点或关闭按钮展示使用结构化样式。结构化样式不替代 `variant`、`color`、`size`。

## CSS 变量

| 变量                             | 作用                         |
| -------------------------------- | ---------------------------- |
| `--tag-color-primary`            | primary 语义色。             |
| `--tag-color-primary-foreground` | solid primary 标签的前景色。 |
| `--tag-color-success`            | success 语义色。             |
| `--tag-color-success-foreground` | solid success 标签的前景色。 |
| `--tag-color-warning`            | warning 语义色。             |
| `--tag-color-warning-foreground` | solid warning 标签的前景色。 |
| `--tag-color-danger`             | danger 语义色。              |
| `--tag-color-danger-foreground`  | solid danger 标签的前景色。  |
| `--tag-color-info`               | info 语义色。                |
| `--tag-color-info-foreground`    | solid info 标签的前景色。    |

## 可访问性

自动生成的关闭按钮默认无障碍名称为 `Close`。如果上下文无法明确指出目标标签，应提供更具体的名称。删除状态由业务维护，删除后应把焦点恢复到可预测位置。
