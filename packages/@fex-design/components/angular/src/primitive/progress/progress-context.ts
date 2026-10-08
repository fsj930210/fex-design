import { InjectionToken, type Signal } from '@angular/core'
import type { normalizeProgressValue } from '@fex-design/core/progress/progress'
import type { ProgressStatus, ProgressVariant } from '@fex-design/core/progress/types'

export interface ProgressContext {
  normalized: Signal<ReturnType<typeof normalizeProgressValue>>
  status: Signal<ProgressStatus>
  variant: Signal<ProgressVariant>
  size: Signal<number>
  thickness: Signal<number>
}

export const progressContext = new InjectionToken<ProgressContext>('progress-context')
