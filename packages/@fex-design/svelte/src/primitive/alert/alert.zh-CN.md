# Alert Primitive

Alert Primitive 为语义反馈提供带样式的 Svelte 5 部件，不选择图标，也不保存显隐状态。

## 导入
```svelte
import Alert from '@fex-design/svelte/primitive/alert'
import AlertIcon from '@fex-design/svelte/primitive/alert-icon'
```

## 示例
七个示例覆盖基本组合、Type、Variant、关闭、循环公告、自定义图标与操作和方向。

## 组件与原生能力
### Alert
继承原生 div 属性，新增 `type`、`variant` 和 Svelte 5 children snippet。
### AlertIcon
继承原生 span 属性，只负责 children snippet 的尺寸与对齐。
### AlertTitle
继承原生 div 属性，用于主要提示信息。
### AlertDescription
继承原生 div 属性，用于补充说明内容。
### AlertAction
继承原生 div 属性，只定位操作内容，不保存行为状态。

## 样式与无障碍
可覆盖 `--alert-color-*` 变量或稳定 `data-slot`。根节点默认 `role="alert"`；非紧急内容应覆盖它，装饰图标应对辅助技术隐藏。
