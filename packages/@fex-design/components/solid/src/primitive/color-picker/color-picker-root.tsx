import { createColorPickerController } from '@fex-design/core/color-picker/create-color-picker-controller'
import type { ColorPickerOptions } from '@fex-design/core/color-picker/types'
import { type ParentProps } from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import { ColorPickerContext } from './color-picker-context'

export type ColorPickerRootProps = ParentProps<ColorPickerOptions>

export function ColorPickerRoot(props: ColorPickerRootProps) {
  const options = {
    get value() {
      return props.value
    },
    get defaultValue() {
      return props.defaultValue
    },
    get format() {
      return props.format
    },
    get defaultFormat() {
      return props.defaultFormat
    },
    get disabled() {
      return props.disabled
    },
    onChange: (v: any, d: any) => props.onChange?.(v, d),
    onChangeComplete: (v: any, d: any) => props.onChangeComplete?.(v, d),
    onFormatChange: (v: any) => props.onFormatChange?.(v),
  }
  const controller = createColorPickerController(options),
    store = createCoreStoreSignal(controller),
    snapshot = () => {
      store()
      return controller.getSnapshot()
    }
  return (
    <ColorPickerContext.Provider value={{ controller, snapshot }}>
      {props.children}
    </ColorPickerContext.Provider>
  )
}
