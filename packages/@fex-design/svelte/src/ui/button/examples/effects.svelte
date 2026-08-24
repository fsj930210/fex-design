<script lang="ts">
  import PlusIcon from '@fex-design/svelte/icon/plus'
  import { Button } from '@fex-design/svelte/ui/button'
  const effects = ["expand-icon","ring-hover","shine-hover","gooey-start","gooey-end","underline","hover-underline","press"] as const
</script>

<div class="flex flex-wrap items-center gap-3">{#snippet icon()}<PlusIcon />{/snippet}{#each effects as item (item)}<Button effect={item} {icon}>{item}</Button>{/each}</div>
