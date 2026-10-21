<script lang="ts">
  import PlusIcon from "@fex-design/svelte/icons/plus";
  import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
  } from "@fex-design/svelte/primitive/avatar";
</script>

<AvatarGroup
  >{#each Array(3) as _}<Avatar
      ><AvatarImage
        src="https://github.com/shadcn.png"
        alt="shadcn avatar"
      /><AvatarFallback>FX</AvatarFallback></Avatar
    >{/each}<AvatarGroupCount aria-label="Add avatar"
    ><PlusIcon /></AvatarGroupCount
  ></AvatarGroup
>
