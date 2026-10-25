<script lang="ts">
  import SyncSearch from "./sync-search.svelte";
  import AsyncSearch from "./async-search.svelte";
</script>

<div class="grid w-full gap-space-lg">
  <section class="grid gap-space-sm">
    <h3 class="font-medium">同步搜索</h3>
    <SyncSearch />
  </section>
  <section class="grid gap-space-sm">
    <h3 class="font-medium">异步搜索</h3>
    <AsyncSearch />
  </section>
</div>
