import { createContext } from 'react'
import type { ToggleStyleProps } from '@fex-design/components-styles/toggle'

export interface ToggleGroupContextValue {
  disabled: boolean
  variant: ToggleStyleProps['variant']
  size: ToggleStyleProps['size']
  isPressed: (value: string) => boolean
  toggle: (value: string) => void
}

export const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null)
