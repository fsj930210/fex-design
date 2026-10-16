<script lang="ts">
  import { resolveScrollbarOverflow } from '@fex-design/core/scrollbar/create-scrollbar-controller';
  import { cn } from '@fex-design/utils';
  import { ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb, ScrollbarCorner } from '../../primitive/scrollbar';
  import type { ScrollbarProps } from './types';

  let { children, element = $bindable(), viewportElement = $bindable(), viewportProps,
    classNames, styles, overflow, ...rootProps }: ScrollbarProps = $props();
  const axes = ['x', 'y'] as const;
  // Both axis branches and Corner use this shared derived policy.
  const resolved = $derived(resolveScrollbarOverflow(viewportProps?.overflow, overflow));
</script>

<ScrollbarRoot {...rootProps} {overflow} bind:element>
  <ScrollbarViewport {...viewportProps} bind:element={viewportElement}
    class={cn(classNames?.viewport, viewportProps?.class)}
    style={[styles?.viewport, viewportProps?.style].filter(Boolean).join(';')}>
    {@render children?.()}
  </ScrollbarViewport>
  {#each axes as axis (axis)}
    {#if resolved[axis] === 'auto'}
      <ScrollbarBar {axis}
        class={classNames?.[axis === 'x' ? 'barX' : 'barY']}
        style={styles?.[axis === 'x' ? 'barX' : 'barY']}>
        <ScrollbarTrack {axis} class={classNames?.[axis === 'x' ? 'trackX' : 'trackY']} style={styles?.[axis === 'x' ? 'trackX' : 'trackY']}>
          <ScrollbarThumb {axis} class={classNames?.[axis === 'x' ? 'thumbX' : 'thumbY']} style={styles?.[axis === 'x' ? 'thumbX' : 'thumbY']} />
        </ScrollbarTrack>
      </ScrollbarBar>
    {/if}
  {/each}
  {#if resolved.x === 'auto' && resolved.y === 'auto'}
    <ScrollbarCorner class={classNames?.corner} style={styles?.corner} />
  {/if}
</ScrollbarRoot>
