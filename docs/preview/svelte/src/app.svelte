<script lang="ts">
  import { onMount, tick } from "svelte";
  import {
    PREVIEW_PROTOCOL,
    isPreviewHostMessage,
  } from "@fex-design/docs-shared/preview-protocol";
  import type { ApiValue } from "@fex-design/docs-shared/model";
  let values: Record<string, ApiValue> = $state({});
  const query = new URLSearchParams(location.search);
  const path = location.pathname.split("/").filter(Boolean),
    layer = query.get("layer") ?? path.at(-3),
    component = query.get("component") ?? path.at(-2),
    demo = query.get("demo") ?? path.at(-1);
  const embedded = query.get("embed") === "true";
  // Keep loaders lazy: one Preview URL must only fetch its selected example graph.
  const modules = import.meta.glob(
    "../../../../packages/@fex-design/svelte/src/{primitive,ui}/*/examples/*.svelte",
    { eager: false },
  ) as Record<string, () => Promise<{ default: any }>>;
  const examplePath = Object.keys(modules).find((key) =>
    key.includes(`/${layer}/${component}/examples/${demo}.svelte`),
  );
  let Example: any = $state(undefined);
  let loaded = $state(false);
  const send = (type: string, payload = {}) =>
    parent.postMessage(
      { protocol: PREVIEW_PROTOCOL, type, framework: "svelte", ...payload },
      "*",
    );
  onMount(() => {
    const receive = (event: MessageEvent) => {
      if (isPreviewHostMessage(event.data)) values = event.data.props;
    };
    addEventListener("message", receive);
    const runtime = document.querySelector<HTMLElement>(".runtime")!;
    const sendResize = () =>
      send("resize", { height: Math.ceil(runtime.scrollHeight) });
    const observer = new ResizeObserver(sendResize);
    observer.observe(runtime);
    const load = async () => {
      const module = examplePath ? await modules[examplePath]?.() : undefined;
      Example = module?.default;
      loaded = true;
      await tick();
      send("ready");
      sendResize();
    };
    void load();
    return () => {
      removeEventListener("message", receive);
      observer.disconnect();
    };
  });
</script>

<div
  class="runtime box-border grid min-h-30 place-items-center p-8"
  data-embed={embedded ? "true" : undefined}
>
  {#if Example}<Example />{:else if loaded}<p>
      未找到示例：{layer}/{component}/{demo}
    </p>{/if}
</div>
