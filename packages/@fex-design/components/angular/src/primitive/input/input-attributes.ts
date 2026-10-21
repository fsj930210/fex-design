import type { Signal } from '@angular/core'
import {
  connectNativeAttributes,
  type NativeAttributes,
} from '@fex-design/angular/directives/native-attributes'

export interface InputAttributes extends NativeAttributes {
  disabled?: boolean
  readOnly?: boolean
}

/** InputControl owns values, interaction flags, class/style and its four primary events. */
export function connectInputAttributes(source: Signal<InputAttributes | undefined>) {
  connectNativeAttributes(source, {
    exclude: ['value', 'defaultValue', 'disabled', 'readOnly', 'readonly'],
    handledEvents: ['onInput', 'onClick', 'onFocus', 'onBlur'],
  })
}
