<script lang="ts">
  import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarImage,
  } from "@fex-design/svelte/primitive/avatar";
</script>

<Avatar
  ><AvatarImage
    src="https://github.com/shadcn.png"
    alt="shadcn avatar"
  /><AvatarFallback>FX</AvatarFallback><AvatarBadge
    aria-label="Online"
  /></Avatar
>
