/** Switch dimensions. Defaults to md. */
export type SwitchSize = 'sm' | 'md' | 'lg'
/** Rounded rectangle or pill-shaped track and thumb. */
export type SwitchShape = 'rounded' | 'pill'
export type SwitchState = 'checked' | 'unchecked'
export interface SwitchOptions {
  checked?: boolean | undefined
  defaultChecked?: boolean | undefined
  disabled?: boolean | undefined
  loading?: boolean | undefined
  size?: SwitchSize | undefined
  shape?: SwitchShape | undefined
}

export type SwitchPart = 'root' | 'content' | 'thumb'
export type SwitchClassNames = Partial<Record<SwitchPart, string>>
export type SwitchStyles<TStyle> = Partial<Record<SwitchPart, TStyle>>

export interface SwitchUiOptions<TNode, TStyle> extends SwitchOptions {
  checkedContent?: TNode
  uncheckedContent?: TNode
  classNames?: SwitchClassNames
  styles?: SwitchStyles<TStyle>
}
