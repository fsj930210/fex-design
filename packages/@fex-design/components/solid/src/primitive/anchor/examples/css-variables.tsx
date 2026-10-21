import {
  AnchorIndicator,
  AnchorItem,
  AnchorLink,
  AnchorList,
  AnchorRail,
  AnchorRoot,
} from '@fex-design/solid/primitive/anchor'
import { createSignal } from 'solid-js'
export function AnchorCssVariablesExample() {
  const [container, setContainer] = createSignal<HTMLDivElement>()
  return (
    <div
      ref={setContainer}
      class="grid h-80 w-full max-w-2xl grid-cols-[14rem_1fr] gap-6 overflow-auto rounded-xl border p-4"
    >
      <AnchorRoot
        container={() => container()!}
        class="sticky top-0 self-start [--anchor-indent:20px] [--primary:#7c3aed]"
      >
        <AnchorRail class="[--anchor-indent:20px] [--primary:#7c3aed]">
          <AnchorIndicator class="[--anchor-indent:20px] [--primary:#7c3aed]" />
        </AnchorRail>
        <AnchorList class="[--anchor-indent:20px] [--primary:#7c3aed]">
          <AnchorItem
            class="[--anchor-indent:20px] [--primary:#7c3aed]"
            value="overview"
            target="#solid-styles-overview"
          >
            <AnchorLink class="[--anchor-indent:20px] [--primary:#7c3aed]">概览</AnchorLink>
          </AnchorItem>
          <AnchorItem
            class="[--anchor-indent:20px] [--primary:#7c3aed]"
            value="usage"
            target="#solid-styles-usage"
          >
            <AnchorLink class="[--anchor-indent:20px] [--primary:#7c3aed]">使用方式</AnchorLink>
            <AnchorList class="[--anchor-indent:20px] [--primary:#7c3aed]">
              <AnchorItem
                class="[--anchor-indent:20px] [--primary:#7c3aed]"
                value="api"
                target="#solid-styles-api"
              >
                <AnchorLink class="[--anchor-indent:20px] [--primary:#7c3aed]">API</AnchorLink>
              </AnchorItem>
            </AnchorList>
          </AnchorItem>
        </AnchorList>
      </AnchorRoot>
      <div class="grid gap-32 pb-64">
        <section id="solid-styles-overview">
          <h3 class="font-semibold">概览</h3>
          <p class="text-muted-foreground">Anchor 根据滚动位置同步当前章节。</p>
        </section>
        <section id="solid-styles-usage">
          <h3 class="font-semibold">使用方式</h3>
          <p class="text-muted-foreground">点击项目滚动到对应内容。</p>
        </section>
        <section id="solid-styles-api">
          <h3 class="font-semibold">API</h3>
          <p class="text-muted-foreground">通过结构化组件自由组合。</p>
        </section>
      </div>
    </div>
  )
}
