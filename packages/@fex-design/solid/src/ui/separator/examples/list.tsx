import { Separator } from '@fex-design/solid/primitive/separator'
import { For, Show } from 'solid-js'
export const BasicDemo = () => (
  <div class="grid w-full max-w-xl gap-2">
    <div>
      <div class="font-medium">Fex Design</div>
      <div class="text-sm text-muted-foreground">Composable components for five frameworks.</div>
    </div>
    <Separator />
    <div class="text-sm">React · Vue · Solid · Svelte · Angular</div>
  </div>
)
export const VerticalDemo = () => (
  <div class="flex h-5 items-center gap-2">
    <span>Blog</span>
    <Separator orientation="vertical" />
    <span>Docs</span>
    <Separator orientation="vertical" />
    <span>Source</span>
  </div>
)
export const MenuDemo = () => (
  <div class="grid w-full max-w-sm gap-1.5">
    <div>
      <div class="font-medium">Settings</div>
      <div class="text-sm text-muted-foreground">Manage preferences</div>
    </div>
    <div>
      <div class="font-medium">Account</div>
      <div class="text-sm text-muted-foreground">Profile and security</div>
    </div>
    <Separator />
    <div>
      <div class="font-medium">Sign out</div>
      <div class="text-sm text-muted-foreground">End the current session</div>
    </div>
  </div>
)
const items = [
  ['Workspace', 'Fex Design'],
  ['Plan', 'Team'],
  ['Region', 'Asia Pacific'],
]
export const ListDemo = () => (
  <div class="grid w-full max-w-lg">
    <For each={items}>
      {([label, value], index) => (
        <div>
          <div class="flex justify-between py-2">
            <span>{label}</span>
            <span class="text-muted-foreground">{value}</span>
          </div>
          <Show when={index() < items.length - 1}>
            <Separator />
          </Show>
        </div>
      )}
    </For>
  </div>
)
const Labeled = (props: { label: string; placement: 'start' | 'center' | 'end' }) => (
  <div class="flex items-center gap-2">
    <Separator class={props.placement === 'start' ? 'w-12' : 'flex-1'} />
    <span class="shrink-0 text-sm text-muted-foreground">{props.label}</span>
    <Separator class={props.placement === 'end' ? 'w-12' : 'flex-1'} />
  </div>
)
export const TextDemo = () => (
  <div class="grid w-full max-w-xl gap-4">
    <Labeled label="Start" placement="start" />
    <Labeled label="Center" placement="center" />
    <Labeled label="End" placement="end" />
  </div>
)
export const VariantsDemo = () => (
  <div class="grid w-full max-w-xl gap-3">
    <div class="grid gap-1.5">
      <span class="text-sm">Solid</span>
      <Separator />
    </div>
    <div class="grid gap-1.5">
      <span class="text-sm">Dashed</span>
      <Separator class="h-0 border-t border-dashed bg-transparent" />
    </div>
    <div class="grid gap-1.5">
      <span class="text-sm">Dotted</span>
      <Separator class="h-0 border-t border-dotted bg-transparent" />
    </div>
  </div>
)

export default ListDemo
