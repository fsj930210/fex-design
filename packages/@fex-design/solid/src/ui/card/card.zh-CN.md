# Solid Card

## 导入
```tsx
import { Card } from '@fex-design/solid/ui/card'
```

## 示例
`examples/basic`、`examples/custom-header`、`examples/styling` 覆盖默认 Header、Header 替换和区域样式。

## Card API
| 名称 | 类型 | 说明 |
| --- | --- | --- |
| title / description / extra | JSX.Element | 生成默认 Header 的内容。 |
| header | JSX.Element | 完整替换默认 Header。 |
| footer | JSX.Element | 独立 Footer 内容。 |
| classNames / styles | CardClassNames / CardStyles | 稳定的 root、header、title、description、extra、content、footer 样式入口。 |
| 原生属性 | JSX.HTMLAttributes<HTMLDivElement> | 透传至 Root。 |

`header` 优先于 title、description 和 extra。
