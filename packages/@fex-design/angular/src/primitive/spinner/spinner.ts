import { spinnerClassName, spinnerContainerClassName, spinnerTextClassName } from '@fex-design/styles/spinner'
import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, input, type TemplateRef } from '@angular/core'
import { createHostClassName } from '../../signals/host-class'
import { LoadingIcon } from '../../icon/loading'
import type { SpinnerSize } from '@fex-design/core/spinner/types'
@Component({ selector: 'span[spinnerContainer]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { '[class]': 'hostClassName()', 'data-slot': 'spinner-container' }, template: '<ng-content />' })
export class SpinnerContainer { protected readonly hostClassName = createHostClassName(spinnerContainerClassName) }
@Component({ selector: 'span[spinner]', standalone: true, imports: [LoadingIcon, NgTemplateOutlet], changeDetection: ChangeDetectionStrategy.OnPush, host: { '[class]': 'hostClassName()', 'data-slot': 'spinner', role: 'status' }, template: '@if (indicator()) { <ng-container *ngTemplateOutlet="indicator()!" /> } @else { <fex-loading-icon /> }' })
export class Spinner { readonly size = input<SpinnerSize>('md'); readonly indicator = input<TemplateRef<unknown> | undefined>(); protected readonly hostClassName = createHostClassName(() => spinnerClassName({ size: this.size() })) }
@Component({ selector: 'span[spinnerText]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { '[class]': 'hostClassName()', 'data-slot': 'spinner-text' }, template: '<ng-content />' })
export class SpinnerText { protected readonly hostClassName = createHostClassName(spinnerTextClassName) }
