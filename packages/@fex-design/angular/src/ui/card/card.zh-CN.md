# Angular Card

## 导入
```ts
import { Card } from '@fex-design/angular/ui/card'
```

## 示例
`examples/basic`、`examples/custom-header`、`examples/styling` 覆盖默认 Header、模板替换和区域样式。

## Card API
| 名称 | 类型 | 说明 |
| --- | --- | --- |
| title / description | string | 生成默认 Header 的内容。 |
| extra / header / footer | TemplateRef | 补充内容、完整 Header 替换和 Footer 模板。 |
| classNames / styles | CardClassNames / CardStyles | 稳定的区域样式入口。 |
| 原生属性 | host attributes | 应用至 Root。 |

`header` 优先于 title、description 和 extra。
