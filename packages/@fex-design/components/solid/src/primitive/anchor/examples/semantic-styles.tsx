import {
  AnchorIndicator,
  AnchorItem,
  AnchorLink,
  AnchorList,
  AnchorRail,
  AnchorRoot,
} from '@fex-design/solid/primitive/anchor'
import { createSignal } from 'solid-js'
export function AnchorSemanticStylesExample() {
  const [container, setContainer] = createSignal<HTMLDivElement>()
  return (
    <div
      ref={setContainer}
      class="grid h-80 w-full max-w-2xl grid-cols-[14rem_1fr] gap-6 overflow-auto rounded-xl border p-4"
    >
      <AnchorRoot
        container={() => container()!}
        class="sticky top-0 self-start w-full rounded-xl border border-primary/30 bg-muted/20 p-3"
      >
        <AnchorRail class="w-1 bg-primary/15">
          <AnchorIndicator style={{ width: '3px' }} class="bg-success" />
        </AnchorRail>
        <AnchorList class="gap-2 rounded-lg bg-background/70 p-2">
          <AnchorItem
            class="group rounded-lg border border-dashed border-primary/20 p-1"
            value="overview"
            target="#solid-ui-styles-overview"
          >
            <AnchorLink
              style={{ 'min-height': '36px' }}
              class="rounded-md px-3 group-data-[highlighted]:bg-primary/10"
            >
              概览
            </AnchorLink>
          </AnchorItem>
          <AnchorItem
            class="group rounded-lg border border-dashed border-primary/20 p-1"
            value="usage"
            target="#solid-ui-styles-usage"
          >
            <AnchorLink
              style={{ 'min-height': '36px' }}
              class="rounded-md px-3 group-data-[highlighted]:bg-primary/10"
            >
              使用方式
            </AnchorLink>
            <AnchorList class="gap-2 rounded-lg bg-background/70 p-2">
              <AnchorItem
                class="group rounded-lg border border-dashed border-primary/20 p-1"
                value="api"
                target="#solid-ui-styles-api"
              >
                <AnchorLink
                  style={{ 'min-height': '36px' }}
                  class="rounded-md px-3 group-data-[highlighted]:bg-primary/10"
                >
                  API
                </AnchorLink>
              </AnchorItem>
            </AnchorList>
          </AnchorItem>
        </AnchorList>
      </AnchorRoot>
      <div class="grid gap-32 pb-64">
        <section id="solid-ui-styles-overview">概览</section>
        <section id="solid-ui-styles-usage">使用方式</section>
        <section id="solid-ui-styles-api">API</section>
      </div>
    </div>
  )
}
