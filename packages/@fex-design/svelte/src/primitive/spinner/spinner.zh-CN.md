# Svelte Primitive Spinner

底层有样式 Spinner 原子组件。`Spinner` 渲染指示器，`SpinnerContainer` 组合 loading 内容，`SpinnerText` 渲染描述文本。Primitive 不管理 `spinning`，也不渲染遮罩。

## 导入

    import { Spinner, SpinnerContainer, SpinnerText } from '@fex-design/svelte/primitive/spinner'

## API

`Spinner` 支持 `size: 'sm' | 'md' | 'lg'`，children snippet 会替换内置 LoadingIcon。所有组件透传原生 span 属性，组合布局通过 `class` 和 `style` 控制。

## 示例

`basic` 直接组合 SpinnerContainer、Spinner 和 SpinnerText。
