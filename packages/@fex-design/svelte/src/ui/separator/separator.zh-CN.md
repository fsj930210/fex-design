# Svelte UI Separator

Separator Primitive 的 UI 层同名入口；不增加额外行为。

## 导入

    import { Separator } from '@fex-design/svelte/ui/separator'

## 组件

| 组件      | 元素 | 说明                                                                          |
| --------- | ---- | ----------------------------------------------------------------------------- |
| Separator | div  | 继承原生 div，原生 div 的所有属性和事件均可透传；在相关内容之间建立语义分隔。 |

## 示例

示例保存在 `examples/<name>`，作为官网预览源码。

| 名称     | 覆盖内容              |
| -------- | --------------------- |
| basic    | 水平分隔线。          |
| vertical | 垂直分隔线。          |
| menu     | 菜单分组。            |
| list     | 列表项分隔。          |
| text     | 带文本组合。          |
| variants | 通过 class 组合线型。 |

## API

| 名称        | 类型         | 默认值     | 说明         |
| ----------- | ------------ | ---------- | ------------ |
| orientation | 'horizontal' | 'vertical' | 'horizontal' | 分隔线方向。 |
