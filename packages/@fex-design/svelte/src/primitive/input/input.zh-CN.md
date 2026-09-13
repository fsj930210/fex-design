# Svelte Primitive Input

带样式、可自由组合的 Input 原子组件。`InputRoot` 统一管理值和状态，`InputControl` 始终是真实的原生 input。

## 导入

    import { InputRoot, InputControl, InputPrefix, InputSuffix, InputAddonBefore, InputAddonAfter, InputClear, InputGroup } from '@fex-design/svelte/primitive/input'

## 组件

| 组件             | 元素   | 说明                                       |
| ---------------- | ------ | ------------------------------------------ |
| InputRoot        | div    | 输入框视觉边界以及受控/非受控值容器。      |
| InputControl     | input  | 原生文本输入和聚焦目标。                   |
| InputPrefix      | span   | InputRoot 内起始位置的非交互内容。         |
| InputSuffix      | span   | InputRoot 内结束位置的非交互内容。         |
| InputAddonBefore | span   | 位于 InputRoot 聚焦环之外的起始附加区域。  |
| InputAddonAfter  | span   | 位于 InputRoot 聚焦环之外的结束附加区域。  |
| InputClear       | button | 与最近 InputRoot 连接的清除操作。          |
| InputGroup       | div    | 连接任意直接子元素，不假设子元素组件类型。 |

## 示例

| 名称       | 覆盖内容                                                  |
| ---------- | --------------------------------------------------------- |
| basic      | 空输入和可清除输入。                                      |
| sizes      | `sm`、`md`、`lg`，高度分别为 24px、32px、44px。           |
| variants   | `outlined`、`filled`、`borderless`、`underlined`。        |
| controlled | InputRoot 的受控与非受控状态。                            |
| affixes    | Prefix、Suffix、AddonBefore、AddonAfter 组合。            |
| group      | Input 与 Button、Input 与 Input 的连接组合。              |
| password   | 使用 Control、Suffix 和原生按钮组合密码可见性。           |
| search     | 使用 Primitive 部件组合 Enter、Prefix 和 Addon 搜索入口。 |
| states     | 禁用、只读和原生 `aria-invalid`。                         |
| validation | 校验失败样式，以及通过 `aria-describedby` 关联错误说明。   |
| focus      | 通过 InputControl 调用原生 focus、blur 和 select。        |

## InputRoot API

| 名称         | 类型                                                     | 默认值       | 说明                   |
| ------------ | -------------------------------------------------------- | ------------ | ---------------------- |
| value        | string                                                   | —            | 受控值。               |
| defaultValue | string                                                   | `''`         | 非受控初始值。         |
| size         | `'sm' \| 'md' \| 'lg'`                                   | `'md'`       | 控件高度。             |
| variant      | `'outlined' \| 'filled' \| 'borderless' \| 'underlined'` | `'outlined'` | 视觉结构。             |
| disabled     | boolean                                                  | false        | 禁用输入上下文。       |
| readOnly     | boolean                                                  | false        | 将输入上下文设为只读。 |
| 值变化       | 框架事件                                                 | —            | 输入和清除后报告新值。 |
| clear        | 框架事件                                                 | —            | 成功清除后触发。       |

## InputControl API

原生契约：Svelte `HTMLInputAttributes`。`bind:ref` 暴露原生 `HTMLInputElement`。

`aria-invalid` 直接传给原生 input，并且是唯一错误状态契约；不存在自定义 `invalid` 或 `status` 属性。

## 组合结构

Prefix 和 Suffix 位于 InputRoot 内，只承载内容。Addon 是 InputGroup 中 InputRoot 的兄弟节点，因此 Input 聚焦环不覆盖 Addon。InputClear 在 `sm`、`md`、`lg` 下分别使用 12px、14px、16px 图标，只有输入有值且处于交互状态时才显示。

InputGroup 对任意直接子元素生效：首项仅保留起始侧圆角，末项仅保留结束侧圆角，中间连接处无圆角。`--input-group-radius` 可在全局、单个 Group 或直接子元素上覆盖。

## 样式扩展

使用 `class`、`classNames` 和原生 style 字符串。 hover、focus-within、data 属性和 `[aria-invalid=true]` 等状态使用选择器覆盖，CSS Variables 只保留可复用基础 token。

## 书写方向

间距和连接圆角全部使用逻辑 start/end，并跟随原生 `dir="ltr"` 或 `dir="rtl"`。

## 无障碍

通过 Field 或原生方式为输入关联 Label。InputClear 是真实按钮，可在显示时通过键盘访问，并在清除后把焦点还给 InputControl。禁用和只读使用原生 input 语义。
