<script lang="ts">
  import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarImage,
  } from "@fex-design/svelte/primitive/avatar";
</script>

<div class="flex flex-wrap items-center gap-8">
  <div dir="ltr">
    <p class="mb-2 text-xs text-muted-foreground">LTR · 中文示例</p>
    <AvatarGroup
      >{#each Array(3) as _}<Avatar
          ><AvatarImage
            src="https://github.com/shadcn.png"
            alt="shadcn avatar"
          /><AvatarFallback>FX</AvatarFallback></Avatar
        >{/each}</AvatarGroup
    >
  </div>
  <div dir="rtl">
    <p class="mb-2 text-xs text-muted-foreground">RTL · مثال عربي</p>
    <AvatarGroup
      >{#each Array(3) as _}<Avatar
          ><AvatarImage
            src="https://github.com/shadcn.png"
            alt="shadcn avatar"
          /><AvatarFallback>FX</AvatarFallback></Avatar
        >{/each}</AvatarGroup
    >
  </div>
</div>
