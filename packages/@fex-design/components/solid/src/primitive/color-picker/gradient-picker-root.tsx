import { createGradientController } from '@fex-design/core/gradient/create-gradient-controller'
import type { GradientOptions } from '@fex-design/core/gradient/types'
import { type ParentProps } from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import { GradientContext } from './color-picker-context'

export type GradientPickerRootProps = ParentProps<GradientOptions>

export function GradientPickerRoot(props: GradientPickerRootProps) {
  const options = {
    get value() {
      return props.value
    },
    get defaultValue() {
      return props.defaultValue
    },
    get disabled() {
      return props.disabled
    },
    onChange: (v: any, d: any) => props.onChange?.(v, d),
    onChangeComplete: (v: any, d: any) => props.onChangeComplete?.(v, d),
  }
  const controller = createGradientController(options),
    store = createCoreStoreSignal(controller),
    snapshot = () => {
      store()
      return controller.getSnapshot()
    }
  return (
    <GradientContext.Provider value={{ controller, snapshot }}>
      {props.children}
    </GradientContext.Provider>
  )
}
