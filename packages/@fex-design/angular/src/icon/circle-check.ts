import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({ selector: 'circle-check-icon', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'contents' }, templateUrl: './circle-check.html' })
export class CircleCheckIcon {}
