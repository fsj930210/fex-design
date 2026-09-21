# Svelte Primitive Empty

使用 Svelte 5 组件和 Snippet 的有样式空状态区域。

## 引入

    import Empty from '@fex-design/svelte/primitive/empty'
    import EmptyHeader from '@fex-design/svelte/primitive/empty-header'

其余区域通过 `primitive/empty-media`、`primitive/empty-title`、`primitive/empty-description`、`primitive/empty-content` 引入。

## API

各组件接受原生元素属性和 `children` Snippet。

## 示例

`basic`、`content`、`image`、`direction` 与 UI Empty 的文案、布局和最终展示一致。

## 书写方向

原生 `dir` 控制继承的 LTR 与 RTL 布局。

## 无障碍

仅在动态更新需要播报时添加实时区域语义。
