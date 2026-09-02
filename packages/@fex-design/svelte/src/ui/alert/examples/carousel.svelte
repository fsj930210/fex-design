<script lang="ts">
  import { Alert } from '@fex-design/svelte/ui/alert'
</script>

<Alert type="warning" showIcon>
  <div class="marquee overflow-hidden">
    <div class="track flex w-max">
      <span class="pe-12">系统将在今晚 22:00 至 23:00 进行维护，<a href="#notice">查看公告详情</a></span>
      <span aria-hidden="true" class="copy pe-12">系统将在今晚 22:00 至 23:00 进行维护，查看公告详情</span>
    </div>
  </div>
</Alert>

<style>
  @keyframes loop {
    to { transform: translateX(-50%); }
  }

  .track { animation: loop 18s linear infinite; }
  .marquee:hover .track,
  .marquee:focus-within .track { animation-play-state: paused; }

  @media (prefers-reduced-motion: reduce) {
    .track { animation: none; }
    .copy { display: none; }
  }
  :global([dir='rtl']) .track { animation-direction: reverse; }
</style>
