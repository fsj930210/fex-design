import type { SnapshotStore } from '../store/create-store'
import type { PopoverOptions, PopoverClassNames } from '../popover/types'

export type MenuSemanticPart =
  | 'root'
  | 'item'
  | 'subMenuTrigger'
  | 'subMenuContent'
  | 'group'
  | 'separator'
export type MenuClassNames = Partial<Record<MenuSemanticPart, string>>

/** Menu owns disclosure and trigger policy; callers customize only popup presentation. */
export type MenuPopoverProps<TStyle = unknown> = Pick<
  PopoverOptions,
  | 'placement'
  | 'side'
  | 'align'
  | 'sideOffset'
  | 'alignOffset'
  | 'strategy'
  | 'avoidCollisions'
  | 'collisionBoundary'
  | 'collisionPadding'
  | 'matchReferenceWidth'
  | 'hideWhenDetached'
  | 'zIndex'
  | 'getPopupContainer'
  | 'lazyMount'
  | 'destroyOnHidden'
> & {
  classNames?: Pick<PopoverClassNames, 'root' | 'content'> | undefined
  styles?: Partial<Record<'root' | 'content', TStyle>> | undefined
}

export interface MenuEntryContent<T> {
  value: string
  label: T
  icon?: T | undefined
  suffix?: T | undefined
  disabled?: boolean | undefined
  textValue?: string | undefined
}
export type MenuEntry<T = string, TStyle = unknown> =
  | (MenuEntryContent<T> & {
      type?: 'item'
      children?: never
      href?: string | undefined
      target?: string | undefined
      rel?: string | undefined
    })
  | (MenuEntryContent<T> & {
      type?: 'submenu'
      children: readonly MenuEntry<T, TStyle>[]
      popoverProps?: MenuPopoverProps<TStyle> | undefined
    })
  | { type: 'group'; key: string; label: T; children: readonly MenuEntry<T, TStyle>[] }
  | { type: 'separator'; key: string }

export type MenuLayout = 'vertical' | 'horizontal' | 'inline'
export type MenuChangeReason = 'click' | 'keyboard' | 'hover' | 'outside' | 'activate'
export interface MenuChangeInfo {
  value: string | undefined
  reason: MenuChangeReason
  event?: Event | undefined
}
export interface MenuActivateInfo extends MenuChangeInfo {
  value: string
  readonly defaultPrevented: boolean
  preventDefault(): void
}
export interface MenuOptions {
  layout?: MenuLayout | undefined
  dir?: 'ltr' | 'rtl' | undefined
  size?: 'sm' | 'md' | 'lg' | undefined
  disabled?: boolean | undefined
  multiple?: boolean | undefined
  value?: readonly string[] | undefined
  defaultValue?: readonly string[] | undefined
  openValues?: readonly string[] | undefined
  defaultOpenValues?: readonly string[] | undefined
  inlineAccordion?: boolean | undefined
  submenuTrigger?: 'click' | 'hover' | undefined
  openDelay?: number | undefined
  closeDelay?: number | undefined
  onValueChange?: ((value: string[], info: MenuChangeInfo) => void) | undefined
  onOpenChange?: ((value: string[], info: MenuChangeInfo) => void) | undefined
  onActivate?: ((info: MenuActivateInfo) => void) | undefined
}
export interface MenuSnapshot {
  layout: MenuLayout
  dir: 'ltr' | 'rtl'
  size: 'sm' | 'md' | 'lg'
  disabled: boolean
  multiple: boolean
  value: readonly string[]
  openValues: readonly string[]
  inlineAccordion: boolean
  submenuTrigger: 'click' | 'hover'
  openDelay: number
  closeDelay: number
}
export interface MenuNode {
  value: string
  parent: string | undefined
  branch: boolean
  disabled: boolean
}
export interface MenuController extends SnapshotStore<MenuSnapshot> {
  setOptions(options: MenuOptions): void
  registerNode(node: MenuNode): () => void
  getNode(value: string): MenuNode | undefined
  setValue(value: readonly string[], info?: MenuChangeInfo): void
  setOpen(value: string, open: boolean, info?: MenuChangeInfo): void
  closeAll(info?: MenuChangeInfo): void
  activate(value: string, event?: Event): boolean
}
