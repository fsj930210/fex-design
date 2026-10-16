<script lang="ts">
  import { Avatar, AvatarFallback, AvatarGroup } from '@fex-design/svelte/primitive/avatar'
</script>

<AvatarGroup
  >{#each Array(3) as _}<Avatar shape="square"
      ><AvatarFallback>FX</AvatarFallback></Avatar
    >{/each}</AvatarGroup
>
