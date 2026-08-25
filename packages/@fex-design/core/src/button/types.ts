/** Button 的视觉类型。 */
export type ButtonVariant =
  | 'solid'
  | 'outlined'
  | 'filled'
  | 'text'
  | 'link'
  | 'dashed'

/** Button 的内置语义色。 */
export type ButtonColor =
  | 'primary'
  | 'danger'
  | 'warning'
  | 'success'
  | 'info'

/** Button 的控件尺寸。 */
export type ButtonSize =
  | 'xs'
  | 'sm'
  | 'default'
  | 'lg'
  | 'xl'
  | 'icon-xs'
  | 'icon-sm'
  | 'icon'
  | 'icon-lg'
  | 'icon-xl'

/** Button 的可选视觉效果。 */
export type ButtonEffect =
  | 'expand-icon'
  | 'ring-hover'
  | 'shine-hover'
  | 'gooey-start'
  | 'gooey-end'
  | 'underline'
  | 'hover-underline'
  | 'press'

export type ButtonIconPlacement = 'start' | 'end'
export type ButtonGroupOrientation = 'horizontal' | 'vertical'

/** 五框架 UI Button 共享的公共属性。 */
export interface ButtonAppearanceOptions {
  /**
   * 按钮视觉类型。
   * @default 'outlined'
   * @example 'outlined'
   */
  variant?: ButtonVariant
  /**
   * 按钮语义色，控制背景、文字、边框与交互反馈。
   * @example 'danger'
   */
  color?: ButtonColor
}

/** 五框架 UI Button 共享的公共属性。 */
export interface ButtonOptions extends ButtonAppearanceOptions {
  /**
   * 按钮尺寸。
   * @default 'default'
   * @example 'lg'
   */
  size?: ButtonSize
  /**
   * 可选视觉效果。
   * @example 'ring-hover'
   */
  effect?: ButtonEffect
  /**
   * 图标或加载图标的位置。
   * @default 'start'
   * @example 'end'
   */
  iconPlacement?: ButtonIconPlacement
  /**
   * 是否显示加载状态；加载时按钮不可点击。
   * @default false
   * @example true
   */
  loading?: boolean
  /**
   * 是否禁用按钮。
   * @default false
   * @example true
   */
  disabled?: boolean
}

/** 五框架 Primitive ButtonGroup 共享的公共属性。 */
export interface ButtonGroupOptions {
  /**
   * 排列方向。
   * @default 'horizontal'
   * @example 'vertical'
   */
  orientation?: ButtonGroupOrientation
  /**
   * 按钮间距；为 0 时使用连接样式。
   * @default 0
   * @example 8
   */
  spacing?: number | string
}
