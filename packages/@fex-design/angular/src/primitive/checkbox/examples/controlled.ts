import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Button } from '@fex-design/angular/primitive/button'
import { CheckboxRoot, CheckboxControl, CheckboxIndicator, CheckboxLabel } from '@fex-design/angular/primitive/checkbox'
@Component({ selector: 'checkbox-primitive-controlled-example', standalone: true, imports: [Button, CheckboxRoot, CheckboxControl, CheckboxIndicator, CheckboxLabel], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './controlled.html' })
export class CheckboxPrimitiveControlledExample { protected readonly checked = signal(true); protected change(event: Event) { this.checked.set((event.target as HTMLInputElement).checked) } }
