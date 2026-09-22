<script lang="ts">
  import { onMount } from "svelte";
  import {
    PREVIEW_PROTOCOL,
    isPreviewHostMessage,
  } from "@fex-design/docs-shared/preview-protocol";
  import type { ApiValue } from "@fex-design/docs-shared/model";

  let values: Record<string, ApiValue> = $state({});
  const query = new URLSearchParams(location.search);
  const path = location.pathname.split("/").filter(Boolean);
  const initialLayer = query.get("layer") ?? path.at(-3) ?? "ui";
  const initialComponent = query.get("component") ?? path.at(-2) ?? "";
  const initialDemo = query.get("demo") ?? path.at(-1) ?? "";
  const embedded = query.get("embed") === "true";

  let currentLayer = $state(initialLayer);
  let currentComponent = $state(initialComponent);
  let currentDemo = $state(initialDemo);
  let Example = $state<any>(undefined);
  let loading = $state(true);

  const modules = import.meta.glob(
    "../../../../packages/@fex-design/components/svelte/src/{primitive,ui}/*/examples/*.svelte",
  ) as Record<string, () => Promise<{ default: any }>>;

  const moduleCache = new Map<string, any>();

  function findLoader(layer: string, component: string, demo: string) {
    const target = `/src/${layer}/${component}/examples/${demo}.svelte`;
    const key = Object.keys(modules).find((k) => k.includes(target));
    return key ? modules[key] : undefined;
  }

  async function loadExample(layer: string, component: string, demo: string) {
    const cacheKey = `${layer}/${component}/${demo}`;
    if (moduleCache.has(cacheKey)) return moduleCache.get(cacheKey);
    const loader = findLoader(layer, component, demo);
    if (!loader) return undefined;
    const mod = await loader();
    if (mod.default) moduleCache.set(cacheKey, mod.default);
    return mod.default;
  }

  const send = (type: string, payload = {}) =>
    parent.postMessage(
      { protocol: PREVIEW_PROTOCOL, type, framework: "svelte", ...payload },
      "*",
    );

  $effect(() => {
    const l = currentLayer;
    const c = currentComponent;
    const d = currentDemo;
    if (!c || !d) {
      loading = false;
      return;
    }
    loading = true;
    let active = true;
    loadExample(l, c, d).then((comp) => {
      if (!active) return;
      Example = comp;
      loading = false;
    });
    return () => {
      active = false;
    };
  });

  onMount(() => {
    const receive = (event: MessageEvent) => {
      if (isPreviewHostMessage(event.data)) {
        if (event.data.theme) applyTheme(event.data.theme);
        if (event.data.props) values = event.data.props;
        if (event.data.component && event.data.demo) {
          currentLayer = event.data.layer ?? "ui";
          currentComponent = event.data.component;
          currentDemo = event.data.demo;
        }
      }
    };
    addEventListener("message", receive);
    const runtime = document.querySelector<HTMLElement>(".runtime")!;
    const sendResize = () =>
      send("resize", { height: Math.ceil(runtime.scrollHeight) });
    const observer = new ResizeObserver(sendResize);
    observer.observe(runtime);
    send("ready");
    sendResize();
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
  {#if loading}
    <div class="box-border grid min-h-30 place-items-center"></div>
  {:else if Example}
    <Example />
  {:else}
    <p>
      未找到示例：{currentLayer}/{currentComponent}/{currentDemo}
    </p>
  {/if}
</div>