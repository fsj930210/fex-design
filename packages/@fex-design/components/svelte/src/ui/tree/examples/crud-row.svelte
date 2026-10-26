<script lang="ts">
  import { Button } from "@fex-design/svelte/ui/button";
  import { Input } from "@fex-design/svelte/ui/input";
  import { TrashIcon } from "@fex-design/svelte/icons/trash";
  interface Props {
    busy: boolean;
    title: string;
    leaf: boolean;
    expanded: boolean;
    onToggle(): void;
    onSave(title: string): void;
    onAdd(): void;
    onRemove(): void;
  }
  let {
    busy,
    title,
    leaf,
    expanded,
    onToggle,
    onSave,
    onAdd,
    onRemove,
  }: Props = $props();
  let editing = $state(false);
  let draft = $state("");
  function save() {
    if (!editing) return;
    editing = false;
    if (draft.trim() && draft.trim() !== title) onSave(draft.trim());
  }
  function keydown(event: KeyboardEvent) {
    event.stopPropagation();
    if (event.key === "Enter") {
      event.preventDefault();
      save();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      editing = false;
    }
  }
  function focusEditor(node: HTMLElement) {
    node.querySelector("input")?.focus();
  }
</script>

<div class="flex min-w-0 flex-1 items-center gap-2">
  {#if leaf}<span class="size-5 shrink-0"></span>{:else}<button
      type="button"
      disabled={busy}
      class="size-5 shrink-0 rounded hover:bg-muted"
      aria-label={"展开或收起 " + title}
      aria-expanded={expanded}
      onclick={(event) => {
        event.stopPropagation();
        onToggle();
      }}>{expanded ? "−" : "+"}</button
    >{/if}
  {#if editing}
    <div class="min-w-0 flex-1" use:focusEditor onfocusout={save}>
      <Input
        value={draft}
        onValueChange={(value) => (draft = value)}
        aria-label="节点名称"
        onkeydown={keydown}
        onclick={(event) => event.stopPropagation()}
      />
    </div>
  {:else}
    <button
      type="button"
      disabled={busy}
      class="min-w-0 flex-1 truncate text-start"
      ondblclick={(event) => {
        event.stopPropagation();
        draft = title;
        editing = true;
      }}>{title}</button
    >
  {/if}
  <Button
    disabled={busy}
    size="sm"
    aria-label={"新增子节点到 " + title}
    onclick={(event) => {
      event.stopPropagation();
      onAdd();
    }}>新增子节点</Button
  >
  <Button
    disabled={busy}
    size="sm"
    aria-label={"删除 " + title}
    onclick={(event) => {
      event.stopPropagation();
      onRemove();
    }}><TrashIcon class="size-4" /></Button
  >
</div>
