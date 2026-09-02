import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@fex-design/react/primitive/empty'

function SearchIcon() { return <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="21" cy="21" r="10" stroke="currentColor" strokeWidth="2"/><path d="m29 29 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> }
export function ImageExample() {
  return <div className="grid w-full gap-4 md:grid-cols-3"><Empty><EmptyHeader><EmptyMedia><svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect width="48" height="48" rx="12" fill="currentColor" opacity="0.1" /><path d="M14 19.5h8l2.5 3H34v10.5a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2V19.5Z" stroke="currentColor" strokeWidth="2" /></svg></EmptyMedia><EmptyTitle>默认图形</EmptyTitle><EmptyDescription>使用空状态媒体内容。</EmptyDescription></EmptyHeader></Empty><Empty><EmptyHeader><EmptyMedia><SearchIcon /></EmptyMedia><EmptyTitle>自定义图形</EmptyTitle><EmptyDescription>使用自定义媒体内容。</EmptyDescription></EmptyHeader></Empty><Empty><EmptyHeader><EmptyTitle>隐藏图形</EmptyTitle><EmptyDescription>只显示标题和描述。</EmptyDescription></EmptyHeader></Empty></div>
}
