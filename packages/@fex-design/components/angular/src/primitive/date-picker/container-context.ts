import { InjectionToken, type Signal, type TemplateRef } from '@angular/core'
import type { Popover } from '../popover'

export const PickerContainerToken = new InjectionToken<{
  containerTemplate: Signal<TemplateRef<unknown> | undefined>
  popover: Popover
}>('PickerContainer')
