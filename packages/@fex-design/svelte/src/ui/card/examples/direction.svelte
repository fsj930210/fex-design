<script lang="ts">
  import Card from '../card.svelte'

  const directions = ['ltr', 'rtl'] as const
</script>

<div class="grid w-full gap-6 sm:grid-cols-2">
  {#each directions as dir (dir)}
    <Card
      {dir}
      title={dir.toUpperCase()}
      description="Header 与 Footer 按逻辑方向排列。"
      class="w-full"
    >
      {#snippet children()}内容区域保持可读顺序。{/snippet}
      {#snippet extra()}<button class="rounded-md border px-3 py-1.5 text-sm">操作</button>{/snippet}
      {#snippet footer()}<button class="rounded-md bg-primary px-3 py-1.5 text-primary-foreground">保存</button>{/snippet}
    </Card>
  {/each}
</div>
