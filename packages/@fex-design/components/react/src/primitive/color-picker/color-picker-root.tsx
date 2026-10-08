import { createColorPickerController } from '@fex-design/core/color-picker/create-color-picker-controller'
import type { ColorPickerOptions } from '@fex-design/core/color-picker/types'
import { useRef, type ReactNode } from 'react'
import { useCoreStore } from '@fex-design/react/hooks/use-core-store'
import { useLazyRef } from '@fex-design/react/hooks/use-lazy-ref'
import { useIsomorphicLayoutEffect } from '@fex-design/react/hooks/use-isomorphic-layout-effect'
import { ColorPickerContext } from './color-picker-context'

export type ColorPickerRootProps = ColorPickerOptions & { children?: ReactNode }

export function ColorPickerRoot({ children, ...options }: ColorPickerRootProps) {
  const latest = useRef(options)
  Object.assign(latest.current, options)
  const controller = useLazyRef(() => createColorPickerController(latest.current)).current
  const snapshot = useCoreStore(controller)
  useIsomorphicLayoutEffect(() => controller.syncSnapshot())
  return <ColorPickerContext value={{ controller, snapshot }}>{children}</ColorPickerContext>
}
