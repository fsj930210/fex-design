# Solid UI Spinner

推荐用于独立指示器和内容 loading 的入口。

## 导入

    import { Spinner, SpinnerContainer } from '@fex-design/solid/ui/spinner'

## 示例

`basic`、`sizes`、`custom-indicator`、`container`、`text`、`styling` 覆盖独立指示器、自定义指示器、内容 loading、描述文本和结构化样式。

## API

`Spinner` 支持 `size` 和用于替换指示器的 children。`SpinnerContainer` 支持 `spinning`、`size`、`text`、`indicator`、`classNames`、`styles`。`spinning` 为 undefined 时输出独立 Spinner，为 false 时只输出 children，为 true 时输出 children 和遮罩。
