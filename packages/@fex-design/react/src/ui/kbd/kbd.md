# Kbd UI

The UI layer re-exports the styled Primitive `Kbd` and `KbdGroup`.

## Import

```tsx
import { Kbd, KbdGroup } from '@fex-design/react/ui/kbd'
```

## Example

```tsx
<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>
```

## API

| Prop        | Type        | Default     | Required | Description              |
| ----------- | ----------- | ----------- | ---- | ------------------------ |
| `className` | `string`    | `undefined` | No | Merged with the element class. |
| `children`  | `ReactNode` | `undefined` | No | Key label or icon. |

The components forward native attributes and events and do not own state.
