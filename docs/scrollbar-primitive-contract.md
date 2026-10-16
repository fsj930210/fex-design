# Scrollbar Primitive contract

Scrollbar is a styled Primitive. Core owns geometry, pointer interaction, visibility and DOM subscriptions; framework adapters own reactive configuration, lifecycle and native element access. Bar renders only supplied content; callers explicitly compose Track and Thumb. UI Scrollbar assembles these parts; direct Primitive Bar usage remains explicit.

## Configuration

- Every mounted Root owns one stable controller. Prop changes call `setOptions` without reconnecting listeners or resetting scroll position.
- `setOptions` replaces the configuration snapshot. Omitted or undefined values return to defaults; false and zero remain meaningful values. Negative delay and thumb size are clamped to zero.
- Defaults: visibility `auto`, autoHide `scroll`, delay `900`, dragScroll `true`, clickScroll `false`, minThumbSize `24`, disabled `false`.
- The latest scroll callback receives `{ scrollLeft, scrollTop }` once per native Viewport scroll event. Updating options or measuring geometry does not emit a scroll event.
- `disabled` disables custom drag, track-click and wheel forwarding. Native Viewport scrolling and programmatic scrolling remain available.

## Visibility

| Option | Behavior |
| --- | --- |
| `visibility: auto` | Show eligible bars only when the axis overflows and the autoHide policy is active. |
| `visibility: always` | Keep eligible bars visible, including when content fits. |
| `visibility: hidden` | Hide all bars while preserving native scrolling. |
| `autoHide: never` | Keep bars active. |
| `autoHide: scroll` | Show on scrolling; hide after scroll inactivity for autoHideDelay. Pointer hover does not pin visibility. |
| `autoHide: move` | Show on pointer movement or scrolling; hide after inactivity for autoHideDelay. |
| `autoHide: leave` | Show on pointer entry or scrolling; keep visible while inside; hide autoHideDelay after leaving. |

Visibility overrides autoHide. An axis whose effective overflow is hidden has no eligible bar. Dragging pins visibility until pointer release/cancel; then the current policy resumes. Changing the visibility policy clears its old timer and recomputes activity from the current pointer/drag state.

## Overflow

Root and Viewport use the same `overflow?: { x?: 'auto' | 'hidden'; y?: 'auto' | 'hidden' }` API. Each Viewport axis resolves independently: Viewport value, then Root value, then `auto`. For example Root `{ x: 'hidden', y: 'auto' }` and Viewport `{ y: 'hidden' }` produce two hidden axes.

Class, style and native attributes remain customizable using the framework's native API. Core reads the resulting computed overflow before applying custom axis interactions.

## Parts and custom logic

- Six parts: ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb, ScrollbarCorner.
- Bar requires axis `x` or `y` and renders only its supplied content. Callers explicitly compose Track and Thumb inside it; an empty Bar creates neither part.
- Track and Thumb also receive axis. Bar, Track and Thumb expose `data-axis`; all six parts expose `data-slot="scrollbar-<part>"`.
- Core manages Bar `data-visible`/`data-disabled`, Thumb `data-dragging`, and Thumb size/transform. Framework renderers initialize visibility but do not maintain a second visibility state.
- Parts belong to their nearest Scrollbar Root. Changes to conditional parts rebind only when their native elements or axis change. Nested Roots do not share bindings.
- Resize observation covers Root, Viewport, direct content elements and tracks. DOM mutations, resource loads and completed transitions/animations request geometry updates. Custom external layout systems can call `controller.update()` explicitly.
- Pointer listeners, capture, observers, animation frames and hide timers are released on disconnect/unmount.

Public imports use the component family entry `@fex-design/<framework>/primitive/scrollbar` (or `/ui/scrollbar`), with named exports. Context helpers remain private.

Every part exposes its native element through the framework's own binding: React/Solid `ref`, Vue component ref `.element`, Svelte `bind:element`, and Angular the part's exportAs reference `.element` (or a native ElementRef query). Root controllers are available through the standalone logic adapters; Vue and Angular Root references also expose `controller`.

| Framework | Standalone logic | Root binding |
| --- | --- | --- |
| React | `useScrollbar(options)` | `ref={binding.rootRef}` |
| Vue | `useScrollbar(() => options)` | template `ref="root"` from the returned binding |
| Solid | `createScrollbar(() => options)` | `ref={binding.rootRef}` |
| Svelte | `createScrollbar(() => options)` | native element `use:binding.root` |
| Angular | `createScrollbar(() => options, () => element)` | native element source, created in an injection context |

Standalone logic uses Core `onScroll`; Root components expose `onScrollChange` in React/Solid/Svelte and `scrollChange` in Vue/Angular. Custom markup supplies the same data-slot/data-axis structure as the built-in parts.

## Framework references

The adapters follow framework-native external-system synchronization and cleanup boundaries, checked against [Vue watchers](https://vuejs.org/api/reactivity-core.html#watch), [Solid effects](https://docs.solidjs.com/reference/basic-reactivity/create-effect), [Svelte effects](https://svelte.dev/docs/svelte/$effect), and [Angular render effects](https://angular.dev/api/core/afterRenderEffect). Component organization was checked against [Element Plus Scrollbar](https://github.com/element-plus/element-plus/blob/dev/packages/components/scrollbar/src/scrollbar.vue), [Ark UI Solid ScrollArea](https://github.com/chakra-ui/ark/blob/main/packages/solid/src/components/scroll-area/use-scroll-area.ts), [Bits UI ScrollArea](https://github.com/huntabyte/bits-ui/blob/main/packages/bits-ui/src/lib/bits/scroll-area/scroll-area.svelte.ts), and [Angular CDK Scrollable](https://github.com/angular/components/blob/main/src/cdk/scrolling/scrollable.ts).

## UI composition

- Scrollbar uses one Primitive Root/controller and creates one Viewport. Each effective auto axis creates Bar > Track > Thumb; hidden axes omit the bar.
- classNames/styles address viewport, barX, barY, trackX, trackY, thumbX, thumbY and corner. Root native class/style stay on Root. Viewport native class/style merge last.
- Root data-scrollbar-x/y expose current eligible visibility to shared Primitive corner styles; no framework stores duplicate visibility state. Both visible bars reserve the corner.
- React/Solid accept viewportProps.ref; Vue exposes viewportElement; Svelte binds viewportElement. Angular accepts a native projected div[scrollbarViewport], otherwise supplies the default viewport.
- Position offsets are ordinary part styles. The single-table demo owns its header ResizeObserver and updates --table-header-height; sticky thead preserves native shared column layout and horizontal scrolling.

## Appearance and directions

All parts use the same CSS-variable-based shared defaults in both layers. UI only assembles parts. Public variables are listed in docs/api/{primitive,ui}/scrollbar.json. Root native dir controls reading direction. Core converts CSSOM RTL scrollLeft into logical geometry, including pointer drag and vertical-wheel forwarding; callbacks retain native coordinates. See [CSSOM View scrolling coordinates](https://drafts.csswg.org/cssom-view/#scrolling-area-origin).

## Example coverage

| Public surface | Scene |
| --- | --- |
| Vertical / horizontal / both axes | basic, horizontal, both-axes |
| showTrack false (default) / true | track-visibility |
| Native dir and RTL interaction | direction |
| autoHide, autoHideDelay, disabled, scrollChange | configuration |
| visibility auto / always / hidden, non-overflowing content | visibility |
| clickScroll page / jump, dragScroll, minThumbSize | interaction |
| Root overflow and partial Viewport override | overflow |
| Explicit Bar, Track, Thumb and Corner composition with default appearance | parts |
| UI classNames/styles with all eight part keys | styling (UI only) |
| All nine public appearance variables | css-variables |
| Native attributes/events, Viewport element access, scrollTo/scrollBy | viewport |
| Position offsets and wrapped sticky table header | table |
| Standalone framework logic and custom Root markup | custom-logic |

All five frameworks have 15 UI scenes and 14 Primitive scenes in the same order, with the same options, content and controls. Configuration uses UI Select, InputNumber and Checkbox in both layers. Shared demo data lives in docs/shared/src/scrollbar-demo.ts. Metadata and generated source/Angular Preview registrations are synchronized.

Root showTrack defaults to false and controls Track background. Optional showCorner inherits showTrack only when omitted; explicit true/false controls Corner background independently. Neither prop removes parts, changes geometry or disables interaction. Public CSS variables customize the visible colors. Root-scoped appearance variables reset at nested Roots so these values do not leak into another Root. Parts, interaction, styling and CSS-variable scenes explicitly enable showTrack where the backgrounds are demonstrated. Standalone parts outside a built-in Root retain their own visible fallback styles. The track-visibility scene covers default, showTrack, showTrack with showCorner=false, and showCorner with showTrack=false. Corner background connections only extend from tracks when showCorner is resolved true; slider clearance remains unchanged.

Validation for this revision is source-only: syntax parsing, entry/scene/variable coverage and diff whitespace checks. No tests, typecheck, lint, build, browser session or running service were invoked. Rendered layout and runtime interaction remain unverified.
