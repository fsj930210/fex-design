import { Empty } from '@fex-design/react/ui/empty'

export function ContentExample() { return <Empty title="暂无项目" description="创建项目后，项目会显示在这里。"><div className="flex flex-wrap justify-center gap-2"><button className="rounded-md bg-primary px-3 py-2 text-primary-foreground">创建项目</button><button className="rounded-md border border-border px-3 py-2">导入项目</button></div></Empty> }
