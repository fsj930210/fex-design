import { createGradientController } from '@fex-design/core/gradient/create-gradient-controller'
import type { GradientOptions } from '@fex-design/core/gradient/types'
import { useRef, type ReactNode } from 'react'
import { useCoreStore } from '@fex-design/react/hooks/use-core-store'
import { useLazyRef } from '@fex-design/react/hooks/use-lazy-ref'
import { useIsomorphicLayoutEffect } from '@fex-design/react/hooks/use-isomorphic-layout-effect'
import { GradientPickerContext } from './color-picker-context'

export type GradientPickerRootProps = GradientOptions & { children?: ReactNode }

export function GradientPickerRoot({
  children,
  ...options
}: GradientPickerRootProps) {
  const latest = useRef(options)
  Object.assign(latest.current, options)
  const controller = useLazyRef(() => createGradientController(latest.current)).current
  const snapshot = useCoreStore(controller)
  useIsomorphicLayoutEffect(() => controller.syncSnapshot())
  return <GradientPickerContext value={{ controller, snapshot }}>{children}</GradientPickerContext>
}
