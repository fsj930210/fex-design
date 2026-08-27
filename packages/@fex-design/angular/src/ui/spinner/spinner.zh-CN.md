# Angular UI Spinner

推荐用于独立指示器和内容 loading 的 Spinner 入口。`Spinner` 是独立指示器；`SpinnerContainer` 管理 `spinning` 和局部遮罩。

## 导入

    import { Spinner, SpinnerContainer } from '@fex-design/angular/ui/spinner'

## 示例

| 名称 | 覆盖内容 |
| --- | --- |
| basic | 独立 Spinner。 |
| sizes | 可用指示器尺寸。 |
| custom-indicator | 自定义指示器内容。 |
| container | 带遮罩的内容 loading。 |
| text | Loading 文本。 |
| styling | 语义 class 与 style 定制。 |

## SpinnerContainer API

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| spinning | `boolean \| undefined` | `undefined` | `undefined` 渲染独立 Spinner；`false` 渲染内容；`true` 渲染内容和遮罩。 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 遮罩内指示器尺寸。 |
| text | string 或投影内容 | — | Loading 描述。 |
| indicator | 投影内容 | 内置图标 | 自定义 loading 指示器。 |
| classNames | 语义 class 映射 | — | 定位 root、spinner、overlay、text。 |
| styles | 语义 style 映射 | — | 定位 root、spinner、overlay、text。 |

遮罩默认水平居中；提供文本时默认添加垂直堆叠 class，调用方可通过语义 class 覆盖。
