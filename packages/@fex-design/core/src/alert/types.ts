export const alertTypes = ['success', 'info', 'warning', 'error'] as const
export type AlertType = (typeof alertTypes)[number]

export const alertVariants = ['filled', 'outlined', 'solid'] as const
export type AlertVariant = (typeof alertVariants)[number]

export interface AlertOptions {
  type?: AlertType
  variant?: AlertVariant
}

export type AlertPart =
  | 'root'
  | 'icon'
  | 'content'
  | 'title'
  | 'description'
  | 'action'
  | 'close'

export type AlertClassNames = Partial<Record<AlertPart, string>>
export type AlertStyles<TStyle> = Partial<Record<AlertPart, TStyle>>

export interface AlertUiOptions<TNode, TStyle> extends AlertOptions {
  title?: TNode
  description?: TNode
  showIcon?: boolean
  icon?: TNode
  action?: TNode
  closable?: boolean
  closeIcon?: TNode
  classNames?: AlertClassNames
  styles?: AlertStyles<TStyle>
}
