# Progress

Assembles Progress Primitive into linear, circle, dashboard and segmented progress, with info placement and semantic styling.

## Import

```ts
import { Progress } from '@fex-design/svelte/ui/progress'
```

```svelte
<Progress value={65} label="Upload progress" infoPlacement="top" />
```

## Examples

| ID | Scenario |
| --- | --- |
| `basic` | Basic |
| `status` | Status |
| `color` | Color |
| `segmented` | Segmented progress |
| `size` | Size |
| `linecap` | Border radius |
| `circle` | Circle |
| `dashboard` | Dashboard |
| `dynamic` | Dynamic value |
| `direction` | LTR / RTL |
| `structured` | Semantic styles |
| `custom-gap` | Segment gap |
| `format` | Formatting and info placement |
| `gradient` | Gradient |
| `multi-range` | Multiple ranges |

## API

| Property | Type / Default |
| --- | --- |
| value / min / max | number / null; 0 / 0 / 100 |
| variant | line / circle / dashboard; line |
| status | pending / active / success / error; derived |
| size | sm / md / lg / number; line: 8, circle: 48 |
| thickness | number; line: 8, circle: 4 |
| steps / gap | number; gap: 2px |
| color | string / { from, to, direction? } / { stops, direction? } |
| trackColor | string |
| linecap / trackLinecap | round / butt / square; round |
| gapDegree | number; 75 |
| gapPlacement | top / bottom / start / end / left / right; bottom |
| showInfo / showValue | boolean / undefined |
| infoPlacement | outside / inside / top / bottom / none; outside |
| label | Snippet / string |
| format | (percent, value) => string / number |
| success | boolean; false |
| classNames / styles | root, track, range, info, label, step |

Info visibility uses showInfo ?? showValue ?? the default. Lines show info by default; circles and dashboards default to visible only for inside placement. format takes precedence over success icons and receives percent in 0–100. bottom does not duplicate the top label; none renders no info.

Regular circle gradients use separate SVG gradient IDs; segmented circles select colors per segment. gapDegree applies to regular dashboards. top uses 315° rotation; the other gapPlacement values follow the current React geometry rotation. trackColor applies to lines and stepped tracks; regular circles retain the Primitive default track style.

classNames and styles target the corresponding parts. Native root style takes precedence over styles.root. Native attributes, events and element access follow framework conventions.

label accepts text or a Snippet. info accepts a Snippet receiving { percent, value } and takes precedence over format. Use bind:ref to access the element.

## CSS

--progress-remaining controls the remaining track color.

`ranges` composes adjacent line ranges from `{ value, color? }` items. Values are lengths within `max - min`; their sum replaces `value` and is capped at capacity. It applies only to line progress without `steps`.

Line radii use native class/style or `classNames`/`styles`; `linecap` and `trackLinecap` apply only to circle/dashboard SVG strokes.
