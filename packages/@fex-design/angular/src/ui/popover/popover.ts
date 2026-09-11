import { ChangeDetectionStrategy, Component, computed, forwardRef, input, TemplateRef } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import type { PopoverClassNames, PopoverSemanticPart } from '@fex-design/core/popover/types'
import {
  Popover as PrimitivePopover, PopoverArrow, PopoverContent,
  PopoverHeader, PopoverPortal, PopoverTitle,
} from '../../primitive/popover/popover'

@Component({
  selector: 'div[popoverRoot]', standalone: true, exportAs: 'popover',
  providers: [{ provide: PrimitivePopover, useExisting: forwardRef(() => Popover) }],
  imports: [NgTemplateOutlet, PopoverArrow, PopoverContent, PopoverHeader, PopoverPortal, PopoverTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents', '[class]': "''" },
  templateUrl: './popover.html',
})
export class Popover extends PrimitivePopover {
  readonly title = input<string | TemplateRef<unknown>>()
  readonly content = input<string | TemplateRef<{ open: boolean; close: () => void }>>()
  readonly className = input('', { alias: 'class' })
  readonly classNames = input<PopoverClassNames>({})
  readonly styles = input<Partial<Record<PopoverSemanticPart, Record<string, string | number>>>>({})
  readonly titleTemplate = computed(() => this.title() instanceof TemplateRef ? this.title() as TemplateRef<unknown> : null)
  readonly contentTemplate = computed(() => this.content() instanceof TemplateRef ? this.content() as TemplateRef<{ open: boolean; close: () => void }> : null)
  readonly contentContext = computed(() => ({ open: this.snapshot().open, close: this.overlay.close }))
}

export { PopoverTrigger } from '../../primitive/popover/popover-trigger'
export { createPopover } from '../../primitive/popover/create-popover'
export type { PopoverOptions, PopoverClassNames, PopoverSemanticPart } from '@fex-design/core/popover/types'
