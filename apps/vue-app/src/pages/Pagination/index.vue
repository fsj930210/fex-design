<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@fex-design/vue/primitive/pagination'
import Card from '@fex-design/vue/ui/card'
</script>

<template>
  <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
    <div class="mx-auto w-full max-w-5xl space-y-4">
      <header class="space-y-2">
        <RouterLink class="text-sm text-muted-foreground hover:text-foreground" to="/"
          >返回首页</RouterLink
        >
        <h1 class="text-2xl font-semibold text-foreground">Pagination</h1>
        <p class="max-w-2xl text-sm leading-6 text-muted-foreground">
          分页结构只负责可访问语义和基础交互样式。
        </p>
      </header>

      <Card title="Primitive" description="上一页、页码、省略号和下一页组合。">
        <Pagination
          ><PaginationContent
            ><PaginationItem><PaginationPrevious href="#previous" text="上一页" /></PaginationItem
            ><PaginationItem><PaginationLink href="#1">1</PaginationLink></PaginationItem
            ><PaginationItem><PaginationLink href="#2" is-active>2</PaginationLink></PaginationItem
            ><PaginationItem><PaginationEllipsis /></PaginationItem
            ><PaginationItem
              ><PaginationNext href="#next" text="下一页" /></PaginationItem></PaginationContent
        ></Pagination>
      </Card>
    </div>
  </main>
</template>
