import {
  emptyClassName,
  emptyContentClassName,
  emptyDescriptionClassName,
  emptyHeaderClassName,
  emptyMediaClassName,
  emptyTitleClassName,
} from '@fex-design/styles/empty'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { createHostClassName } from '../../signals/host-class'

@Component({ selector: 'div[empty]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { '[class]': 'hostClassName()', 'data-slot': 'empty' }, template: '<ng-content />' })
export class Empty { protected readonly hostClassName = createHostClassName(emptyClassName) }

@Component({ selector: 'div[emptyHeader]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { '[class]': 'hostClassName()', 'data-slot': 'empty-header' }, template: '<ng-content />' })
export class EmptyHeader { protected readonly hostClassName = createHostClassName(emptyHeaderClassName) }

@Component({ selector: 'div[emptyMedia]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { '[class]': 'hostClassName()', 'data-slot': 'empty-media' }, template: '<ng-content />' })
export class EmptyMedia { protected readonly hostClassName = createHostClassName(emptyMediaClassName) }

@Component({ selector: 'div[emptyTitle]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { '[class]': 'hostClassName()', 'data-slot': 'empty-title' }, template: '<ng-content />' })
export class EmptyTitle { protected readonly hostClassName = createHostClassName(emptyTitleClassName) }

@Component({ selector: 'p[emptyDescription]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { '[class]': 'hostClassName()', 'data-slot': 'empty-description' }, template: '<ng-content />' })
export class EmptyDescription { protected readonly hostClassName = createHostClassName(emptyDescriptionClassName) }

@Component({ selector: 'div[emptyContent]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { '[class]': 'hostClassName()', 'data-slot': 'empty-content' }, template: '<ng-content />' })
export class EmptyContent { protected readonly hostClassName = createHostClassName(emptyContentClassName) }
