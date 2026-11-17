<script lang="ts">
  import { Button } from "@fex-design/svelte/primitive/button";
  import {
    DialogRoot,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogHeader,
    DialogActions,
    DialogTitle,
    DialogBody,
    DialogFooter,
    DialogClose,
  } from "@fex-design/svelte/primitive/dialog";
  import { dialogMessageClassName } from "@fex-design/components-styles/dialog";
  const ids = ["first", "second"] as const;
  type Id = (typeof ids)[number];
  type Mode = "update" | "destroy" | "destroyAll";
  type Slot = {
    open: boolean;
    title: string;
    content: string;
    updated: boolean;
  };
  const initial = (): Record<Id, Slot> => ({
    first: { open: false, title: "实例 1", content: "", updated: false },
    second: { open: false, title: "实例 2", content: "", updated: false },
  });
  let slots = $state(initial());
  let mode = $state<Mode>("update");
  let feedback = $state("请选择一个操作");
  function show(next: Mode) {
    mode = next;
    const value = initial();
    value.first.open = true;
    value.second.open = next === "destroyAll";
    slots = value;
    feedback = "已打开 " + (next === "destroyAll" ? 2 : 1) + " 个弹窗";
  }
  function update(id: Id, functional = false) {
    const previous = slots[id];
    slots = {
      ...slots,
      [id]: {
        ...previous,
        title: functional ? previous.title + "（函数更新）" : "更新后的标题",
        content: functional
          ? "通过前一次配置更新完成。"
          : "正文和确定按钮已更新。",
        updated: true,
      },
    };
  }
  function destroy(id: Id, all = false) {
    const next = { ...slots };
    for (const key of ids)
      if (all || key === id) next[key] = { ...next[key], open: false };
    slots = next;
    feedback = "剩余弹窗：" + ids.filter((key) => next[key].open).length;
  }
</script>

<div class="flex flex-wrap justify-center gap-2">
  <Button onclick={() => show("update")}>演示 update</Button><Button
    onclick={() => show("destroy")}>演示 destroy</Button
  ><Button onclick={() => show("destroyAll")}
    >演示 destroyAll（两个弹窗）</Button
  >
</div>
<p role="status">{feedback}</p>
{#each ids as id (id)}<DialogRoot
    open={slots[id].open}
    onOpenChange={(value) => {
      if (!value) destroy(id);
    }}
    closeOnEscape={false}
    closeOnOverlayClick={false}
    ><DialogPortal
      ><DialogOverlay /><DialogContent class={dialogMessageClassName}
        ><DialogHeader
          ><DialogTitle>{slots[id].title}</DialogTitle></DialogHeader
        ><DialogActions><DialogClose /></DialogActions><DialogBody
          >{#if slots[id].updated}<p>{slots[id].content}</p>{:else}<div
              class="grid gap-3"
            >
              <p>
                {mode === "update"
                  ? "更新标题、正文和确定按钮。"
                  : mode === "destroy"
                    ? "点击按钮销毁当前实例。"
                    : "当前同时打开两个弹窗，点击按钮全部销毁。"}
              </p>
              <div class="flex flex-wrap gap-2">
                {#if mode === "update"}<Button onclick={() => update(id)}
                    >对象更新</Button
                  ><Button onclick={() => update(id, true)}>函数更新</Button
                  >{/if}<Button
                  onclick={() => destroy(id, mode === "destroyAll")}
                  >{mode === "destroyAll" ? "销毁全部" : "销毁当前"}</Button
                >
              </div>
            </div>{/if}</DialogBody
        ><DialogFooter
          ><Button onclick={() => destroy(id)}>取消</Button><Button
            variant="solid"
            color="primary"
            onclick={() => destroy(id)}
            >{slots[id].updated ? "完成" : "确定"}</Button
          ></DialogFooter
        ></DialogContent
      ></DialogPortal
    ></DialogRoot
  >{/each}
