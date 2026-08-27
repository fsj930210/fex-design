# React UI Spinner

用于独立 loading 指示和内容区域 loading 的推荐 Spinner。UI 入口暴露 `Spinner` 与 `SpinnerContainer` 两个组件。

## 导入

    import { Spinner, SpinnerContainer } from '@fex-design/react/ui/spinner'

## 组件

| 组件 | 说明 |
| --- | --- |
| Spinner | 独立 loading 指示器。 |
| SpinnerContainer | 保留内容并显示局部 loading 遮罩的容器。 |

## 示例

示例保存在 `examples/<name>`，作为文档预览源码。

| 名称 | 覆盖内容 |
| --- | --- |
| basic | 使用内置 LoadingIcon 的独立 Spinner。 |
| sizes | 小、中、大三种尺寸。 |
| custom-indicator | 替换内置 loading 指示器。 |
| container | 带局部遮罩的内容 loading。 |
| text | Loading 文本和垂直布局。 |
| styling | 结构化 class 定制。 |

## Spinner API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 指示器尺寸。 |
| children | `ReactNode` | `LoadingIcon` | 自定义指示器内容。 |
| 原生属性 | `ComponentProps<'span'>` | — | 透传原生 span 属性与事件。 |

## SpinnerContainer API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| spinning | `boolean \| undefined` | — | `undefined` 直接渲染独立 Spinner；`false` 只渲染 children；`true` 渲染 children 并显示遮罩。 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 遮罩内指示器尺寸。 |
| text | `ReactNode` | — | 可选 loading 描述文本。 |
| indicator | `ReactNode` | `LoadingIcon` | 遮罩内自定义指示器。 |
| classNames | `SpinnerClassNames` | — | 按语义部位覆盖 class。 |
| styles | `SpinnerStyles<CSSProperties>` | — | 按语义部位覆盖行内样式。 |
| children | `ReactNode` | — | 容器内保持显示的内容。 |
| 原生属性 | `ComponentProps<'div'>` | — | 透传原生 div 属性与事件。 |

## Loading 状态

    <SpinnerContainer spinning={loading} text="加载中...">
      <DataTable />
    </SpinnerContainer>

容器始终保留 children。`spinning` 为 `true` 时，在内容上方显示局部遮罩；为 `false` 时只显示内容；为 `undefined` 时作为独立 Spinner 快捷使用。

## 自定义指示器

    <SpinnerContainer spinning indicator={<CustomLoadingIcon />}>
      <DataTable />
    </SpinnerContainer>

独立 Spinner 直接通过 children 替换：

    <Spinner><CustomLoadingIcon /></Spinner>

## 文本布局

遮罩默认水平居中。传入 `text` 后，UI 自动增加 `flex-col`，使指示器和文本垂直排列。这只是默认 class，不是公开的 layout prop，可以通过语义 class 覆盖。

## 结构化样式

    <SpinnerContainer
      spinning
      classNames={{ overlay: 'bg-primary/10', spinner: 'text-primary', text: 'text-primary' }}
    >
      <Content />
    </SpinnerContainer>

可用部位为 `root`、`spinner`、`overlay`、`indicator`、`text`。
