# Vue Primitive Spinner

底层有样式 Spinner 原子组件。`Spinner` 提供指示器，`SpinnerContainer` 负责组合内容，`SpinnerText` 提供描述文本。Primitive 不管理 `spinning`，也不渲染内容遮罩。

## 导入

    import { Spinner, SpinnerContainer, SpinnerText } from '@fex-design/vue/primitive/spinner'

## API

`Spinner` 支持 `size: 'sm' | 'md' | 'lg'`；默认 slot 会替换内置 LoadingIcon。三个组件都透传原生属性，组合布局通过 `class` 和 `style` 控制。

## 示例

`basic` 直接组合三个 Primitive 组件。
