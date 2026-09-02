import { For } from 'solid-js'
import { Card } from '@fex-design/solid/ui/card'

export function DirectionExample() {
  return (
    <div class="grid w-full gap-6 sm:grid-cols-2">
      <For each={['ltr', 'rtl'] as const}>
        {(dir) => (
          <Card
            dir={dir}
            title={dir === 'ltr' ? 'LTR · 中文示例' : 'RTL · مثال عربي'}
            description={
              dir === 'ltr'
                ? '标题与操作按逻辑方向排列。'
                : 'يُرتَّب العنوان والإجراء حسب الاتجاه المنطقي.'
            }
            extra={<button class="rounded-md border px-3 py-1.5 text-sm">{dir === 'ltr' ? '操作' : 'إجراء'}</button>}
            footer={
              <button class="rounded-md bg-primary px-3 py-1.5 text-primary-foreground">
                {dir === 'ltr' ? '保存' : 'حفظ'}
              </button>
            }
          >
            {dir === 'ltr'
              ? '内容区域保持中文阅读顺序。'
              : 'يحافظ المحتوى على ترتيب القراءة العربية.'}
          </Card>
        )}
      </For>
    </div>
  )
}
