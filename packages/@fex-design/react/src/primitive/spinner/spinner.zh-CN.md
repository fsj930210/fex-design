# React Primitive Spinner

提供基础视觉样式、原生属性透传和可组合结构的底层 Spinner 组件。

Primitive 层不管理内容 loading 状态，也不负责判断 children 是否显示。它提供 Spinner、容器、遮罩和文本节点，适合需要自行组织 loading 结构的场景。

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
| SpinnerContainer | div | Loading 内容的基础容器。 |
| SpinnerText | span | Loading 描述文本。 |

## 示例

示例保存在 `examples/<name>`，作为文档预览源码。

| 名称 | 覆盖内容 |
| --- | --- |
| basic | 四个 Primitive 组件的基础组合。 |

## Spinner API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 指示器尺寸。 |
| children | `ReactNode` | LoadingIcon | 自定义指示器；传入后替换默认图标。 |
| 原生属性 | `ComponentProps<'span'>` | — | 透传原生 span 属性与事件。 |

## SpinnerContainer 与 SpinnerText API

三个组件都透传对应原生元素属性：

| 组件 | 原生元素 | 内容 |
| --- | --- | --- |
| SpinnerContainer | `div` | 任意 children。 |
| SpinnerText | `span` | 文本或自定义内容。 |

## 组合方式

    <SpinnerContainer>
      <Content />
      <div className="absolute inset-0 flex items-center justify-center">
        <Spinner />
        <SpinnerText>加载中...</SpinnerText>
      </div>
    </SpinnerContainer>

Primitive 不提供 `spinning` 状态切换；需要条件渲染时由上层容器或业务代码决定。布局可以通过 `className` 和 `style` 覆盖，组件不会把布局选择提升为额外 prop。
