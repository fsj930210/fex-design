import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@fex-design/react/primitive/empty'

export function BasicExample() {
  return <Empty><EmptyHeader><EmptyMedia><svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect width="48" height="48" rx="12" fill="currentColor" opacity="0.1" /><path d="M14 19.5h8l2.5 3H34v10.5a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2V19.5Z" stroke="currentColor" strokeWidth="2" /><path d="M20 28h8" stroke="currentColor" strokeWidth="2" /></svg></EmptyMedia><EmptyTitle>暂无数据</EmptyTitle><EmptyDescription>当前没有可展示的数据。</EmptyDescription></EmptyHeader></Empty>
}
