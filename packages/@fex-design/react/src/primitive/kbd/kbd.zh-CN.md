# Kbd Primitive

`Kbd` 用于展示键盘按键，`KbdGroup` 用于组合多个按键。Primitive 提供带基础样式的原生元素封装，并透传原生属性与事件。

```tsx
import { Kbd, KbdGroup } from '@fex-design/react/primitive/kbd'

<KbdGroup><Kbd>Ctrl</Kbd><Kbd>K</Kbd></KbdGroup>
```

## API

`Kbd` 继承 `ComponentProps<'kbd'>`，`KbdGroup` 继承 `ComponentProps<'div'>`。`className` 会与组件默认样式合并，children 由调用方提供。
