import { APP_ID, inject, Injectable } from '@angular/core'
@Injectable({ providedIn: 'root' })
class FormIds {
  readonly app = inject(APP_ID)
  sequence = 0
}
// Per-application sequence keeps server requests isolated and hydration creation order stable.
export function createFormId(part: string) {
  const ids = inject(FormIds)
  return `${ids.app}-form-${part}-${++ids.sequence}`
}
