<script lang="ts">
  import { onMount, tick } from "svelte";
  import PrimitiveAvatarGroup from '@fex-design/svelte/primitive/avatar/avatar-group.svelte';
  import AvatarGroupCount from '@fex-design/svelte/primitive/avatar/avatar-group-count.svelte';
  import type { Snippet } from "svelte";
  import type {
    AvatarGroupClassNames,
    AvatarGroupStyles,
  } from "@fex-design/core/avatar/types";
  import { cn } from "@fex-design/utils";
  import { splitOverflowItems } from "@fex-design/core/collection/split-overflow-items";
  import type { HTMLAttributes } from "svelte/elements";
  interface Props extends HTMLAttributes<HTMLDivElement> {
    ref?: HTMLDivElement;
    maxCount?: number;
    class?: string;
    style?: string;
    children?: Snippet;
    renderOverflow?: Snippet<[number]>;
    classNames?: AvatarGroupClassNames;
    styles?: AvatarGroupStyles<string>;
  }
  let {
    maxCount,
    class: className,
    style,
    children,
    renderOverflow,
    classNames,
    styles,
    ref = $bindable(),
    ...rest
  }: Props = $props();

  let overflowCount = $state(0);
  const syncOverflow = async () => {
    await tick();
    if (!ref) return;
    const avatars = [
      ...ref.querySelectorAll<HTMLElement>('[data-slot="avatar"]'),
    ];
    const { visibleItems, overflowItems } = splitOverflowItems(avatars, maxCount);
    avatars.forEach((avatar, index) => {
      avatar.hidden = index >= visibleItems.length;
    });
    overflowCount = overflowItems.length;
  };
  onMount(() => {
    void syncOverflow();
    const observer = new MutationObserver(() => void syncOverflow());
    if (ref) observer.observe(ref, { childList: true, subtree: true });
    return () => observer.disconnect();
  });
  $effect(() => {
    maxCount;
    children;
    void syncOverflow();
  });
</script>


  <PrimitiveAvatarGroup
    {...rest}
    bind:ref
    class={cn(className, classNames?.root)}
    style={[style, styles?.root].filter(Boolean).join(";")}
  >
    {@render children?.()}
    {#if overflowCount}{#if renderOverflow}{@render renderOverflow(
          overflowCount,
        )}{:else}<AvatarGroupCount
          class={classNames?.overflow}
          style={styles?.overflow}>+{overflowCount}</AvatarGroupCount
        >{/if}{/if}
  </PrimitiveAvatarGroup>
