import { Directive, inject, TemplateRef } from '@angular/core'
@Directive({ selector: 'ng-template[timePickerSuffix]', standalone: true })
export class TimePickerSuffixTemplate {
  readonly template = inject(TemplateRef<unknown>)
}
