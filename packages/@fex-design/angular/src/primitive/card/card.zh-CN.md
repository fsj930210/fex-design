# Angular Primitive Card

## 导入
```ts
import { Card, CardContent, CardDescription, CardExtra, CardFooter, CardHeader, CardTitle } from '@fex-design/angular/primitive/card'
```

## 组件
| 组件 | 宿主元素 | 说明 |
| --- | --- | --- |
| Card | div | Root 的裁切、圆角、边框和阴影。 |
| CardHeader / CardTitle / CardDescription / CardExtra | div | 显式 Header 区域；Extra 是补充内容。 |
| CardContent / CardFooter | div | 独立 Content 和 Footer surface。 |

## 示例
`examples/basic`、`examples/surface`、`examples/custom-header` 是文档预览源码。

## API 与样式
每个部件使用原生 div 宿主，接受原生属性、事件、`class` 和宿主元素访问。使用 --card-radius、--card-border、--card-shadow、--card-background、区域 `-background` / `-padding` 与 Header/Footer divider variables。
