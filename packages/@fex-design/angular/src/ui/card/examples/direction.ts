import { ChangeDetectionStrategy, Component, TemplateRef, viewChild } from '@angular/core'
import { Card } from '@fex-design/angular/ui/card'
@Component({ selector: 'card-ui-direction-example', standalone: true, imports: [Card], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './direction.html' })
export class DirectionExample { protected readonly directions = ['ltr', 'rtl']; protected readonly extraTemplate = viewChild.required<TemplateRef<unknown>>('extra'); protected readonly footerTemplate = viewChild.required<TemplateRef<unknown>>('footer') }
