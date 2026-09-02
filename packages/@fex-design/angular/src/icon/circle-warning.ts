import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({ selector: 'circle-warning-icon', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'contents' }, templateUrl: './circle-warning.html' })
export class CircleWarningIcon {}
