# Solid Primitive Card

## 导入
```tsx
import { Card, CardContent, CardDescription, CardExtra, CardFooter, CardHeader, CardTitle } from '@fex-design/solid/primitive/card'
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
所有部件透传 `JSX.HTMLAttributes<HTMLDivElement>`、事件、`class`、`style`、`ref`，没有内部状态。使用 --card-radius、--card-border、--card-shadow、--card-background、各区域 `-background`、`-padding`，以及 --card-header-divider / --card-footer-divider。
