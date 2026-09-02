# Alert Primitive

Alert Primitive 提供带样式、可组合的页面反馈部件，图标、显隐和业务行为由调用方管理。

## 导入
```tsx
import { Alert, AlertAction, AlertDescription, AlertIcon, AlertTitle } from '@fex-design/solid/primitive/alert'
```

## 示例
七个示例覆盖组合、Type、Variant、关闭、循环公告、自定义内容和方向。

## 组件与原生能力
### Alert
继承 `JSX.HTMLAttributes<HTMLDivElement>`，只新增 `type`、`variant`。
### AlertIcon
继承 span JSX 属性，只负责响应式 children 的尺寸与对齐。
### AlertTitle
继承 div JSX 属性，用于主要提示信息。
### AlertDescription
继承 div JSX 属性，用于补充说明内容。
### AlertAction
继承 div JSX 属性，只定位操作内容，不保存行为状态。

## 样式与无障碍
使用文档中的 `--alert-color-*` 变量和稳定 `data-slot`。根节点默认 `role="alert"`；非紧急内容应覆盖它，装饰图标使用 `aria-hidden`。
