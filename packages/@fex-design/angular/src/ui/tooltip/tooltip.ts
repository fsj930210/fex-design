import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  TemplateRef,
} from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import type {
  TooltipClassNames,
  TooltipSemanticPart,
} from '@fex-design/core/tooltip/create-tooltip'
import {
  Tooltip as PrimitiveTooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
} from '../../primitive/tooltip/tooltip'

@Component({
  selector: 'div[tooltip]',
  standalone: true,
  exportAs: 'tooltip',
  providers: [{ provide: PrimitiveTooltip, useExisting: forwardRef(() => Tooltip) }],
  imports: [NgTemplateOutlet, TooltipArrow, TooltipContent, TooltipPortal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents', '[class]': "''", '[attr.title]': 'null' },
  templateUrl: './tooltip.html',
})
export class Tooltip extends PrimitiveTooltip {
  readonly title = input<string | TemplateRef<unknown>>('')
  readonly color = input<string>()
  readonly direction = input<'ltr' | 'rtl' | 'auto' | undefined>(undefined, { alias: 'dir' })
  readonly arrow = input(true)
  readonly className = input('', { alias: 'class' })
  readonly classNames = input<TooltipClassNames>({})
  readonly styles = input<Partial<Record<TooltipSemanticPart, Record<string, string | number>>>>({})
  readonly titleTemplate = computed(() =>
    this.title() instanceof TemplateRef ? (this.title() as TemplateRef<unknown>) : null,
  )
  readonly rootStyle = computed(() => ({
    ...(this.color() ? { '--tooltip-background': this.color()! } : {}),
    ...this.styles().root,
  }))
}

export { TooltipTrigger } from '../../primitive/tooltip/tooltip'
export type {
  TooltipOptions,
  TooltipClassNames,
  TooltipSemanticPart,
} from '@fex-design/core/tooltip/create-tooltip'
