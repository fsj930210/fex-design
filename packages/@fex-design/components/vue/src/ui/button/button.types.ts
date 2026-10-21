import type ButtonIcon from '../../primitive/button/button-icon.vue'
import type { LoadingIcon } from '../../icons/loading'
import type { ButtonOptions } from '@fex-design/core/button/types'
import type { ButtonHTMLAttributes, HTMLAttributes, SVGAttributes } from 'vue'

export interface ButtonProps extends ButtonOptions {
  startIconProps?:
    | Omit<
        InstanceType<typeof ButtonIcon>['$props'] & HTMLAttributes,
        'children' | 'placement' | 'data-icon'
      >
    | undefined
  endIconProps?:
    | Omit<
        InstanceType<typeof ButtonIcon>['$props'] & HTMLAttributes,
        'children' | 'placement' | 'data-icon'
      >
    | undefined
  loadingIconProps?:
    | Omit<InstanceType<typeof LoadingIcon>['$props'] & SVGAttributes, 'children' | 'aria-hidden'>
    | undefined
  type?: ButtonHTMLAttributes['type']
}
