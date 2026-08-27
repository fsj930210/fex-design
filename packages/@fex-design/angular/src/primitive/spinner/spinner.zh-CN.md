# Angular Primitive Spinner

提供原生宿主属性透传和基础视觉样式的底层 Spinner 组件。由调用方决定 loading 状态和 DOM 组合。

## 导入

    import { Spinner, SpinnerContainer, SpinnerText } from '@fex-design/angular/primitive/spinner'

## 组件

| 组件 | 宿主元素 | 说明 |
| --- | --- | --- |
| Spinner | `span[spinner]` | Loading 指示器，默认渲染 LoadingIcon。 |
| SpinnerContainer | `span[spinnerContainer]` | 组合指示器和文本内容。 |
| SpinnerText | `span[spinnerText]` | Loading 描述文本。 |

## 示例

| 名称 | 覆盖内容 |
| --- | --- |
| basic | 三个 Primitive 组件的直接组合。 |
| sizes | 小、中、大三种 Spinner 尺寸。 |
| custom-indicator | 替换默认指示器内容。 |

## Spinner API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 指示器尺寸。 |
| 宿主属性 | 原生 span 属性 | — | 原生 class、style、无障碍属性与事件。 |

## 组合

Primitive 不管理 `spinning`，也不渲染遮罩。需要自定义布局或自行控制 loading 状态时，直接组合这些组件。
