<script lang="ts">
  import { onDestroy } from "svelte";
  import {
    Dialog,
    type DialogRequestHandle,
  } from "@fex-design/svelte/ui/dialog";
  import { Button } from "@fex-design/svelte/ui/button";
  type Mode = "update" | "destroy" | "destroyAll";
  let mode = $state<Mode>("update");
  let feedback = $state("请选择一个操作");
  let handles: DialogRequestHandle[] = [];
  const active = new Set<DialogRequestHandle>();
  onDestroy(() => {
    for (const handle of active) handle.destroy();
  });
  function update(index: number, functional = false) {
    const handle = handles[index];
    if (!handle) return;
    if (functional)
      handle.update((previous) => ({
        title:
          (typeof previous.title === "string" ? previous.title : "实例") +
          "（函数更新）",
        content: "通过前一次配置更新完成。",
        okBtnProps: { ...previous.okBtnProps, children: doneLabel },
      }));
    else
      handle.update({
        title: "更新后的标题",
        content: "正文和确定按钮已更新。",
        okBtnProps: { children: doneLabel },
      });
  }
  function destroy(index: number) {
    if (mode === "destroyAll") Dialog.destroyAll();
    else handles[index]?.destroy();
  }
  function show(next: Mode) {
    for (const handle of active) handle.destroy();
    active.clear();
    handles = [];
    mode = next;
    const count = mode === "destroyAll" ? 2 : 1;
    for (let index = 0; index < count; index++) {
      const handle = Dialog.confirm({
        title: "实例 " + (index + 1),
        content: index === 0 ? firstContent : secondContent,
      });
      handles.push(handle);
      active.add(handle);
      void handle.result.then(() => {
        active.delete(handle);
        feedback = "剩余弹窗：" + active.size;
      });
    }
    feedback = "已打开 " + count + " 个弹窗";
  }
</script>

{#snippet doneLabel()}完成{/snippet}
{#snippet controls(index: number)}<div class="grid gap-3">
    <p>
      {mode === "update"
        ? "更新标题、正文和确定按钮。"
        : mode === "destroy"
          ? "点击按钮销毁当前实例。"
          : "当前同时打开两个弹窗，点击按钮全部销毁。"}
    </p>
    <div class="flex flex-wrap gap-2">
      {#if mode === "update"}<Button onclick={() => update(index)}
          >对象更新</Button
        ><Button onclick={() => update(index, true)}>函数更新</Button
        >{/if}<Button onclick={() => destroy(index)}
        >{mode === "destroyAll" ? "销毁全部" : "销毁当前"}</Button
      >
    </div>
  </div>{/snippet}
{#snippet firstContent()}{@render controls(0)}{/snippet}
{#snippet secondContent()}{@render controls(1)}{/snippet}
<div class="flex flex-wrap justify-center gap-2">
  <Button onclick={() => show("update")}>演示 update</Button><Button
    onclick={() => show("destroy")}>演示 destroy</Button
  ><Button onclick={() => show("destroyAll")}
    >演示 destroyAll（两个弹窗）</Button
  >
</div>
<p role="status">{feedback}</p>
