<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { Button } from '@fex-design/vue/ui/button'
import { Input } from '@fex-design/vue/ui/input'
import { TrashIcon } from '@fex-design/vue/icons/trash'
const props = defineProps<{ busy: boolean; title: string; leaf: boolean; expanded: boolean }>()
const emit = defineEmits<{ toggle: []; save: [title: string]; add: []; remove: [] }>()
const editing = ref(false)
const draft = ref('')
const editor = ref<HTMLElement>()
function edit() {
  draft.value = props.title
  editing.value = true
  void nextTick(() => editor.value?.querySelector('input')?.focus())
}
function save() {
  if (!editing.value) return
  editing.value = false
  if (draft.value.trim() && draft.value.trim() !== props.title) emit('save', draft.value.trim())
}
function keydown(event: KeyboardEvent) {
  event.stopPropagation()
  if (event.key === 'Enter') {
    event.preventDefault()
    save()
  }
  if (event.key === 'Escape') {
    event.preventDefault()
    editing.value = false
  }
}
</script>
<template>
  <div class="flex min-w-0 flex-1 items-center gap-2">
    <button
      v-if="!leaf"
      type="button"
      :disabled="busy"
      class="size-5 shrink-0 rounded hover:bg-muted"
      :aria-label="'展开或收起 ' + title"
      :aria-expanded="expanded"
      @click.stop="emit('toggle')"
    >
      {{ expanded ? '−' : '+' }}
    </button>
    <span v-else class="size-5 shrink-0"></span>
    <div
      v-if="editing"
      ref="editor"
      class="min-w-0 flex-1"
      @click.stop
      @dblclick.stop
      @keydown="keydown"
      @focusout="save"
    >
      <Input v-model="draft" aria-label="节点名称" />
    </div>
    <button
      v-else
      type="button"
      :disabled="busy"
      class="min-w-0 flex-1 truncate text-start"
      @dblclick.stop="edit"
    >
      {{ title }}
    </button>
    <Button
      :disabled="busy"
      size="sm"
      :aria-label="'新增子节点到 ' + title"
      @click.stop="emit('add')"
      >新增子节点</Button
    >
    <Button :disabled="busy" size="sm" :aria-label="'删除 ' + title" @click.stop="emit('remove')"
      ><TrashIcon class="size-4"
    /></Button>
  </div>
</template>
