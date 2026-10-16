import { Directive, inject, TemplateRef } from '@angular/core'
@Directive({ selector: 'ng-template[timePickerPrefix]', standalone: true })
export class TimePickerPrefixTemplate {
  readonly template = inject(TemplateRef<unknown>)
}
