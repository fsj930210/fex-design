<script lang="ts">
  import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
    EmptyContent,
  } from "@fex-design/svelte/primitive/empty";
</script>

<Empty class="min-h-72 bg-secondary-background"
  ><EmptyHeader
    ><EmptyMedia class="text-primary"
      ><svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        ><rect
          width="48"
          height="48"
          rx="12"
          fill="currentColor"
          opacity="0.1"
        /></svg
      ></EmptyMedia
    ><EmptyTitle class="text-base">暂无通知</EmptyTitle><EmptyDescription
      style="max-width:24rem">新的通知会显示在这里。</EmptyDescription
    ></EmptyHeader
  ><EmptyContent class="mt-2"
    ><button class="rounded-md border border-border px-3 py-2">刷新</button
    ></EmptyContent
  ></Empty
>
