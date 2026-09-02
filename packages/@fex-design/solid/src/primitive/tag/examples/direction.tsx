import { For } from 'solid-js'
import { Tag, TagClose } from '@fex-design/solid/primitive/tag'

export function DirectionExample() {
  return (
    <div class="grid w-full gap-6 sm:grid-cols-2">
      <For each={['ltr', 'rtl'] as const}>
        {(direction) => (
          <section dir={direction} class="grid gap-3 rounded-lg border p-4">
<strong>{direction === 'ltr' ? 'LTR · 中文示例' : 'RTL · مثال عربي'}</strong>
            <div class="flex flex-wrap gap-2">
              <Tag color="info">{direction === 'ltr' ? '状态标签' : 'علامة الحالة'}</Tag>
              <Tag color="primary">
                {direction === 'ltr' ? '可关闭标签' : 'وسم قابل للإغلاق'}
                <TagClose aria-label={`删除${direction.toUpperCase()}标签`} />
              </Tag>
            </div>
          </section>
        )}
      </For>
    </div>
  )
}
