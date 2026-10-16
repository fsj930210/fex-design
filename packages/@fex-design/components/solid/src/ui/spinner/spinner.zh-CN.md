# Solid UI Spinner

独立 loading 指示器和带自动遮罩的内容容器。

## 导入

    import { Spinner, SpinnerContainer } from '@fex-design/solid/ui/spinner'

## 组件

| 组件             | 元素 | 说明                                                                       |
| ---------------- | ---- | -------------------------------------------------------------------------- |
| Spinner          | span | 继承原生 span，原生 span 的所有属性和事件均可透传；loading 指示器。        |
| SpinnerContainer | div  | 继承原生 div，原生 div 的所有属性和事件均可透传；内容与 loading 状态容器。 |

## 示例

| 名称             | 覆盖内容       |
| ---------------- | -------------- |
| basic            | 基础指示器。   |
| sizes            | 三种尺寸。     |
| custom-indicator | 自定义指示器。 |
| overlay          | 内容区域遮罩。 |
| styling          | 结构化样式。   |

## API

以下属性属于 `SpinnerContainer`；独立 `Spinner` 使用 Primitive 的 `size` 和原生 span 属性。

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| spinning | boolean \| undefined | undefined | 否 | 未设置时显示独立指示器；false 显示内容；true 在内容上方显示加载遮罩。 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 否 | 指示器尺寸。 |
| text | JSX.Element | — | 否 | 加载说明，存在时默认与指示器纵向居中排列。 |
| indicator | JSX.Element | 默认 LoadingIcon | 否 | 替换默认指示器。 |
| classNames | SpinnerClassNames | — | 否 | 设置 root、spinner、overlay、text 的类名。 |
| styles | SpinnerStyles<JSX.CSSProperties> | — | 否 | 设置 root、spinner、overlay、text 的样式。 |

未提供 `indicator` 时保留默认 LoadingIcon。`spinning` 在 true 与 false 之间切换时，内容保持挂载，保留内部状态与滚动位置。
