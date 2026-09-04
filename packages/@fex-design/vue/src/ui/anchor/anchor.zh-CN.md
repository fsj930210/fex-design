# Vue UI Anchor

推荐用于快速使用的数据驱动 Anchor。此入口公开的组件只有 Anchor，不会转出 Primitive 部件。

## 导入

    import { Anchor } from '@fex-design/vue/ui/anchor'

## 示例

| 名称 | 覆盖内容 |
| --- | --- |
| basic | 数据驱动的纵向 Anchor。 |
| horizontal | 横向布局。 |
| progress | 累积阅读进度。 |
| controlled | 受控与非受控激活状态。 |
| offset | 组件偏移与单项覆盖。 |
| direction | LTR 与 RTL。 |
| custom-click | 项目点击处理与取消滚动。 |
| semantic-styles | 全部语义部件的 classNames 与 styles。 |

## Anchor API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| items | readonly AnchorItemData[] | — | 项目数据与嵌套 children。 |
| activeKeys | readonly string[] | — | 受控激活项。 |
| defaultActiveKeys | readonly string[] | [] | 非受控初始激活项。 |
| activeMode | current 或 progress | current | 当前项或累积进度。 |
| orientation | vertical 或 horizontal | vertical | 排列方向。 |
| container | Window、HTMLElement 或解析函数 | window | 滚动容器。 |
| targetOffset | number | 0 | 默认项目滚动偏移。 |
| threshold | number | 16 | 从容器顶部计算的激活线。 |
| behavior | ScrollBehavior | smooth | 滚动行为。 |
| classNames | 语义部件映射 | — | root、list、item、link、rail、indicator 的 class。 |
| styles | 语义部件映射 | — | 同一组部件的框架原生样式。 |
| 原生属性 | Vue attrs and exposed element refs | — | 根元素原生属性与元素访问。 |

## 项目数据

每项必须提供 key、title 与 target。children 创建嵌套；项目 targetOffset 覆盖组件值。

## 事件

change 事件返回激活 key。项目点击事件先于内部滚动执行；调用 preventDefault 可取消该次滚动。

## 结构化样式

classNames 与 styles 对应 root、list、item、link、rail、indicator。这些是样式部件，不是 UI 入口导出的组件。

## 书写方向

使用原生 dir="ltr" 或 dir="rtl"；布局和指示器几何计算遵循逻辑方向。
