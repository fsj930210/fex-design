<script lang="ts">
  import { moveAction } from "@fex-design/svelte/actions/move";
  import { Button } from "@fex-design/svelte/primitive/button";
  import {
    DialogRoot,
    DialogPortal,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogActions,
    DialogClose,
    DialogBody,
    DialogFooter,
  } from "@fex-design/svelte/primitive/dialog";
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
  function attach(
    node: HTMLElement,
    current: { x: number; y: number; disabled?: boolean },
  ) {
    const panel = node.closest<HTMLElement>('[data-slot="dialog-content"]')!;
    const options = (value: typeof current) => ({
      position: { x: value.x, y: value.y },
      disabled: value.disabled,
      handle: node,
      applyStyle: false,
      bounds: "viewport" as const,
      onMove: (point: { x: number; y: number }) => {
        rect = { ...rect, ...point };
      },
    });
    const action = moveAction(panel, options(current));
    return {
      update(next: typeof current) {
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

<Button onclick={show}>打开拖拽弹窗</Button>
<DialogRoot bind:open modal={false}
  ><DialogPortal
    ><DialogContent
      style={Object.entries(panelStyle())
        .map(
          ([key, value]) =>
            key.replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase()) +
            ":" +
            value,
        )
        .join(";")}
      ><DialogHeader
        ><DialogTitle
          ><div
            use:attach={rect}
            class="cursor-move touch-none select-none pe-20 font-semibold leading-6"
          >
            拖拽弹窗
          </div></DialogTitle
        ></DialogHeader
      ><DialogActions><DialogClose /></DialogActions><DialogBody
        class={"flex-1 min-h-0"}
        ><p>按住标题区拖动窗口，窗口保持在展示区域内。</p></DialogBody
      ><DialogFooter class={""}
        ><Button onclick={() => (open = false)}>关闭窗口</Button></DialogFooter
      ></DialogContent
    ></DialogPortal
  ></DialogRoot
>
