<script lang="ts">import Avatar from '@fex-design/svelte/primitive/avatar'; import AvatarFallback from '@fex-design/svelte/primitive/avatar-fallback'; import AvatarGroup from '@fex-design/svelte/primitive/avatar-group'</script>
<AvatarGroup>{#each Array(3) as _}<Avatar shape="square"><AvatarFallback>FX</AvatarFallback></Avatar>{/each}</AvatarGroup>
