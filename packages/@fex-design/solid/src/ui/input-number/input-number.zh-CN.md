# Solid UI InputNumber

开箱即用的组合，复用 Primitive 逻辑及 Input/Button 部件。UI 只额外提供结构化语义样式 API。

## 导入

    import { InputNumber } from '@fex-design/solid/ui/input-number'

## 组件

| 组件        | 元素        | 用途                                           |
| ----------- | ----------- | ---------------------------------------------- |
| InputNumber | div + input | 组装输入控件、清除、前后缀与可替换的增减操作。 |

## 示例

| 名称            | 覆盖内容                                        |
| --------------- | ----------------------------------------------- |
| basic           | 受控与非受控数值。                              |
| constraints     | min、max、step 与 precision。                   |
| formatter       | 解析与展示格式化。                              |
| editing         | 编辑草稿与失焦提交。                            |
| controls        | 默认、隐藏与替换增减操作。                      |
| keyboard        | 方向键步进。                                    |
| range           | 受控越界值。                                    |
| custom-logic    | useInputNumber 配合系统 Button 组装自定义界面。 |
| affixes         | 前缀、清除、后缀与增减操作共存。                |
| validation      | 可见校验失败状态与错误说明。                    |
| semantic-styles | 使用 classNames 与 styles 定制结构部件。        |

## InputNumber API

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

支持 Input 的全部功能及原生 input 属性。`classNames` 和 `styles` 可定制 root、control、clear、prefix、suffix、actions、increment、decrement。

## 逻辑层

自定义界面从 Primitive 入口导入 `useInputNumber`；参见 custom-logic 示例与 Primitive hook API。
