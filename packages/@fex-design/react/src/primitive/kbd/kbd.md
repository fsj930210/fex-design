# Kbd Primitive

`Kbd` displays a keyboard key and `KbdGroup` composes a sequence of keys. Both components are styled native-element wrappers and forward native attributes and events.

```tsx
import { Kbd, KbdGroup } from '@fex-design/react/primitive/kbd'

<KbdGroup><Kbd>Ctrl</Kbd><Kbd>K</Kbd></KbdGroup>
```

## API

`Kbd` extends `ComponentProps<'kbd'>`; `KbdGroup` extends `ComponentProps<'div'>`. `className` is merged with the default styles.
