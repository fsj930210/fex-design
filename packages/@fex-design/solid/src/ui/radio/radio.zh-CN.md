# Solid UI Radio

用于从互斥选项中选择一个值。RadioButton 是同一 Group 状态模型下的按钮式快捷形态。

## 导入

    import { Radio, RadioGroup, RadioButton, RadioButtonGroup } from '@fex-design/solid/ui/radio'

## API

- RadioGroup：value、defaultValue、disabled、orientation、valueChange / onValueChange。
- Radio：value、disabled、size，以及原生 button 属性。
- RadioButton：value、disabled、size，以及原生 button 属性。
- UI Radio：内置标签结构，并支持 classNames / styles。\n- RadioGroup 与 RadioButtonGroup：支持 options 快捷选项。\n

## CSS Variables

- --radio-size
- --radio-indicator-size
- --radio-border-color
- --radio-background
- --radio-checked-color
- --radio-ring-color
- --radio-content-gap
- --radio-button-height
- --radio-button-padding-inline
- --radio-button-border-color
- --radio-button-background
- --radio-button-checked-background
- --radio-button-checked-foreground
- --radio-button-ring-color

## 可访问性

为无可见标签的 Primitive Radio 和 RadioButton 提供可访问名称；校验失败使用 aria-invalid 与 aria-describedby。
