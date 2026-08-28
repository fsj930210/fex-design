import { Kbd, KbdGroup } from '@fex-design/solid/primitive/kbd'
export function DirectionExample() { return <div class="grid w-full grid-cols-2 gap-6">{(['ltr', 'rtl'] as const).map((dir) => <div dir={dir} class="grid gap-3 rounded-lg border p-4"><strong>{dir.toUpperCase()}</strong><KbdGroup><Kbd>Ctrl</Kbd><Kbd>+</Kbd><Kbd>K</Kbd></KbdGroup></div>)}</div> }
