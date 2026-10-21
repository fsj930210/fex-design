import { useMenu, type MenuBranch } from '@fex-design/react/primitive/menu'
import { menuCustomItemClass, menuCustomActionClass } from '@fex-design/docs-shared/menu-demo'
import { useLazyRef } from '@fex-design/react/hooks/use-lazy-ref'

export function MenuUseMenuExample() {
  const { controller, dom, snapshot } = useMenu({
    layout: 'inline',
    defaultValue: ['overview'],
    defaultOpenValues: ['workspace'],
  })
  const branch = useLazyRef<MenuBranch>(() => ({
    value: () => 'workspace',
    parent: undefined,
  })).current
  // React 19 callback refs register committed hosts and return their cleanup.
  const hosts = useLazyRef(() => ({
    content: (element: HTMLElement | null) => (element ? dom.bindContent(element) : undefined),
    overview: (element: HTMLElement | null) =>
      element ? dom.bindItem(element, () => ({ value: 'overview' })) : undefined,
    workspace: (element: HTMLElement | null) =>
      element
        ? dom.bindItem(element, () => ({ value: 'workspace' }), undefined, branch)
        : undefined,
    nested: (element: HTMLElement | null) =>
      element ? dom.bindContent(element, branch) : undefined,
    members: (element: HTMLElement | null) =>
      element ? dom.bindItem(element, () => ({ value: 'members' }), branch) : undefined,
    roles: (element: HTMLElement | null) =>
      element ? dom.bindItem(element, () => ({ value: 'roles' }), branch) : undefined,
    billing: (element: HTMLElement | null) =>
      element
        ? dom.bindItem(element, () => ({ value: 'billing', disabled: true }), branch)
        : undefined,
    profile: (element: HTMLElement | null) =>
      element ? dom.bindItem(element, () => ({ value: 'profile' })) : undefined,
  })).current
  function selectRoles() {
    controller.setValue(['roles'])
    controller.setOpen('workspace', true)
  }
  function clear() {
    controller.setValue([])
    controller.closeAll()
  }
  return (
    <div className="grid w-full max-w-lg gap-3">
      <div className="flex flex-wrap gap-2">
        <button type="button" className={menuCustomActionClass} onClick={selectRoles}>
          通过 controller 选择角色并展开
        </button>
        <button type="button" className={menuCustomActionClass} onClick={clear}>
          清空并收起
        </button>
      </div>
      <div
        ref={hosts.content}
        aria-label="手写 Menu"
        className="w-full max-w-xs rounded-xl border border-border bg-background p-2 shadow-sm"
      >
        <p aria-hidden="true" className="px-3 py-2 text-xs font-medium text-muted-foreground">
          自定义工作台
        </p>
        <a ref={hosts.overview} className={menuCustomItemClass} href="#overview">
          概览
        </a>
        <button ref={hosts.workspace} type="button" className={menuCustomItemClass}>
          <span>工作空间</span>
          <span aria-hidden="true">{snapshot.openValues.includes('workspace') ? '−' : '+'}</span>
        </button>
        <div ref={hosts.nested} className="ms-3 border-s border-border ps-2">
          <button ref={hosts.members} type="button" className={menuCustomItemClass}>
            成员
          </button>
          <button ref={hosts.roles} type="button" className={menuCustomItemClass}>
            角色
          </button>
          <button ref={hosts.billing} type="button" className={menuCustomItemClass} disabled>
            账单（禁用）
          </button>
        </div>
        <div role="separator" className="my-2 h-px bg-border"></div>
        <div role="group" aria-label="账户">
          <a ref={hosts.profile} className={menuCustomItemClass} href="#profile">
            个人资料
          </a>
        </div>
      </div>
      <output className="break-all rounded-md bg-muted-background p-3 text-xs">
        选择：{JSON.stringify(snapshot.value)}；展开：{JSON.stringify(snapshot.openValues)}
      </output>
    </div>
  )
}
