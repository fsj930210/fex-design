import { For } from 'solid-js'
import {
  Card,
  CardContent,
  CardDescription,
  CardExtra,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@fex-design/solid/primitive/card'

export function DirectionExample() {
  return (
    <div class="grid w-full gap-space-xl sm:grid-cols-2">
      <For each={['ltr', 'rtl'] as const}>
        {(dir) => (
          <Card dir={dir} class="w-full">
            <CardHeader>
              <CardTitle>{dir === 'ltr' ? 'LTR · 中文示例' : 'RTL · مثال عربي'}</CardTitle>
              <CardDescription>
                {dir === 'ltr'
                  ? '标题与操作按逻辑方向排列。'
                  : 'يُرتَّب العنوان والإجراء حسب الاتجاه المنطقي.'}
              </CardDescription>
              <CardExtra>
                <button class="rounded-md border px-3 py-1.5 text-sm">
                  {dir === 'ltr' ? '操作' : 'إجراء'}
                </button>
              </CardExtra>
            </CardHeader>
            <CardContent>
              {dir === 'ltr'
                ? '内容区域保持中文阅读顺序。'
                : 'يحافظ المحتوى على ترتيب القراءة العربية.'}
            </CardContent>
            <CardFooter>
              <button class="rounded-md bg-primary px-3 py-1.5 text-primary-foreground">
                {dir === 'ltr' ? '保存' : 'حفظ'}
              </button>
            </CardFooter>
          </Card>
        )}
      </For>
    </div>
  )
}
