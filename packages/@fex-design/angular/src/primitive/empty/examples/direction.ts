import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@fex-design/angular/primitive/empty'

@Component({ selector: 'empty-primitive-direction-example', standalone: true, imports: [Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './direction.html' })
export class DirectionExample {}
