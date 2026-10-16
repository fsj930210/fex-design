<script lang="ts">
  import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from '@fex-design/svelte/primitive/avatar'
</script>

<AvatarGroup
  >{#each Array(3) as _}<Avatar
      ><AvatarImage
        src="https://github.com/shadcn.png"
        alt="shadcn avatar"
      /><AvatarFallback>FX</AvatarFallback></Avatar
    >{/each}<AvatarGroupCount>+3</AvatarGroupCount></AvatarGroup
>
