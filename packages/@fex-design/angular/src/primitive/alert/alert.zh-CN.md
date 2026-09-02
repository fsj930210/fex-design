# Alert Primitive

Alert Primitive 为语义反馈提供带样式的 Angular 宿主组件，图标选择和显隐行为由组合层负责。

## 导入
```ts
import { Alert, AlertAction, AlertDescription, AlertIcon, AlertTitle } from '@fex-design/angular/primitive/alert'
```

## 示例
示例覆盖基本组合、四种 Type、三种 Variant、组合关闭、循环公告、自定义内容和方向。

## 组件与宿主
### Alert
使用 `div[alert]`，保留原生宿主能力，新增 `type`、`variant` signal inputs。
### AlertIcon
使用 `span[alertIcon]`，只负责投影图标的尺寸与对齐。
### AlertTitle
使用 `div[alertTitle]`，投影主要提示信息。
### AlertDescription
使用 `div[alertDescription]`，投影补充说明内容。
### AlertAction
使用 `div[alertAction]`，只定位原生投影操作，不保存行为状态。

## 样式与无障碍
使用 `--alert-color-*` 变量和稳定 `data-slot`。根节点带 `role="alert"`；非紧急内容应覆盖它，装饰性投影图标应对辅助技术隐藏。
