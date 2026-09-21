<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { getContext } from "svelte";
  import { popoverContextKey, type PopoverContext } from "./popover-context";

  type PopoverTriggerProps = Omit<HTMLButtonAttributes, "children"> & {
    children?: Snippet<
      [
        {
          action: (element: HTMLElement) => { destroy: () => void };
          props: HTMLButtonAttributes;
          state: ReturnType<PopoverContext["overlay"]["getSnapshot"]>;
        },
      ]
    >;
  };

  let { children, type = "button", ...rest }: PopoverTriggerProps = $props();
  const { overlay, snapshot, triggerElement } =
    getContext<PopoverContext>(popoverContextKey);

  function eventInfo(event: Event & Partial<PointerEvent>) {
    return {
      target: event.target,
      currentTarget: event.currentTarget,
      clientX: event.clientX,
      clientY: event.clientY,
      button: event.button,
      pointerType: event.pointerType,
      event,
      preventDefault: event.preventDefault.bind(event),
      stopPropagation: event.stopPropagation.bind(event),
    };
  }

  function action(element: HTMLElement) {
    // Svelte action 是 trigger DOM 进入 core floating 的入口。
    // 销毁时必须清空 reference，否则隐藏后旧 trigger 仍可能参与定位。
    triggerElement.current = element;
    overlay.setReferenceElement(element);
    return {
      destroy() {
        if (triggerElement.current === element) {
          triggerElement.current = null;
        }
        overlay.setReferenceElement(null);
      },
    };
  }

  const triggerProps = $derived({
    // triggerProps 必须是 $derived，才能让 aria-expanded/data-state 跟随 $snapshot.open 更新。
    // 如果创建成普通对象，core 已打开但 DOM attribute 仍会停留在初始 closed。
    ...rest,
    type,
    "aria-haspopup": "dialog",
    "aria-expanded": $snapshot.open,
    "data-state": $snapshot.open ? "open" : "closed",
    onclick: (event: MouseEvent) => {
      rest.onclick?.(
        event as MouseEvent & { currentTarget: HTMLButtonElement },
      );
      if (!event.defaultPrevented) overlay.trigger.click(eventInfo(event));
    },
    onpointerenter: (event: PointerEvent) => {
      rest.onpointerenter?.(
        event as PointerEvent & { currentTarget: HTMLButtonElement },
      );
      if (!event.defaultPrevented)
        overlay.trigger.pointerEnter(eventInfo(event));
    },
    onpointerleave: (event: PointerEvent) => {
      rest.onpointerleave?.(
        event as PointerEvent & { currentTarget: HTMLButtonElement },
      );
      if (!event.defaultPrevented)
        overlay.trigger.pointerLeave(eventInfo(event));
    },
    onfocus: (event: FocusEvent) => {
      rest.onfocus?.(
        event as FocusEvent & { currentTarget: HTMLButtonElement },
      );
      if (!event.defaultPrevented) overlay.trigger.focus(eventInfo(event));
    },
    onblur: (event: FocusEvent) => {
      rest.onblur?.(event as FocusEvent & { currentTarget: HTMLButtonElement });
      if (!event.defaultPrevented) overlay.trigger.blur(eventInfo(event));
    },
    oncontextmenu: (event: MouseEvent) => {
      rest.oncontextmenu?.(
        event as PointerEvent & { currentTarget: HTMLButtonElement },
      );
      if (!event.defaultPrevented)
        overlay.trigger.contextMenu(eventInfo(event));
    },
  } satisfies HTMLButtonAttributes);
</script>

{@render children?.({ action, props: triggerProps, state: $snapshot })}
