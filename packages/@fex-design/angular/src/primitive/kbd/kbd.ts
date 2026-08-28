import { ChangeDetectionStrategy, Component } from '@angular/core'
import { kbdClassName, kbdGroupClassName } from '@fex-design/styles/kbd'
import { createHostClassName } from '../../signals/host-class'

@Component({ selector: 'kbd[kbd]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { '[class]': 'hostClassName()', 'data-slot': 'kbd' }, templateUrl: './kbd.html' })
export class Kbd { protected readonly hostClassName = createHostClassName(kbdClassName) }
@Component({ selector: 'div[kbdGroup]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { '[class]': 'hostClassName()', 'data-slot': 'kbd-group' }, templateUrl: './kbd-group.html' })
export class KbdGroup { protected readonly hostClassName = createHostClassName(kbdGroupClassName) }
