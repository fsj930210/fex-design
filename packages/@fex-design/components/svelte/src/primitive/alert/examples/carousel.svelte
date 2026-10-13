<script lang="ts">
  import Alert from "../alert.svelte";
  import AlertIcon from "../alert-icon.svelte";
  import AlertDescription from "../alert-description.svelte";
  import TriangleAlertIcon from '@fex-design/svelte/icons/triangle-alert.svelte';
</script>

<Alert type="warning" class="overflow-hidden">
  <AlertIcon><TriangleAlertIcon /></AlertIcon>
  <AlertDescription class="marquee overflow-hidden">
    <div class="track flex w-max">
      <span class="pe-12"
        >系统将在今晚 22:00 至 23:00 进行维护，<a href="#notice">查看公告详情</a
        ></span
      >
      <span aria-hidden="true" class="copy pe-12"
        >系统将在今晚 22:00 至 23:00 进行维护，查看公告详情</span
      >
    </div>
  </AlertDescription>
</Alert>

<style>
  @keyframes loop {
    to {
      transform: translateX(-50%);
    }
  }

  .track {
    animation: loop 18s linear infinite;
  }
  :global(.marquee):hover .track,
  :global(.marquee):focus-within .track {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    .track {
      animation: none;
    }
    .copy {
      display: none;
    }
  }
  :global([dir="rtl"]) .track {
    animation-direction: reverse;
  }
</style>
