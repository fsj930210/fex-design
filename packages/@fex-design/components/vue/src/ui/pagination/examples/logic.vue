<script setup lang="ts">
import { ref } from 'vue'
import { usePagination } from '@fex-design/vue/primitive/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'
defineOptions({ name: 'PaginationUsePaginationExample' })
const pageSizeOptions = [10, 20, 50, 100]
const jump = ref('')
const { controller, snapshot } = usePagination({ total: 200, defaultPage: 3, labels: paginationDemoLabels })
function submitJump() { const page = Number(jump.value); if (Number.isInteger(page) && page > 0) controller.setPage(page, 'jump'); jump.value = '' }
</script>
<template>
  <nav :aria-label="snapshot.labels.navigation" class="grid w-full gap-3 rounded-lg border p-3">
    <div class="flex flex-wrap items-center gap-2">
      <span class="mr-auto">{{ snapshot.labels.total(snapshot.total) }}</span>
      <button type="button" :disabled="!snapshot.canPrevious" @click="controller.previousPage">{{ snapshot.labels.previous }}</button>
      <ol :aria-label="snapshot.labels.navigation" class="flex flex-wrap items-center gap-1">
        <li v-for="item in snapshot.pages" :key="item.key"><button v-if="item.type === 'page'" type="button" :aria-current="item.page === snapshot.page ? 'page' : undefined" @click="controller.setPage(item.page)">{{ item.page }}</button><span v-else aria-hidden="true">…</span></li>
      </ol>
      <button type="button" :disabled="!snapshot.canNext" @click="controller.nextPage">{{ snapshot.labels.next }}</button>
    </div>
    <div class="flex flex-wrap items-center gap-3">
      <label class="flex items-center gap-2">{{ snapshot.labels.pageSize }}<select :value="snapshot.pageSize" @change="controller.setPageSize(Number(($event.target as HTMLSelectElement).value))"><option v-for="size in pageSizeOptions" :key="size" :value="size">{{ snapshot.labels.pageSizeOption(size) }}</option></select></label>
      <label class="flex items-center gap-2">{{ snapshot.labels.jumpPrefix }}<input v-model="jump" type="number" min="1" :max="snapshot.pageCount" @keydown.enter="submitJump" />{{ snapshot.labels.jumpSuffix }}</label>
      <output aria-live="polite">{{ snapshot.page }} / {{ snapshot.pageCount }}</output>
    </div>
  </nav>
</template>
