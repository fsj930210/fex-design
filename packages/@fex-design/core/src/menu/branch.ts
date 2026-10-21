import { createStore } from '../store/create-store'
import type { MenuBranch, MenuBranchSnapshot, MenuDomBinding } from './dom-types'
import type { MenuPopoverProps } from './types'

export function getMenuBranchStore(branch: MenuBranch) {
  return (branch.presence ??= createStore<MenuBranchSnapshot>({
    mounted: branch.popoverProps?.()?.lazyMount === false,
    open: false,
    phase: 'closed',
    container: null,
  }))
}

export function createMenuBranch(
  source: () => { value: string; popoverProps?: MenuPopoverProps | undefined },
  parent?: MenuBranch,
) {
  const branch: MenuBranch = {
    value: () => source().value,
    popoverProps: () => source().popoverProps,
    parent,
  }
  getMenuBranchStore(branch)
  return branch
}

export function resolveMenuPopupContainer(
  binding: MenuDomBinding,
  branch: MenuBranch,
  explicit?: HTMLElement | null,
) {
  const reference =
    [...binding.items.values()].find((item) => item.branch === branch)?.element ?? null
  return (
    explicit ??
    branch.popoverProps?.()?.getPopupContainer?.(reference) ??
    reference?.ownerDocument.body ??
    (typeof document === 'undefined' ? null : document.body)
  )
}
