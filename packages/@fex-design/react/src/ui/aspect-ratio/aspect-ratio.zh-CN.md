# React UI Aspect Ratio

AspectRatio Primitive 的 UI 层同名入口；不增加额外行为。

## 导入

    import { AspectRatio } from '@fex-design/react/ui/aspect-ratio'

## 组件

| 组件 | 元素 | 说明 |
| --- | --- | --- |
| AspectRatio | div | 继承原生 div，原生 div 的所有属性和事件均可透传；按 ratio 保持内容宽高比。 |

## 示例

示例保存在 `examples/<name>`，作为官网预览源码。

| 名称 | 覆盖内容 |
| --- | --- |
| landscape | 16:9 横向比例。 |
| portrait | 9:16 竖向比例。 |
| square | 1:1 正方形比例。 |

## API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| ratio | number | — | 宽高比，例如 `16 / 9`。 |
