/** Empty 可被 classNames 与 styles 定位的稳定区域。 */
export type EmptyPart = 'root' | 'header' | 'image' | 'title' | 'description' | 'content'

/** Empty 各语义区域的 class 配置。 */
export type EmptyClassNames = Partial<Record<EmptyPart, string>>

/** Empty 各语义区域的样式配置；样式值由各框架的原生类型决定。 */
export type EmptyStyles<TStyle> = Partial<Record<EmptyPart, TStyle>>

/** 五框架 UI Empty 共享的快捷内容与区域样式契约。 */
export interface EmptyOptions<TNode, TStyle> {
  image?: string | TNode | null
  title?: TNode
  description?: TNode
  classNames?: EmptyClassNames
  styles?: EmptyStyles<TStyle>
}
