import { Card, CardContent, CardDescription, CardExtra, CardFooter, CardHeader, CardTitle } from '../card'

export function DirectionExample() {
  return <div className="grid w-full gap-6 sm:grid-cols-2">{(['ltr', 'rtl'] as const).map((dir) => <Card key={dir} dir={dir} className="w-full"><CardHeader><CardTitle>{dir.toUpperCase()}</CardTitle><CardDescription>Header 与 Footer 按逻辑方向排列。</CardDescription><CardExtra><button className="rounded-md border px-3 py-1.5 text-sm">操作</button></CardExtra></CardHeader><CardContent>内容区域保持可读顺序。</CardContent><CardFooter><button className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground">保存</button></CardFooter></Card>)}</div>
}
