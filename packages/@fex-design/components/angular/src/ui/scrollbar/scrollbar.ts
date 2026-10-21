import type { NativeAttributes } from '@fex-design/angular/directives/native-attributes'
import type { ScrollbarOverflow } from '@fex-design/core/scrollbar/types'
import { cn } from '@fex-design/utils'
import { mergeStyle } from '@fex-design/angular/signals/merge-style'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  forwardRef,
  input,
  viewChild,
} from '@angular/core'
import type { ScrollbarPart } from '@fex-design/core/scrollbar/types'
import { resolveScrollbarOverflow } from '@fex-design/core/scrollbar/create-scrollbar-controller'
import {
  ScrollbarRoot,
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
  ScrollbarCorner,
} from '../../primitive/scrollbar'
import { ScrollbarViewport } from './scrollbar-viewport'
import { scrollbarAppearance, type ScrollbarStyle } from './context'

@Component({
  selector: 'div[scrollbar]',
  standalone: true,
  exportAs: 'scrollbar',
  imports: [ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb, ScrollbarCorner],
  providers: [
    { provide: ScrollbarRoot, useExisting: forwardRef(() => Scrollbar) },
    { provide: scrollbarAppearance, useExisting: forwardRef(() => Scrollbar) },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'scrollbar-root' },
  templateUrl: './scrollbar.html',
})
export class Scrollbar extends ScrollbarRoot {
  readonly horizontalBarProps = input<Pick<NativeAttributes, 'class' | 'style'>>()
  readonly verticalBarProps = input<Pick<NativeAttributes, 'class' | 'style'>>()
  readonly horizontalTrackProps = input<Pick<NativeAttributes, 'class' | 'style'>>()
  readonly verticalTrackProps = input<Pick<NativeAttributes, 'class' | 'style'>>()
  readonly horizontalThumbProps = input<Pick<NativeAttributes, 'class' | 'style'>>()
  readonly verticalThumbProps = input<Pick<NativeAttributes, 'class' | 'style'>>()
  readonly cornerProps = input<Pick<NativeAttributes, 'class' | 'style'>>()
  readonly viewportProps = input<
    Pick<NativeAttributes, 'class' | 'style'> & { overflow?: ScrollbarOverflow | undefined }
  >()
  protected readonly cn = cn
  protected readonly mergeStyle = mergeStyle
  readonly classNames = input<Partial<Record<ScrollbarPart, string>>>()
  readonly styles = input<Partial<Record<ScrollbarPart, ScrollbarStyle>>>()
  protected readonly axes = ['x', 'y'] as const
  protected readonly resolved = computed(() =>
    resolveScrollbarOverflow(
      this.projectedViewport()?.overflow() ?? this.viewportProps()?.overflow,
      this.overflow(),
    ),
  )
  private readonly projectedViewport = contentChild(ScrollbarViewport)
  private readonly defaultViewport = viewChild(ScrollbarViewport)
  readonly viewportElement = computed(
    () => (this.projectedViewport() ?? this.defaultViewport())?.element,
  )
}
