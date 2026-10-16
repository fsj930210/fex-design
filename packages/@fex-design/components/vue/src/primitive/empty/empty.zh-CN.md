# Vue Primitive Empty

使用 Vue SFC 表达的有样式空状态区域。

## 引入

    import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from '@fex-design/vue/primitive/empty'

## 组件与 API

每个区域通过 attrs 继承原生属性并渲染默认 slot；`EmptyDescription` 使用 `p`，其他布局区域使用 `div`。

## 无障碍

动态更新需要播报时，通过 attrs 向 `Empty` 传入原生 ARIA 属性。
