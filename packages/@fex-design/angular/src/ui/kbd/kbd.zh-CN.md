# Angular UI Kbd

Kbd Primitive 的 UI 层同名入口；不增加额外行为。

## 导入

    import { Kbd, KbdGroup } from '@fex-design/angular/ui/kbd'

## 组件

| 组件 | 元素 | 说明 |
| --- | --- | --- |
| Kbd | kbd | 继承原生 kbd，原生 kbd 的所有属性和事件均可透传；单个键盘按键。 |
| KbdGroup | div | 继承原生 div，原生 div 的所有属性和事件均可透传；组合多个按键。 |

## 示例

示例保存在 `examples/<name>`，作为官网预览源码。

| 名称 | 覆盖内容 |
| --- | --- |
| basic | 单个按键。 |
| group | 快捷键组合。 |

## API

该组件族不增加额外状态属性；内容、class、style、ARIA 和原生事件按对应元素透传。
