# Angular Primitive Checkbox

带样式、可自由组合的 Checkbox 原子部件。CheckboxControl 始终是真实的原生 input[type=checkbox]。

## 导入

从 @fex-design/angular/primitive/checkbox 导入 CheckboxRoot、CheckboxControl、CheckboxIndicator、CheckboxLabel 和 CheckboxGroup。

## 示例

Primitive 与 UI 使用相同场景：basic、states、sizes、controlled、group、check-all、validation、custom-indicator、direction、css-variables。Primitive 示例显式组合各部件。

## API

CheckboxRoot 负责布局、尺寸和 Control/Label 关联。CheckboxControl 继承原生 input 属性，只增加 indeterminate。CheckboxIndicator 只承载选中和中间状态标记。CheckboxLabel 是自动关联 Control 的原生 label。CheckboxGroup 管理平级 value 数组，不处理 Table 或 Tree 的父子级联。

CheckboxControl 使用原生 change 事件。checked 是 boolean；中间状态由独立 indeterminate boolean 表达。校验失败使用 aria-invalid 和 aria-describedby。

## CSS Variables

--checkbox-size、--checkbox-background、--checkbox-border-color、--checkbox-checked-background、--checkbox-checked-border-color、--checkbox-indicator-color、--checkbox-ring-color、--checkbox-content-gap。
