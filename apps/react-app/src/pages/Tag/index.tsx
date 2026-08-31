import { Link } from 'react-router'
import { BasicDemo } from './basic-demo'
import { ClosableDemo } from './closable-demo'
import { ColorDemo } from './color-demo'

export function TagPage() {
  return (
    <main className="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <header className="space-y-2">
          <Link className="text-sm text-muted-foreground hover:text-foreground" to="/">
            Back home
          </Link>
          <h1 className="text-2xl font-semibold text-foreground">Tag</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            独立展示分类、属性、状态和多选值的轻量信息块。
          </p>
        </header>
        <div className="grid gap-4">
          <BasicDemo />
          <ColorDemo />
          <ClosableDemo />
        </div>
      </div>
    </main>
  )
}
