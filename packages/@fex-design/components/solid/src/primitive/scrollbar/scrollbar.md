# Scrollbar

Import named parts from `@fex-design/solid/primitive/scrollbar`. The Primitive has default styles; Viewport retains native scrolling. UI Scrollbar from `@fex-design/solid/ui/scrollbar` assembles the parts for direct use.

```tsx
import { ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarCorner, ScrollbarTrack, ScrollbarThumb } from '@fex-design/solid/primitive/scrollbar'

export function ScrollbarBasicExample() {
  return (
    <ScrollbarRoot class="h-48 w-72 rounded-md border" autoHide="never" overflow={{ x: 'hidden' }}>
      <ScrollbarViewport overflow={{ y: 'auto' }}>
        <div class="h-96 w-[36rem] p-4">Native scrolling with explicit Track and Thumb.</div>
      </ScrollbarViewport>
      <ScrollbarBar axis="y">
        <ScrollbarTrack axis="y">
          <ScrollbarThumb axis="y" />
        </ScrollbarTrack>
      </ScrollbarBar>
      <ScrollbarCorner />
    </ScrollbarRoot>
  )
}
```

## API

Root inherits native div attributes, class and style. Its options update the same controller after mount.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `overflow` | `{ x?: 'auto' \| 'hidden'; y?: 'auto' \| 'hidden' }` | both auto | No | Root policy; Viewport overrides each axis independently. |
| `visibility` | `'auto' \| 'always' \| 'hidden'` | 'auto' | No | Visibility policy, before autoHide. |
| `autoHide` | `'never' \| 'scroll' \| 'move' \| 'leave'` | 'scroll' | No | Persistent, scrolling, movement or pointer-leave policy. |
| `autoHideDelay` | `number` | 900 | No | Inactivity or pointer-leave delay in milliseconds. |
| `dragScroll` | `boolean` | true | No | Allow Thumb dragging. |
| `clickScroll` | `false \| 'page' \| 'jump'` | false | No | Track click disabled, page step or jump. |
| `minThumbSize` | `number` | 24 | No | Minimum Thumb size in pixels, capped by the track. |
| `disabled` | `boolean` | false | No | Disable custom bar interactions while keeping native scrolling. |

Viewport accepts the same `overflow` object and inherits missing axes from Root. Bar, Track and Thumb require `axis: 'x' | 'y'`. All parts inherit native host attributes and styles; React uses `className`, the other frameworks use `class`.

Bar renders only supplied content. Compose Track and Thumb explicitly inside Bar; an empty Bar creates neither part. Parts expose data-slot; Bar/Track/Thumb also expose data-axis. React/Solid/Svelte notify `onScrollChange(detail)`; Vue/Angular emit `scrollChange`, with `{ scrollLeft, scrollTop }`.

## Automatic hiding

- `never`: stay active.
- `scroll`: show while scrolling and hide after autoHideDelay of inactivity.
- `move`: show on pointer movement or scrolling; hide after inactivity.
- `leave`: stay visible while the pointer is inside; hide autoHideDelay after leaving.

Visibility always/hidden overrides autoHide. Hidden overflow axes do not show a bar. Dragging pins visibility until release or cancellation.

## Custom logic

The same entry exports `createScrollbar` for custom native markup, plus shared Scrollbar option/detail/controller types. Use the documented data-slot/data-axis structure. The returned controller supports `update()`, `scrollTo(options)`, `scrollBy(options)`, and replacement-snapshot `setOptions(options)`. Framework adapters clean up on unmount; replacing callbacks or options does not recreate the controller.

See [the shared contract](../../../../../../../docs/scrollbar-primitive-contract.md) for the lifecycle, binding and overflow rules.


## CSS Variables

`--scrollbar-size`, `--scrollbar-padding`, `--scrollbar-radius`, `--scrollbar-track-color`, `--scrollbar-thumb-color`, `--scrollbar-thumb-hover-color`, `--scrollbar-thumb-active-color`, `--scrollbar-corner-color`, `--scrollbar-transition-duration`.

`showTrack` defaults to `false` (transparent track/corner). Set it to `true` for visible default backgrounds. It preserves DOM, layout and interaction; CSS variables customize the colors.

`showCorner` inherits showTrack when omitted. Override it with true/false to control only the corner background; slider clearance remains reserved.
