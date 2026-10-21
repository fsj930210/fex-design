<script lang="ts">
  import {
    SkeletonAvatar,
    SkeletonText,
  } from "@fex-design/svelte/primitive/skeleton";
</script>

<div
  aria-hidden="true"
  data-slot="skeleton-root"
  class="flex w-full items-start gap-3 rounded-xl border border-dashed border-primary p-5"
>
  <div class="shrink-0">
    <SkeletonAvatar
      size="lg"
      class="bg-blue-300"
      style="width:56px;height:56px"
    />
  </div>
  <div class="grid min-w-0 flex-1">
    <SkeletonText class="mb-4 bg-blue-400" style="width:45%;height:20px" />
    <div class="grid gap-2">
      <SkeletonText class="bg-blue-200" /><SkeletonText
        class="bg-blue-200"
      /><SkeletonText class="bg-blue-200" style="width:70%" />
    </div>
  </div>
</div>
