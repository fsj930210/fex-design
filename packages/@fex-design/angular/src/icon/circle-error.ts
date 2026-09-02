import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({ selector: 'circle-error-icon', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'contents' }, templateUrl: './circle-error.html' })
export class CircleErrorIcon {}
