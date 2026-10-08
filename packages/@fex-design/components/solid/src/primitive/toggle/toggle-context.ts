import { createContext } from 'solid-js'
import type { ToggleStyleProps } from '@fex-design/components-styles/toggle'

export type GroupContext = {
  disabled: () => boolean
  variant: () => ToggleStyleProps['variant']
  size: () => ToggleStyleProps['size']
  isPressed: (value: string) => boolean
  toggle: (value: string) => void
}

export const ToggleGroupContext = createContext<GroupContext>()
