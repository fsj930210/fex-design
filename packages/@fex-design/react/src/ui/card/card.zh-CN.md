# React Card

UI Card 负责生成常规 Header，同时保留 Primitive 区域与原生 div 属性透传。

## 导入

```tsx
import { Card } from '@fex-design/react/ui/card'
```

## 示例

示例保存在 `examples/<name>`，作为文档预览的源码。

| 名称 | 覆盖内容 |
| --- | --- |
| basic | 默认 Header、extra、正文和 Footer。 |
| custom-header | 完整替换 Header。 |
| styling | classNames、styles 与 Card variables。 |

## Card API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- |
| title | ReactNode | — | 默认 Header 标题。 |
| description | ReactNode | — | 默认 Header 辅助说明。 |
| extra | ReactNode | — | 默认 Header 补充内容。 |
| header | ReactNode | — | 完整替换生成的 Header。 |
| footer | ReactNode | — | 独立 Footer 内容。 |
| classNames | CardClassNames | — | root、header、title、description、extra、content、footer 的 class。 |
| styles | CardStyles | — | 相同稳定区域的内联样式。 |
| 原生属性 | ComponentProps<'div'> | — | 透传至 Root 的原生属性与事件。 |
| 元素访问 | ref | — | 获取 Root 的 HTMLDivElement。 |

## 替换规则

`header` 优先于 `title`、`description` 和 `extra`。需要复用默认区域 surface 但自定义布局时，在 `header` 中组合 Primitive 部件。Card CSS variables 可放在单个实例、组件容器或 `:root`。
