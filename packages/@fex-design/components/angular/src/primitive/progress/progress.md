# Progress Primitive

A styled, composable progress family. Root provides normalized values, status and ARIA; its parts render linear and circular progress.

## Import

```ts
import { Progress, ProgressTrack, ProgressRange, ProgressValue, ProgressLabel, ProgressCircle, ProgressCircleTrack, ProgressCircleRange } from '@fex-design/angular/primitive/progress'
```

```html
<div progressRoot [value]="65" class="flex w-full flex-col">
  <div progressTrack><div progressRange></div></div>
  <span progressValue>65%</span>
</div>
```

## Examples

| ID | Scenario |
| --- | --- |
| `basic` | Basic |
| `circle` | Circle |
| `status` | Status |
| `color` | Color |
| `segmented` | Segmented progress |
| `size` | Size |
| `linecap` | Border radius |
| `dashboard` | Dashboard |
| `dynamic` | Dynamic value |
| `direction` | LTR / RTL |
| `custom-gap` | Segment gap |
| `format` | Formatting and info placement |
| `gradient` | Gradient |
| `multi-range` | Multiple ranges |

## Root API

| Property | Type | Default |
| --- | --- | --- |
| value | number / null | 0 |
| min | number | 0 |
| max | number | 100 |
| variant | line / circle / dashboard | line |
| status | pending / active / success / error | derived from normalized value |
| size | number | 48 |
| thickness | number | line: 8; circle/dashboard: 4 |

Root does not own color, trackColor, linecap, trackLinecap, gapDegree or gapPlacement. Set colors and line caps on the corresponding parts through native class/style and SVG attributes.

## Parts

| Part | Semantic options |
| --- | --- |
| ProgressTrack | inherits Root thickness; override through native style |
| ProgressRange | value, offset |
| ProgressValue | displays supplied content |
| ProgressLabel | native content |
| ProgressCircle | gapDegree, rotation |
| ProgressCircleTrack | gapDegree, trackLinecap |
| ProgressCircleRange | gapDegree, linecap; native stroke |

Use native div, span, svg and circle hosts. The exported instance exposes element; use progressRoot, progressTrack, progressRange, progressValue, progressLabel, progressCircle, progressCircleTrack and progressCircleRange as bare host attributes.

## CSS

--progress-remaining controls the remaining track color.

Line radii use native class/style. SVG stroke endpoints belong to ProgressCircleRange and ProgressCircleTrack.
