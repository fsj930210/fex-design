import { ChangeDetectionStrategy, Component, TemplateRef, viewChild } from '@angular/core'
import { Empty } from '@fex-design/angular/ui/empty'
@Component({ selector: 'empty-ui-image-example', standalone: true, imports: [Empty], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './image.html' })
export class ImageExample { protected readonly customImage = viewChild.required<TemplateRef<unknown>>('customImage') }
