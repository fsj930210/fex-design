import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, input, type TemplateRef } from '@angular/core'
import type { EmptyClassNames as EmptyClassNamesBase, EmptyStyles as EmptyStylesBase } from '@fex-design/core/empty/types'
import { emptyClassName } from '@fex-design/styles/empty'
import { EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '../../primitive/empty/empty'
import { createHostClassName } from '../../signals/host-class'

export type EmptyClassNames = EmptyClassNamesBase
export type EmptyStyles = EmptyStylesBase<string>

@Component({
  selector: 'empty-default-image',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  templateUrl: './default-empty-image.html',
})
class DefaultEmptyImage {}

@Component({
  selector: 'div[empty]',
  standalone: true,
  imports: [NgTemplateOutlet, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent, DefaultEmptyImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', '[style]': 'styles().root', 'data-slot': 'empty' },
  templateUrl: './empty.html',
})
export class Empty {
  readonly image = input<string | TemplateRef<unknown> | null | undefined>()
  readonly title = input<string | undefined>()
  readonly description = input<string | undefined>()
  readonly classNames = input<EmptyClassNames>({})
  readonly styles = input<EmptyStyles>({})
  protected readonly hostClassName = createHostClassName(() => [emptyClassName, this.classNames().root].filter(Boolean).join(' '))
  protected readonly imageUrl = computed(() => typeof this.image() === 'string' ? this.image() as string : undefined)
  protected readonly imageTemplate = computed(() => typeof this.image() === 'object' && this.image() !== null ? this.image() as TemplateRef<unknown> : undefined)
}

export { EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle }
