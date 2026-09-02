import { Empty } from '@fex-design/react/ui/empty'

function SearchIcon() { return <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="21" cy="21" r="10" stroke="currentColor" strokeWidth="2"/><path d="m29 29 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> }
export function ImageExample() { return <div className="grid w-full gap-4 md:grid-cols-3"><Empty title="默认图标" description="使用内置空状态图标。" /><Empty image={<SearchIcon />} title="自定义图标" description="使用自定义媒体内容。" /><Empty image={null} title="隐藏图标" description="只显示标题和描述。" /></div> }
