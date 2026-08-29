<script lang="ts">
  import { onMount, tick } from 'svelte'
  import PrimitiveAvatarGroup from '../../primitive/avatar/avatar-group.svelte'
  import AvatarGroupCount from '../../primitive/avatar/avatar-group-count.svelte'
  import type { Snippet } from 'svelte'
  import type { AvatarGroupClassNames, AvatarGroupStyles } from '@fex-design/core/avatar/types'
  import { cn } from '@fex/utils'
  interface Props { maxCount?: number; class?: string; style?: string; children?: Snippet; renderOverflow?: Snippet<[number]>; classNames?: AvatarGroupClassNames; styles?: AvatarGroupStyles<string> }
  let { maxCount, class: className, style, children, renderOverflow, classNames, styles }: Props = $props()
  let group: HTMLDivElement
  let overflowCount = $state(0)
  const syncOverflow = async () => {
    await tick()
    const avatars = [...group.querySelectorAll<HTMLElement>('[data-slot="avatar"]')]
    const hidden = Math.max(0, avatars.length - (maxCount ?? avatars.length))
    avatars.forEach((avatar, index) => { avatar.hidden = index >= (maxCount ?? avatars.length) })
    overflowCount = hidden
  }
  onMount(() => { void syncOverflow() })
  $effect(() => { maxCount; children; void syncOverflow() })
</script>
<div bind:this={group}>
<PrimitiveAvatarGroup class={cn(className, classNames?.root)} style={[style, styles?.root].filter(Boolean).join(';')}>
  {@render children?.()}
  {#if overflowCount}{#if renderOverflow}{@render renderOverflow(overflowCount)}{:else}<AvatarGroupCount class={classNames?.overflow} style={styles?.overflow}>+{overflowCount}</AvatarGroupCount>{/if}{/if}
</PrimitiveAvatarGroup>
</div>
