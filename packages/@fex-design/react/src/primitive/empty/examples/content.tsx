import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@fex-design/react/primitive/empty'

export function ContentExample() {
  return <Empty><EmptyHeader><EmptyMedia><svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect width="48" height="48" rx="12" fill="currentColor" opacity="0.1" /><path d="M14 19.5h8l2.5 3H34v10.5a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2V19.5Z" stroke="currentColor" strokeWidth="2" /><path d="M20 28h8" stroke="currentColor" strokeWidth="2" /></svg></EmptyMedia><EmptyTitle>暂无项目</EmptyTitle><EmptyDescription>创建项目后，项目会显示在这里。</EmptyDescription></EmptyHeader><EmptyContent><div className="flex flex-wrap justify-center gap-2"><button className="rounded-md bg-primary px-3 py-2 text-primary-foreground">创建项目</button><button className="rounded-md border border-border px-3 py-2">导入项目</button></div></EmptyContent></Empty>
}
