import { SkeletonButton, SkeletonText } from '@fex-design/solid/ui/skeleton'; import { For, Show } from 'solid-js'
export default () => <div class="grid min-w-[32rem] grid-cols-[1.2fr_1fr_6rem] gap-x-6 gap-y-4"><For each={Array.from({length:12})}>{(_,i) => <Show when={i()%3===2} fallback={<SkeletonText class={i()<3?'w-2/3':undefined} />}><SkeletonButton size="sm" class="w-16" /></Show>}</For></div>

