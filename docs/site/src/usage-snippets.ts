import { usageSnippetsPart1, type UsageItem, type ComponentUsage } from './usage-snippets-part1'
import { usageSnippetsPart2 } from './usage-snippets-part2'

export type { UsageItem, ComponentUsage }

export const usageSnippets: Record<string, ComponentUsage> = {
  ...usageSnippetsPart1,
  ...usageSnippetsPart2,
  tree: {
    ui: {
      import: "import { Tree } from '@/components/ui/tree'",
      code: `<Tree
  treeData={[
    {
      key: 'department',
      title: '部门',
      children: [{ key: 'team', title: '团队' }],
    },
  ]}
  defaultExpandedKeys={['department']}
/>`,
    },
    primitive: {
      import:
        "import { TreeRoot, TreeViewport, TreeItem, TreeTrigger, TreeTitle, expansionFeature } from '@/components/primitive/tree'",
      code: `<TreeRoot
  options={{
    treeData: [
      {
        key: 'department',
        title: '部门',
        children: [{ key: 'team', title: '团队' }],
      },
    ],
    features: [expansionFeature()],
  }}
>
  <TreeViewport>
    {(item) => (
      <TreeItem key={item.key} itemKey={item.key}>
        {(state) => (
          <div {...state.itemProps}>
            <TreeTrigger itemKey={item.key} />
            <TreeTitle>{String(item.node.title)}</TreeTitle>
          </div>
        )}
      </TreeItem>
    )}
  </TreeViewport>
</TreeRoot>`,
    },
  },
  menu: {
    ui: {
      import:
        "import { Menu, MenuItem, SubMenu, SubMenuTrigger, SubMenuContent } from '@/components/ui/menu'",
      code: `<Menu>
  <MenuItem value="overview">概览</MenuItem>
  <SubMenu value="system">
    <SubMenuTrigger>系统管理</SubMenuTrigger>
    <SubMenuContent>
      <MenuItem value="users">用户管理</MenuItem>
    </SubMenuContent>
  </SubMenu>
</Menu>`,
    },
    primitive: {
      import: "import { MenuRoot, MenuContent, MenuItem } from '@/components/primitive/menu'",
      code: `<MenuRoot>
  <MenuContent>
    <MenuItem value="overview">概览</MenuItem>
    <MenuItem value="users">用户管理</MenuItem>
  </MenuContent>
</MenuRoot>`,
    },
  },
  calendar: {
    ui: {
      import:
        "import { Calendar } from '@/components/ui/calendar'\nimport { createCalendarDate } from '@fex-design/core/calendar'",
      code: '<Calendar defaultViewDate={createCalendarDate(2026, 10, 8)} />',
    },
    primitive: {
      import:
        "import { CalendarRoot, CalendarHeader, CalendarNavigationButton, CalendarWeekHeader, CalendarGrid, CalendarFooter } from '@/components/primitive/calendar'\nimport { createCalendarDate } from '@fex-design/core/calendar'",
      code: `<CalendarRoot defaultViewDate={createCalendarDate(2026, 10, 8)}>
  <CalendarHeader>
    <CalendarNavigationButton action="previous-panel">上一页</CalendarNavigationButton>
    <CalendarNavigationButton action="next-panel">下一页</CalendarNavigationButton>
  </CalendarHeader>
  <CalendarWeekHeader />
  <CalendarGrid />
  <CalendarFooter>自定义底部</CalendarFooter>
</CalendarRoot>`,
    },
  },
}
