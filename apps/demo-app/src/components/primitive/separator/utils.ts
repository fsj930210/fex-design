/** Separator 的排列方向。 */
export type SeparatorOrientation = 'horizontal' | 'vertical'

/** 五框架 Separator 共享的公共属性。 */
export interface SeparatorOptions {
  /** 分隔线方向。 */
  orientation?: SeparatorOrientation
}
