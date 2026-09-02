import {
  Card,
  CardContent,
  CardDescription,
  CardExtra,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@fex-design/react/primitive/card'

export function DirectionExample() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      {(['ltr', 'rtl'] as const).map((dir) => (
        <Card key={dir} dir={dir} className="w-full">
          <CardHeader>
            <CardTitle>{dir === 'ltr' ? 'LTR · 中文示例' : 'RTL · مثال عربي'}</CardTitle>
            <CardDescription>{dir === 'ltr' ? '标题与操作按逻辑方向排列。' : 'يُرتَّب العنوان والإجراء حسب الاتجاه المنطقي.'}</CardDescription>
            <CardExtra>
              <button className="rounded-md border px-3 py-1.5 text-sm">{dir === 'ltr' ? '操作' : 'إجراء'}</button>
            </CardExtra>
          </CardHeader>
          <CardContent>{dir === 'ltr' ? '内容区域保持中文阅读顺序。' : 'يحافظ المحتوى على ترتيب القراءة العربية.'}</CardContent>
          <CardFooter>
            <button className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground">
              {dir === 'ltr' ? '保存' : 'حفظ'}
            </button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
