# Alert Primitive

Alert Primitive 为成功、信息、警告、错误反馈提供带样式的结构部件，不负责选择图标或保存显隐状态。

## 导入
```ts
import { Alert, AlertAction, AlertDescription, AlertIcon, AlertTitle } from '@fex-design/vue/primitive/alert'
```

## 示例
示例按基本组合、Type、Variant、组合关闭、循环公告、自定义图标与操作和方向排列。

## 组件与原生能力
### Alert
使用原生 `div`，透传 attrs、事件、class、style、模板 ref，新增 `type`、`variant` 和默认 slot。
### AlertIcon
使用原生 `span` 并透传 attrs，只为默认图标 slot 提供尺寸和对齐，不选择图标。
### AlertTitle
使用原生 `div` 并透传 attrs，默认 slot 承载标题。
### AlertDescription
使用原生 `div` 并透传 attrs，默认 slot 承载说明内容。
### AlertAction
使用原生 `div` 并透传 attrs，只定位操作内容，不实现操作行为。

## 样式与无障碍
可覆盖文档列出的 `--alert-color-*` 变量，或使用稳定 `data-slot` 定制各区域。根节点默认 `role="alert"`；非紧急静态内容应覆盖它，装饰图标应对辅助技术隐藏。
