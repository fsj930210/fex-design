import type {
  PaginationChangeDetails,
  PaginationLabels,
  PaginationValue,
} from '@fex-design/core/pagination/types'

export const paginationDemoLabels: Partial<PaginationLabels> = {
  navigation: '分页',
  previous: '上一页',
  next: '下一页',
  page: (page) => `第 ${page} 页`,
  pageSize: '每页条数',
  pageSizeOption: (size) => `${size} 条/页`,
  quickJumper: '跳转页码',
  total: (total) => `共 ${total} 条`,
  jumpPrefix: '跳至',
  jumpSuffix: '页',
}

export const paginationDemoClassNames = {
  root: 'rounded-xl border border-violet-200 p-3',
  total: 'font-medium',
  content: 'gap-1',
  pageButton: 'rounded-full',
  navigationButton: 'rounded-full',
  ellipsis: 'text-violet-400',
  simple: 'font-semibold',
  pageSizeSelect: 'min-w-32',
  jumper: 'text-violet-700',
  quickJumper: 'w-24',
}

export const paginationDemoInitialChange = '尚未发生分页变更'
export function formatPaginationDemoChange(
  value: PaginationValue,
  details: PaginationChangeDetails,
) {
  const reasons = {
    page: '页码',
    'page-size': '每页条数',
    prev: '上一页',
    next: '下一页',
    jump: '快捷跳页',
  }
  return `变更：第 ${value.page} 页，每页 ${value.pageSize} 条（${reasons[details.reason]}）`
}
