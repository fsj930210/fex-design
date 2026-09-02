# Alert Primitive

Alert 用于在当前页面中传达成功、信息、警告或错误反馈。Primitive 层只提供带样式的结构部件，图标选择、关闭状态和业务行为由调用方组合。

## 导入

```tsx
import { Alert, AlertAction, AlertDescription, AlertIcon, AlertTitle } from '@fex-design/react/primitive/alert'
```

## 示例

示例依次覆盖基本组合、四种 Type、三种 Variant、组合关闭、可复制的循环公告、自定义图标与操作和 LTR/RTL。

## 组件

### Alert

继承原生 `div` 的属性、事件、`style`、`className` 和 `ref`。`type` 支持 `success | info | warning | error`，`variant` 支持 `filled | outlined | solid`。

### AlertIcon

继承原生 `span` 属性，只负责图标尺寸和对齐，不根据 `type` 选择图标。

### AlertTitle

继承原生 `div` 属性，用于主要提示标题。

### AlertDescription

继承原生 `div` 属性，用于说明文字、链接或更丰富的内容。

### AlertAction

继承原生 `div` 属性，用于放置用户操作。Primitive 不保存关闭状态。

## 样式

当前实例可覆盖 `--alert-color`、`--alert-color-foreground`、`--alert-color-background` 和 `--alert-color-border`。类型级变量使用 `--alert-color-{type}` 及其 `-foreground`、`-background`、`-border` 后缀，各区域提供稳定 `data-slot`。

## 无障碍

根节点默认带 `role="alert"`；不需要即时播报的静态内容应覆盖该属性。装饰性图标使用 `aria-hidden="true"`。交互内容放入 `AlertAction`，并保留可访问名称和清晰焦点样式。
