<script lang="ts">
  import { resizeAction } from "@fex-design/svelte/actions/resize";
  import { Button } from "@fex-design/svelte/ui/button";
  import { Dialog } from "@fex-design/svelte/ui/dialog";
  let open = $state(false);
  let rect = $state({ x: 0, y: 0, width: 480, height: 300 });
  function show() {
    const width = Math.min(480, window.innerWidth - 32);
    const height = Math.min(300, window.innerHeight - 64);
    rect = {
      x: (window.innerWidth - width) / 2,
      y: (window.innerHeight - height) / 2,
      width,
      height,
    };
    open = true;
  }
  function attach(node: HTMLElement, current: typeof rect) {
    const panel = node.closest<HTMLElement>('[data-slot="dialog-content"]')!;
    const options = (value: typeof rect) => ({
      rect: value,
      bounds: "viewport" as const,
      minWidth: 280,
      minHeight: 200,
      applyStyle: false,
      onResize: (next: typeof rect) => {
        rect = next;
      },
    });
    const action = resizeAction(panel, options(current));
    return {
      update(next: typeof rect) {
        action.update(options(next));
      },
      destroy: action.destroy,
    };
  }
  function panelStyle(): Record<string, string> {
    return {
      left: rect.x + "px",
      top: rect.y + "px",
      width: rect.width + "px",
      height: rect.height + "px",
      translate: "none",
      transform: "none",
      transitionProperty: "opacity, scale",
      maxWidth: "none",
      maxHeight: "none",
      display: "flex",
      flexDirection: "column",
    };
  }
</script>

<Button onclick={show}>打开调整弹窗尺寸</Button>
<Dialog
  bind:open
  modal={false}
  overlay={false}
  styles={{ content: panelStyle() }}
  classNames={{ title: "hidden", body: "flex-1 min-h-0", footer: "" }}
  >{#snippet header()}<div
      use:attach={rect}
      class="pe-20 font-semibold leading-6"
    >
      调整弹窗尺寸
    </div>{/snippet}
  <p>拖动四条边或四个角调整尺寸，最小宽度 280px、高度 200px。</p>
  <div
    data-resize-edge="top"
    class="absolute z-10 touch-none select-none left-2 right-2 top-0 h-2 cursor-ns-resize"
    aria-label="top 缩放"
  ></div>
  <div
    data-resize-edge="right"
    class="absolute z-10 touch-none select-none right-0 top-2 bottom-2 w-2 cursor-ew-resize"
    aria-label="right 缩放"
  ></div>
  <div
    data-resize-edge="bottom"
    class="absolute z-10 touch-none select-none left-2 right-2 bottom-0 h-2 cursor-ns-resize"
    aria-label="bottom 缩放"
  ></div>
  <div
    data-resize-edge="left"
    class="absolute z-10 touch-none select-none left-0 top-2 bottom-2 w-2 cursor-ew-resize"
    aria-label="left 缩放"
  ></div>
  <div
    data-resize-edge="top-left"
    class="absolute z-10 touch-none select-none left-0 top-0 size-3 cursor-nwse-resize"
    aria-label="top-left 缩放"
  ></div>
  <div
    data-resize-edge="top-right"
    class="absolute z-10 touch-none select-none right-0 top-0 size-3 cursor-nesw-resize"
    aria-label="top-right 缩放"
  ></div>
  <div
    data-resize-edge="bottom-left"
    class="absolute z-10 touch-none select-none left-0 bottom-0 size-3 cursor-nesw-resize"
    aria-label="bottom-left 缩放"
  ></div>
  <div
    data-resize-edge="bottom-right"
    class="absolute z-10 touch-none select-none right-0 bottom-0 size-3 cursor-nwse-resize"
    aria-label="bottom-right 缩放"
  ></div>
  {#snippet footer()}<Button onclick={() => (open = false)}>关闭窗口</Button
    >{/snippet}</Dialog
>
