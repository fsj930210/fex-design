# Pagination Primitive

## 用途

用于已知总条数的列表、搜索结果和表格分页。组件带默认样式，可以覆盖。

## 导入与用法

具名导入: `PaginationRoot, PaginationContent, PaginationPageButton, PaginationNavigationButton, PaginationEllipsis, PaginationPageSizeSelect, PaginationQuickJumper` 来自 `@fex-design/vue/primitive/pagination`.

```vue
<script setup lang="ts">
import {
  PaginationRoot,
  PaginationContent,
  PaginationPageButton,
  PaginationNavigationButton,
  PaginationEllipsis,
  PaginationPageSizeSelect,
  PaginationQuickJumper,
} from '@fex-design/vue/primitive/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'
import {
  paginationTotalClassName,
  paginationJumperGroupClassName,
} from '@fex-design/components-styles/pagination'
</script>
<template>
  <div class="grid w-full gap-space-lg">
    <PaginationRoot
      :total="200"
      :labels="paginationDemoLabels"
      :default-page="8"
      v-slot="{ snapshot }"
    >
      <span data-slot="pagination-total" :class="paginationTotalClassName">{{
        snapshot.labels.total(snapshot.total)
      }}</span>
      <PaginationContent>
        <PaginationNavigationButton direction="prev" />
        <template v-for="item in snapshot.pages" :key="item.key">
          <PaginationPageButton v-if="item.type === 'page'" :page="item.page" />
          <PaginationEllipsis v-else />
        </template>
        <PaginationNavigationButton direction="next" />
      </PaginationContent>
      <PaginationPageSizeSelect />
      <div data-slot="pagination-jumper" :class="paginationJumperGroupClassName">
        <span>{{ snapshot.labels.jumpPrefix }}</span
        ><PaginationQuickJumper /><span>{{ snapshot.labels.jumpSuffix }}</span>
      </div>
    </PaginationRoot>
  </div>
</template>
```

## 参数

| 参数名                                                                | 类型                      | 默认值         | 必填 | 说明                                   |
| --------------------------------------------------------------------- | ------------------------- | -------------- | ---- | -------------------------------------- |
| total                                                                 | number                    | 0              | 否   | 总记录数。                             |
| page / defaultPage                                                    | number                    | 1              | 否   | 受控页码 / 非受控初始页。              |
| pageSize / defaultPageSize                                            | number                    | 10             | 否   | 受控每页条数 / 非受控初始条数。        |
| siblingCount / boundaryCount                                          | number                    | 1              | 否   | 当前页两侧 / 首尾保留的页码数量。      |
| size                                                                  | sm / md / lg              | md             | 否   | 统一按钮、选择器和数字输入尺寸。       |
| disabled                                                              | boolean                   | false          | 否   | 禁止分页修改。                         |
| labels                                                                | Partial<PaginationLabels> | 英文文案       | 否   | 导航、总数、条数选项和跳页前后缀文案。 |
| PaginationPageButton.page                                             | number                    | 无             | 是   | 必填目标页，无效目标禁用。             |
| PaginationNavigationButton.direction                                  | prev / next               | 无             | 是   | 必填相邻页方向。                       |
| PaginationPageSizeSelect.options                                      | readonly number[]         | [10,20,50,100] | 否   | 每页条数选项。                         |
| PageButton / NavigationButton / PageSizeSelect / QuickJumper.disabled | boolean                   | false          | 否   | 禁用当前部件。                         |
| PageSizeSelect / QuickJumper.inputProps                               | 原生输入属性              | undefined      | 否   | 内层输入的属性和事件。                 |

## 事件与受控状态

`change(value, details), update:page and update:pageSize`. value 为 { page, pageSize }，details 包含 reason 和 previousValue。受控字段由调用方更新；undefined 表示非受控，初始值只读取一次。修改条数回到第一页，只通知一次完整分页值。配置同步不触发 change；重复操作当前页不触发 change。

脚本读取 snapshot.value，模板自动解包；双向绑定使用 v-model:page 与 v-model:page-size。

## 内容、原生属性和引用

页码、导航和省略号可通过原生内容、插槽、片段或投影替换；class/style 归当前部件宿主。

根节点透传原生 nav 属性，包括 dir、class/style 和事件；输入属性通过 inputProps 传递。React 使用 ref prop；Solid 使用 ref 回调；Vue Root 暴露 controller/snapshot，可通过模板 ref 消费；Svelte Root 提供 getController()/getSnapshot()，通过 bind:this 获取实例；Angular Root 通过模板引用导出实例，原生元素可使用 ElementRef。

## 布局与结构化样式

布局顺序为总数、页码、条数选择、快捷跳页。两侧布局使用下面的 CSS，不增加布局参数。

```css
.pagination-separated {
  width: 100%;
}
.pagination-separated > [data-slot='pagination-total'] {
  margin-inline-end: auto;
}
```

每个部件直接接收原生 class/style；额外总数、简洁内容和跳页文字由调用方组合，并复用共享默认样式。

## CSS 变量

| 变量                             | 说明                         |
| -------------------------------- | ---------------------------- |
| --pagination-control-height      | 控件高度与页码按钮最小宽度。 |
| --pagination-font-size           | 文字字号。                   |
| --pagination-gap                 | 分页区域之间的间距。         |
| --pagination-item-gap            | 页码项之间的间距。           |
| --pagination-radius              | 按钮、选择器与数字输入圆角。 |
| --pagination-color               | 页码与导航按钮默认文字颜色。 |
| --pagination-active-background   | 当前页背景色。               |
| --pagination-active-color        | 当前页文字颜色。             |
| --pagination-active-border-color | 当前页边框颜色。             |
| --pagination-hover-background    | 页码与导航按钮悬停背景。     |

## 注意事项与组合

快捷跳页只在 Enter 确认，空值或非整数不提交。total 为 0 时不生成页码，range 为 [0,0]，简洁显示为 0 / 0。总数减少会收敛可见页码，不擅自回写受控值。通过 dir 支持 RTL，按钮保留原生 Tab/Enter/Space 交互。数据请求、筛选重置和滚动由调用方事件处理。常与列表、搜索和表格组合。

## 示例

basic, full, controlled, simple, sizes, page-size-options, page-range, disabled, empty, hide-on-single-page, custom, layout, direction, logic, css-variables.

两层共有场景的配置、交互、反馈和共享样式保持相同；仅结构化样式为 UI 专属。controlled 包含外部设置和重置；css-variables 在两层都提供。
