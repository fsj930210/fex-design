import { inject } from '@angular/core'
import { FormRoot } from './form-root'
import { focusField, scrollToField } from '@fex-design/core/form/field-targets'
import type { FormScrollOptions } from '@fex-design/core/form/types'

/** DOM actions for fields registered inside the current Form. */
export function injectFormActions() {
  const scope = inject(FormRoot)
  return {
    scrollToField: (name: string, options?: FormScrollOptions) =>
      scrollToField(scope.targets, name, options),
    scrollToFirstError: (options?: FormScrollOptions) =>
      scrollToField(scope.targets, undefined, options),
    focusField: (name: string) => focusField(scope.targets, name),
  }
}
