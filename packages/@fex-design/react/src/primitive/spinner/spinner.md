# React Primitive Spinner

带基础视觉样式、原生属性透传和可组合结构的底层 Spinner 组件。

Primitive 层不承担内容 loading 状态管理，也不决定 children 是否显示。它提供独立的 Spinner、容器、遮罩和文本节点，适合需要自行组织 loading DOM 的场景。

## 导入

    import {
      Spinner,
      SpinnerContainer,
      SpinnerText,
    } from '@fex-design/react/primitive/spinner'

## 组件

| 组件 | 元素 | 说明 |
| --- | --- | --- |
| Spinner | span | Loading 指示器，默认渲染 LoadingIcon。 |
| SpinnerContainer | div | Loading 内容的基础容器，默认提供相对定位。 |
| SpinnerText | span | Loading 描述文本。 |

## 示例

示例保存在 `examples/<name>`，作为文档预览的源码。

| 名称 | 覆盖内容 |
| --- | --- |
| basic | Spinner、SpinnerContainer 和 SpinnerText 的基础组合。 |

## Spinner API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 指示器尺寸。 |
| children | `ReactNode` | LoadingIcon | 自定义指示器内容；传入后替换默认 LoadingIcon。 |
| 原生属性 | `ComponentProps<'span'>` | — | 透传原生 span 属性与事件。 |

## SpinnerContainer API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| 原生属性 | `ComponentProps<'div'>` | — | 透传原生 div 属性与事件。 |

## SpinnerText API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| children | `ReactNode` | — | 文本或自定义内容。 |
| 原生属性 | `ComponentProps<'span'>` | — | 透传原生 span 属性与事件。 |

## 组合方式

Primitive 组件不会自动包裹 children，也不会根据 loading 状态切换内容。需要内容 loading 时，调用方可以显式组合：

    <SpinnerContainer>
      <Content />
      <div className="absolute inset-0 flex items-center justify-center">
        <Spinner />
        <SpinnerText>加载中...</SpinnerText>
      </div>
    </SpinnerContainer>

`Spinner` 接收 children 作为自定义 loading 指示器：

    <Spinner>
      <CustomLoadingIcon />
    </Spinner>

## 样式与布局

Primitive 提供基础 class 和默认视觉样式。`SpinnerContainer` 默认只负责容器定位，`SpinnerOverlay` 默认负责覆盖和居中 loading 内容；水平、垂直排列以及间距可以通过调用方的 `className` 和 `style` 覆盖。
