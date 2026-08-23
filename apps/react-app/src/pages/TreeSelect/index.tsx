import { Link } from 'react-router'
import { AsyncDemos } from './async-demos'
import { BasicDemos } from './basic-demos'
import { SearchDemos } from './search-demos'

export function TreeSelectPage() {
  return (
    <main className="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div className="mx-auto grid w-full max-w-5xl gap-4">
        <header className="space-y-1.5">
          <Link className="text-sm text-muted-foreground hover:text-foreground" to="/">返回首页</Link>
          <h1 className="text-2xl font-semibold">TreeSelect</h1>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">由输入框、弹出层和树组合而成。搜索请求与结果渲染由使用方控制，示例覆盖同步搜索和真实服务端异步搜索。</p>
        </header>
        <div className="grid gap-4"><BasicDemos /><SearchDemos /><AsyncDemos /></div>
      </div>
    </main>
  )
}
