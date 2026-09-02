# Vue Primitive Tag

用于承载简短分类、属性和状态信息的 styled Tag 原子组件。Primitive 提供根节点 `Tag` 与可组合的 `TagClose` 按钮，不持有标签删除状态。

## 导入

    import { Tag, TagClose } from '@fex-design/vue/primitive/tag'

## 组件

| 组件 | 元素 | 说明 |
| ---- | ---- | ---- |
| Tag | span | 继承原生 span，提供 variant、color、size 和 disabled 样式。 |
| TagClose | button | 继承原生 button，默认显示 CloseIcon，也可完全替换内容。 |

## 示例

示例保存在 `examples/<name>`，作为文档预览的源码。

| 名称          | 覆盖内容                                           |
| ------------- | -------------------------------------------------- |
| basic         | 常规标签、三种尺寸、可关闭组合和禁用状态。         |
| variants      | filled、solid、outlined 三种视觉变体。              |
| colors        | 五种语义色以及自定义 CSS 颜色。                    |
| dynamic       | 使用业务状态添加、删除标签。                       |
| css-variables | 实例级语义颜色变量覆盖。                           |
| direction     | 原生 LTR、RTL 方向以及关闭按钮的逻辑位置。          |

## Tag API

| 名称 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |
| variant | 'filled' \| 'solid' \| 'outlined' | 'filled' | 标签视觉变体。 |
| color | TagColor | — | primary、success、warning、danger、info 或任意合法 CSS 颜色。 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 标签尺寸。 |
| disabled | boolean | false | 设置标签禁用语义和样式。 |
| 内容 | default slot | — | 标签内容。 |
| 原生属性 | Vue span attrs | — | 透传原生 span 属性与事件。 |

## TagClose API

| 名称 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |
| disabled | boolean | false | 禁用原生关闭按钮。 |
| 内容 | default slot | CloseIcon | 传入内容时完全替换默认关闭图标。 |
| 事件 | native `click` listener | — | 原生按钮事件；Primitive 不增加专用关闭事件。 |
| 原生属性 | Vue button attrs | — | 透传原生 button 属性与事件。 |

## 视觉变体与颜色

`variant` 控制视觉层级：`filled` 使用浅色背景，`solid` 使用实色背景和对应前景色，`outlined` 使用透明背景与彩色边框。`color` 可以传五种语义色，也可以直接传 `#7c3aed`、`oklch(...)` 等 CSS 颜色。

组件不注入默认语义色；未传 `color` 时使用中性回退配色。

## CSS 变量

预设色支持全局、区域或单个 Tag 实例覆盖。

| 变量                             | 作用                                |
| -------------------------------- | ----------------------------------- |
| `--tag-color-primary`            | primary 语义色。                    |
| `--tag-color-primary-foreground` | solid primary 标签的前景色。        |
| `--tag-color-success`            | success 语义色。                    |
| `--tag-color-success-foreground` | solid success 标签的前景色。        |
| `--tag-color-warning`            | warning 语义色。                    |
| `--tag-color-warning-foreground` | solid warning 标签的前景色。        |
| `--tag-color-danger`             | danger 语义色。                     |
| `--tag-color-danger-foreground`  | solid danger 标签的前景色。         |
| `--tag-color-info`               | info 语义色。                       |
| `--tag-color-info-foreground`    | solid info 标签的前景色。           |

尺寸统一由 `size` API 控制，不提供公开尺寸变量。

## 内容与组合

内容遵循 Vue 原生模型：default slot。Primitive 需要关闭能力时，在 `Tag` 内组合 `TagClose`。`TagClose` 不会删除父标签，也不会自动联动父级 disabled。

## 可访问性

可见文案应保持简短。每个 `TagClose` 都应提供能指出目标标签的无障碍名称。删除操作放在原生点击事件中处理；如果被删除标签持有焦点，应把焦点移动到可预测的相邻控件。
