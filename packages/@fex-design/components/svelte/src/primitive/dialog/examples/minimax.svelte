<script lang="ts">
  import { dialogIconCloseClassName } from "@fex-design/components-styles/dialog";
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
  import MinusIcon from "@fex-design/svelte/icons/minus";
  import SquareIcon from "@fex-design/svelte/icons/square";
  let open = $state(false);
  let rect = $state({ x: 0, y: 0, width: 480, height: 300 });
  let mode = $state<"normal" | "minimized" | "maximized">("normal");
  let bar = $state({ x: 16, y: 16 });
  function minimize() {
    bar = { x: 16, y: Math.max(0, window.innerHeight - 56) };
    mode = "minimized";
  }
  function show() {
    const width = Math.min(480, window.innerWidth - 32);
    const height = Math.min(300, window.innerHeight - 56);
    rect = {
      x: (window.innerWidth - width) / 2,
      y: (window.innerHeight - height) / 2,
      width,
      height,
    };
    mode = "normal";
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
        if (mode === "minimized") {
          bar = point;
          return;
        }
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
      left:
        mode === "maximized"
          ? "0px"
          : mode === "minimized"
            ? bar.x + "px"
            : rect.x + "px",
      top:
        mode === "maximized"
          ? "0px"
          : mode === "minimized"
            ? bar.y + "px"
            : rect.y + "px",
      width:
        mode === "maximized"
          ? window.innerWidth + "px"
          : mode === "minimized"
            ? "280px"
            : rect.width + "px",
      height:
        mode === "maximized"
          ? window.innerHeight + "px"
          : mode === "minimized"
            ? "40px"
            : rect.height + "px",
      overflow: mode === "minimized" ? "visible" : "hidden",
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

<Button onclick={show}>打开最小化与最大化</Button>
<DialogRoot bind:open modal={false}
  ><DialogPortal
    ><DialogContent
      class={"group/minimax " +
        (mode === "minimized"
          ? "[&_[data-slot=dialog-header]]:text-sm [&_[data-slot=dialog-title]]:text-sm [&_[data-slot=dialog-header]]:px-3 [&_[data-slot=dialog-header]]:py-[7px] [&_[data-slot=dialog-header]]:border-b-0 [&_[data-slot=dialog-header]]:rounded-[inherit] [&_[data-slot=dialog-actions]]:top-2 [&_[data-slot=dialog-actions]]:end-2"
          : "")}
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
            use:attach={{
              ...(mode === "minimized" ? bar : rect),
              disabled: mode === "maximized",
            }}
            ondblclick={() => (mode = "normal")}
            class="cursor-move touch-none select-none pe-20 font-semibold leading-6"
          >
            最小化与最大化{#if mode === "minimized"}<button
                type="button"
                aria-label="预览窗口，点击恢复"
                class="absolute bottom-full start-0 z-20 hidden pb-2 group-hover/minimax:block"
                onpointerdown={(event) => event.stopPropagation()}
                onclick={() => (mode = "normal")}
                ><span
                  class="block w-60 overflow-hidden rounded-md border border-border bg-background text-left text-foreground shadow-xl"
                  ><span
                    class="block h-[150px] w-[480px] origin-top-left scale-50"
                    ><span
                      class="block border-b border-border p-4 font-semibold"
                      >最小化与最大化</span
                    ><span class="block h-[180px] p-4 text-sm leading-6"
                      >最小化后工具条仍可拖动，双击工具条或点击恢复按钮还原窗口，保留原位置和尺寸。</span
                    ><span class="block border-t border-border p-4 text-right"
                      ><span
                        class="inline-block rounded-md border border-border px-3 py-1 text-sm"
                        >关闭窗口</span
                      ></span
                    ></span
                  ></span
                ></button
              >{/if}
          </div></DialogTitle
        ></DialogHeader
      ><DialogActions
        >{#if mode !== "minimized"}<Button
            variant="text"
            class={dialogIconCloseClassName}
            aria-label="最小化"
            onclick={minimize}><MinusIcon class="size-4" /></Button
          >{/if}<Button
          variant="text"
          class={dialogIconCloseClassName}
          aria-label={mode === "normal" ? "最大化" : "恢复"}
          onclick={() => (mode = mode === "normal" ? "maximized" : "normal")}
          ><SquareIcon class="size-4" /></Button
        ><DialogClose /></DialogActions
      ><DialogBody class={mode === "minimized" ? "hidden" : "flex-1 min-h-0"}
        ><p>
          最小化后工具条仍可拖动，双击工具条或点击恢复按钮还原窗口，保留原位置和尺寸。
        </p></DialogBody
      ><DialogFooter class={mode === "minimized" ? "hidden" : ""}
        ><Button onclick={() => (open = false)}>关闭窗口</Button></DialogFooter
      ></DialogContent
    ></DialogPortal
  ></DialogRoot
>
