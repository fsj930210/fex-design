import type { PopoverController } from '../popover/create-popover'
import type { MenuController, MenuNode } from './types'
import type { MenuPopoverProps } from './types'
import type { PopoverOptions } from '../popover/types'
import type { OverlayPhase } from '../overlay/types'
import type { Store } from '../store/create-store'

export interface MenuBranchSnapshot {
  mounted: boolean
  open: boolean
  phase: OverlayPhase
  container: HTMLElement | null
  popoverProps?: MenuPopoverProps | undefined
}

export interface MenuItemSource {
  value: string
  disabled?: boolean | undefined
  textValue?: string | undefined
}
export interface MenuBranch {
  value(): string
  parent: MenuBranch | undefined
  popoverProps?: (() => MenuPopoverProps | undefined) | undefined
  presence?: Store<MenuBranchSnapshot> | undefined
}
export interface MenuContentOptions {
  container?: HTMLElement | null | undefined
  managedPortal?: boolean | undefined
}
export interface MenuDomItem {
  element: HTMLElement
  source(): MenuItemSource
  parent: MenuBranch | undefined
  branch: MenuBranch | undefined
  node: MenuNode
  unregister(): void
}
export interface MenuDomContent {
  element: HTMLElement
  branch: MenuBranch | undefined
  options(): MenuContentOptions
  overlay: PopoverController | undefined
  configuration?: PopoverOptions | undefined
  reference?: HTMLElement | null | undefined
  stopOverlay?: (() => void) | undefined
  restore(): void
  stop(): void
}
export interface MenuDomBinding {
  controller: MenuController
  items: Map<HTMLElement, MenuDomItem>
  contents: Set<MenuDomContent>
  refresh(): void
  bindItem(
    element: HTMLElement,
    source: () => MenuItemSource,
    parent?: MenuBranch,
    branch?: MenuBranch,
  ): () => void
  bindContent(
    element: HTMLElement,
    branch?: MenuBranch,
    options?: () => MenuContentOptions,
  ): () => void
  destroy(): void
}
