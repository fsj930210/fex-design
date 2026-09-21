# Solid UI Spinner

独立 loading 指示器和带自动遮罩的内容容器。

## 导入

    import { Spinner, SpinnerText, SpinnerContainer, SpinnerOverlay } from '@fex-design/solid/ui/spinner'

## 组件

| 组件             | 元素 | 说明                                                                       |
| ---------------- | ---- | -------------------------------------------------------------------------- |
| Spinner          | span | 继承原生 span，原生 span 的所有属性和事件均可透传；loading 指示器。        |
| SpinnerText      | span | 继承原生 span，原生 span 的所有属性和事件均可透传；loading 文本。          |
| SpinnerContainer | div  | 继承原生 div，原生 div 的所有属性和事件均可透传；内容与 loading 状态容器。 |
| SpinnerOverlay   | div  | 继承原生 div，原生 div 的所有属性和事件均可透传；Primitive 遮罩节点。      |

## 示例

示例保存在 `examples/<name>`，作为官网预览源码。

| 名称             | 覆盖内容       |
| ---------------- | -------------- |
| basic            | 基础指示器。   |
| sizes            | 三种尺寸。     |
| custom-indicator | 自定义指示器。 |
| overlay          | 内容区域遮罩。 |
| styling          | 结构化样式。   |

## API

| 名称      | 类型             | 默认值    | 说明           |
| --------- | ---------------- | --------- | -------------- |
| spinning  | boolean          | undefined | undefined      | 未设置时为独立指示器；false 显示内容；true 显示内容和遮罩。 |
| size      | 'sm'             | 'md'      | 'lg'           | 'md'                                                        | 指示器尺寸。 |
| text      | 框架原生内容类型 | —         | loading 文本。 |
| indicator | 框架原生内容类型 | —         | 自定义指示器。 |
