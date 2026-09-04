# Vue Primitive Anchor

提供可组合、带样式并保留原生元素行为的 Anchor 原子组件。

## 导入

    import { AnchorIndicator, AnchorItem, AnchorLink, AnchorList, AnchorRail, AnchorRoot, useAnchor } from '@fex-design/vue/primitive/anchor'

## 组件

| 组件 | 宿主元素 | 说明 |
| --- | --- | --- |
| AnchorRoot | nav | 管理项目注册、激活状态、滚动、方向与 change 事件。 |
| AnchorList | ul | 组织根级或嵌套项目。 |
| AnchorItem | li | 注册 key、target 与可选 targetOffset。 |
| AnchorLink | button | 激活并滚动到所属项目；透传原生事件。 |
| AnchorRail | div | 渲染轨道。 |
| AnchorIndicator | span | 渲染当前项或进度指示器。 |

## 示例

| 名称 | 覆盖内容 |
| --- | --- |
| basic | 纵向组合与嵌套项目。 |
| horizontal | 横向一级导航。 |
| progress | 累积阅读进度。 |
| controlled | 受控与非受控激活状态。 |
| offset | 根偏移与单项覆盖。 |
| direction | LTR 与 RTL 行为。 |
| custom-click | 原生点击处理与 preventDefault。 |

## AnchorRoot API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| activeKeys | readonly string[] | — | 受控激活项。 |
| defaultActiveKeys | readonly string[] | [] | 非受控初始激活项。 |
| activeMode | current 或 progress | current | 当前项或累积进度。 |
| orientation | vertical 或 horizontal | vertical | 排列方向。 |
| container | Window、HTMLElement 或解析函数 | window | 滚动容器。 |
| targetOffset | number | 0 | 默认滚动偏移。 |
| threshold | number | 16 | 从容器顶部计算的激活线。 |
| behavior | ScrollBehavior | smooth | 滚动行为。 |
| change | 回调 | — | 返回激活 key 与已注册项目。 |
| 原生属性 | Vue attrs and exposed element refs | — | 原生属性、事件与元素访问。 |

## AnchorItem API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value | string | — | 稳定项目标识。 |
| target | 选择器、HTMLElement、ref-like 值或解析函数 | — | 定位目标 DOM，不修改 URL。 |
| targetOffset | number | 根值 | 覆盖 AnchorRoot 的 targetOffset。 |
| 原生属性 | Vue attrs and exposed element refs | — | 原生 li 属性与事件。 |

## 原生部件

AnchorLink 使用原生 button；AnchorList、AnchorRail 与 AnchorIndicator 保留各自宿主的原生属性。事件：`change`；AnchorLink 的原生 `click`。

## 自定义 UI 逻辑

公开 `useAnchor`，作为构建自定义 Anchor 结构的 Vue 原生 composable。

## 书写方向

支持原生 dir="ltr" 与 dir="rtl"。轨道、指示器、嵌套缩进和横向位置均使用逻辑方向。
