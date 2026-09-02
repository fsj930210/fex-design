import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({ selector: 'circle-info-icon', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'contents' }, templateUrl: './circle-info.html' })
export class CircleInfoIcon {}
