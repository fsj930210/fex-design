<script lang="ts">
  import PlusIcon from "@fex-design/svelte/icons/plus";
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
    class="rounded-sm bg-foreground text-background"
    aria-label="Add"><PlusIcon /></AvatarBadge
  ></Avatar
>
