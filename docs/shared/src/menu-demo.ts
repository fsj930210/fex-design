import type { MenuEntry, MenuEntryContent, MenuLayout } from '@fex-design/core/menu/types'

export const menuCustomItemClass =
  'flex w-full items-center justify-between rounded-lg px-3 py-2 text-start text-sm outline-none hover:bg-muted-background focus-visible:ring-2 focus-visible:ring-focus data-[selected=true]:bg-primary/10 data-[selected=true]:font-medium data-[selected=true]:text-primary data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-40'
export const menuCustomActionClass =
  'rounded-md border border-border bg-background px-3 py-1.5 text-sm hover:bg-muted-background'

export const menuLayouts: readonly MenuLayout[] = ['vertical', 'horizontal', 'inline']
export const menuDemoItems: readonly MenuEntry<string>[] = [
  { value: 'overview', label: 'Overview' },
  {
    value: 'workspace',
    label: 'Workspace',
    children: [
      { value: 'members', label: 'Members' },
      {
        value: 'settings',
        label: 'Settings',
        children: [
          { value: 'general', label: 'General' },
          { value: 'billing', label: 'Billing', disabled: true },
        ],
      },
    ],
  },
  { type: 'separator', key: 'account-separator' },
  {
    type: 'group',
    key: 'account',
    label: 'Account',
    children: [{ value: 'profile', label: 'Profile' }],
  },
]
export const menuControlledItems: readonly MenuEntry<string>[] = [
  { value: 'workspace', label: 'Workspace', children: [{ value: 'members', label: 'Members' }] },
  { value: 'profile', label: 'Profile' },
]
export const menuSelectionItems: readonly MenuEntryContent<string>[] = [
  { value: 'users', label: '用户管理' },
  { value: 'roles', label: '角色管理' },
  { value: 'billing', label: '账单（禁用）', disabled: true },
]
