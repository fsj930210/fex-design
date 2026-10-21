import type { NativeAttributes } from '@fex-design/angular/directives/native-attributes'
import { mergeStyle } from '@fex-design/angular/signals/merge-style'
import { cn } from '@fex-design/utils'
import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, input, type TemplateRef } from '@angular/core'
import { cardClassName } from '@fex-design/components-styles/card'
import type {
  CardClassNames as CardClassNamesBase,
  CardStyles as CardStylesBase,
} from '@fex-design/core/card/types'
import {
  CardContent,
  CardDescription,
  CardExtra,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@fex-design/angular/primitive/card'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

export type CardClassNames = CardClassNamesBase
export type CardStyles = CardStylesBase<string>

@Component({
  selector: 'div[card]',
  standalone: true,
  imports: [
    CardHeader,
    CardTitle,
    CardDescription,
    CardExtra,
    CardContent,
    CardFooter,
    NgTemplateOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ':host { display: block; }',
  host: {
    '[class]': 'hostClassName()',
    '[style]': 'styles().root',
    'data-slot': 'card',
  },
  templateUrl: './card.html',
})
export class Card {
  readonly headerProps = input<Pick<NativeAttributes, 'class' | 'style'>>()
  readonly titleProps = input<Pick<NativeAttributes, 'class' | 'style'>>()
  readonly descriptionProps = input<Pick<NativeAttributes, 'class' | 'style'>>()
  readonly extraProps = input<Pick<NativeAttributes, 'class' | 'style'>>()
  readonly contentProps = input<Pick<NativeAttributes, 'class' | 'style'>>()
  readonly footerProps = input<Pick<NativeAttributes, 'class' | 'style'>>()
  protected readonly cn = cn
  protected readonly mergeStyle = mergeStyle
  title = input<string | undefined>()
  description = input<string | undefined>()
  extra = input<TemplateRef<unknown> | undefined>()
  header = input<TemplateRef<unknown> | undefined>()
  footer = input<TemplateRef<unknown> | undefined>()
  classNames = input<CardClassNames>({})
  styles = input<CardStyles>({})

  protected readonly hostClassName = createHostClassName(() =>
    [cardClassName, this.classNames().root].filter(Boolean).join(' '),
  )
}

export { CardContent, CardDescription, CardExtra, CardFooter, CardHeader, CardTitle }
