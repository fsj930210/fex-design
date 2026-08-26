# React Primitive Card

提供原生 div 属性透传的可组合 Card 原子组件。Root 只负责裁切、圆角、边框和阴影；每个区域自行处理背景、padding 与 divider。

## 导入

```tsx
import { Card, CardContent, CardDescription, CardExtra, CardFooter, CardHeader, CardTitle } from '@fex-design/react/primitive/card'
```

## 组件

| 组件 | 元素 | 说明 |
| --- | --- | --- |
| Card | div | 根节点与 surface 边界。 |
| CardHeader | div | 标题区布局和分隔符。 |
| CardTitle | div | 标题区标题。 |
| CardDescription | div | 标题区辅助说明。 |
| CardExtra | div | Badge、操作、Tabs 等标题区补充内容，不限于右上角。 |
| CardContent | div | 正文 surface。 |
| CardFooter | div | Footer surface 和分隔符。 |

## 示例

示例保存在 `examples/<name>`，作为文档预览的源码。

| 名称 | 覆盖内容 |
| --- | --- |
| basic | 七个 Primitive 部件组合。 |
| surface | 区域背景与 divider 独立覆盖。 |
| custom-header | 使用 CardExtra 的自定义 Header。 |

## Primitive API

七个组件都透传 `ComponentProps<'div'>`、原生事件、`className`、`style` 和 `ref` 至宿主 div；没有受控状态或自定义回调。

## CSS variables

| 变量 | 默认来源 | 说明 |
| --- | --- | --- |
| --card-radius | --radius-md | Root 圆角。 |
| --card-border | none | Root border 简写。 |
| --card-shadow | none | Root 阴影。 |
| --card-background | --elevated-background | 各区域共享背景回退值。 |
| --card-header-background / --card-content-background / --card-footer-background | --card-background | 区域背景。 |
| --card-header-padding / --card-content-padding / --card-footer-padding | 1rem | 区域内边距。 |
| --card-header-divider / --card-footer-divider | 1px solid var(--border) | 区域分隔符简写。 |
