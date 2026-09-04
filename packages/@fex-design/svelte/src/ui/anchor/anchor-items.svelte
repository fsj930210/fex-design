<script lang="ts">
  import type { AnchorClassNames, AnchorItem as AnchorItemData, AnchorStyles } from '@fex-design/core/anchor/types'; import { AnchorItem, AnchorLink, AnchorList } from '../../primitive/anchor/anchor'
  interface Props { items: readonly AnchorItemData<string>[]; classNames: AnchorClassNames; styles: AnchorStyles<string>; onitemclick?: (event: MouseEvent, item: AnchorItemData<string>) => void }
  let { items, classNames, styles, onitemclick }: Props = $props()
</script>
<AnchorList class={classNames.list} style={styles.list}>{#each items as item (item.key)}<AnchorItem value={item.key} target={item.target} targetOffset={item.targetOffset} class={classNames.item} style={styles.item}><AnchorLink class={classNames.link} style={styles.link} onclick={(event) => onitemclick?.(event, item)}>{item.title}</AnchorLink>{#if item.children?.length}<svelte:self items={item.children} {classNames} {styles} {onitemclick} />{/if}</AnchorItem>{/each}</AnchorList>
