# React Primitive InputNumber

基于现有 Input 与 Button 原子组件构建的可组合数字输入。

## 导入

    import { InputNumberRoot, InputNumberControl, InputNumberClear, InputNumberActions, InputNumberIncrement, InputNumberDecrement, useInputNumber } from '@fex-design/react/primitive/input-number'

## 组件

| 组件                 | 元素   | 用途                                       |
| -------------------- | ------ | ------------------------------------------ |
| InputNumberRoot      | div    | 管理数值、编辑文本、约束与上下文。         |
| InputNumberControl   | input  | 复用 InputControl 与原生 spinbutton 行为。 |
| InputNumberClear     | button | 复用 InputClear 并清空数值。               |
| InputNumberActions   | span   | 组织增减操作。                             |
| InputNumberIncrement | button | 复用 Button；默认 PlusIcon 可替换。        |
| InputNumberDecrement | button | 复用 Button；默认 MinusIcon 可替换。       |

## 示例

| 名称         | 覆盖内容                                        |
| ------------ | ----------------------------------------------- |
| basic        | 受控与非受控数值。                              |
| constraints  | min、max、step 与 precision。                   |
| formatter    | 解析与展示格式化。                              |
| editing      | 编辑草稿与失焦提交。                            |
| controls     | 默认、隐藏与替换增减操作。                      |
| keyboard     | 方向键步进。                                    |
| range        | 受控越界值。                                    |
| custom-logic | useInputNumber 配合系统 Button 组装自定义界面。 |
| affixes      | 前缀、清除、后缀与增减操作共存。                |
| validation   | 可见校验失败状态与错误说明。                    |

## InputNumberRoot API

| 名称                 | 类型                                     | 默认值 | 说明                        |
| -------------------- | ---------------------------------------- | ------ | --------------------------- |
| value / defaultValue | number 或 undefined                      | —      | 受控值 / 非受控初始值。     |
| min / max            | number                                   | —      | 数值边界。                  |
| step                 | number                                   | 1      | 增减步长。                  |
| precision            | number                                   | —      | 提交精度。                  |
| parser / formatter   | InputNumberParser / InputNumberFormatter | 内置   | 分离编辑文本与 number。     |
| disabled / readOnly  | boolean                                  | false  | 禁止编辑和操作。            |
| keyboard             | boolean                                  | true   | 启用 ArrowUp 与 ArrowDown。 |
| onChange             | (event, value) => void                   | —      | 返回原始事件与 number。     |

Control 继承 `ComponentProps<'input'>`；原生 focus、blur、键盘、aria、data 属性与元素访问都会透传。

## useInputNumber API

公开逻辑层接受相同选项，可以在不渲染默认结构时驱动自定义 DOM。响应式值使用 plain values。

| 名称                 | 类型                                     | 默认值 | 说明                        |
| -------------------- | ---------------------------------------- | ------ | --------------------------- |
| value / defaultValue | number 或 undefined                      | —      | 受控值 / 非受控初始值。     |
| min / max            | number                                   | —      | 数值边界。                  |
| step                 | number                                   | 1      | 增减步长。                  |
| precision            | number                                   | —      | 提交精度。                  |
| parser / formatter   | InputNumberParser / InputNumberFormatter | 内置   | 分离编辑文本与 number。     |
| disabled / readOnly  | boolean                                  | false  | 禁止编辑和操作。            |
| keyboard             | boolean                                  | true   | 启用 ArrowUp 与 ArrowDown。 |
| onChange             | (event, value) => void                   | —      | 返回原始事件与 number。     |

### 返回值

| 分组   | 成员                                                      |
| ------ | --------------------------------------------------------- |
| 状态   | value、draft、formattedValue、min、max、outOfRange        |
| 可用性 | canClear、canIncrement、canDecrement                      |
| 操作   | input、blur、keydown、clear、increment、decrement、commit |

## 方向与校验

部件透传原生 dir。校验使用 aria-invalid 与 aria-describedby。数值变化统一使用 change/onChange，不提供 onValueChange。
