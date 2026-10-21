<script lang="ts">
  import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
  } from "@fex-design/svelte/primitive/avatar";
</script>

<AvatarGroup
  >{#each Array(3) as _}<Avatar shape="square"
      ><AvatarFallback>FX</AvatarFallback></Avatar
    >{/each}<AvatarGroupCount class="rounded-md">+3</AvatarGroupCount
  ></AvatarGroup
>
