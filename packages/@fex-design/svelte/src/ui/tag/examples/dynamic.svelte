<script lang="ts">
  import { Tag } from '@fex-design/svelte/ui/tag'
  let tags = $state([
    { id: 1, label: '设计' },
    { id: 2, label: '开发' },
    { id: 3, label: '测试' },
  ])
  let name = $state('')
  function addTag() {
    const label = name.trim()
    if (!label) return
    tags = [...tags, { id: Date.now(), label }]
    name = ''
  }
  function removeTag(id: number) {
    tags = tags.filter((tag) => tag.id !== id)
  }
</script>

<div class="grid gap-3">
  <div class="flex flex-wrap gap-2">
    {#each tags as tag (tag.id)}
      <Tag color="primary" closable onClose={() => removeTag(tag.id)}>{tag.label}</Tag>
    {/each}
  </div>
  <div class="flex gap-2">
    <input bind:value={name} class="h-8 rounded-md border px-2 text-sm" placeholder="输入标签名称" />
    <button type="button" class="h-8 rounded-md bg-primary px-3 text-sm text-primary-foreground" onclick={addTag}>添加标签</button>
  </div>
</div>
