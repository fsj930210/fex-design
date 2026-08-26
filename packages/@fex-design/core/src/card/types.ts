/** Card 可被 classNames 与 styles 定位的稳定区域。 */
export type CardPart =
  | 'root'
  | 'header'
  | 'title'
  | 'description'
  | 'extra'
  | 'content'
  | 'footer'

/** Card 各语义区域的 class 配置。 */
export type CardClassNames = Partial<Record<CardPart, string>>

/** Card 各语义区域的样式配置；样式值由各框架的原生类型决定。 */
export type CardStyles<TStyle> = Partial<Record<CardPart, TStyle>>

/** 五框架 UI Card 共享的结构化内容与区域样式契约。 */
export interface CardOptions<TNode, TStyle> {
  title?: TNode
  description?: TNode
  extra?: TNode
  header?: TNode
  footer?: TNode
  classNames?: CardClassNames
  styles?: CardStyles<TStyle>
}
