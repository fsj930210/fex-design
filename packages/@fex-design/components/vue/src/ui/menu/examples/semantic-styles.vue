<script setup lang="ts">
import { Menu } from '@fex-design/vue/ui/menu'
import { Button } from '@fex-design/vue/ui/button'
import { computed, ref } from 'vue'
import type { MenuPopoverProps } from '@fex-design/vue/ui/menu'
import type { MenuClassNames, MenuStyles, MenuItemData } from '@fex-design/vue/ui/menu'
const styled = ref(true),
  open = ref(['workspace'])
const names = computed<MenuClassNames>(() =>
  styled.value
    ? {
        root: 'rounded-xl border-2 border-violet-300 bg-violet-50 p-2',
        item: 'rounded-lg hover:bg-violet-100 data-[selected=true]:bg-violet-200 data-[selected=true]:text-violet-950',
        subMenuTrigger: 'rounded-lg bg-violet-100 text-violet-950 hover:bg-violet-200',
        subMenuContent: 'min-w-48',
        group: 'rounded-lg bg-violet-100/50',
        separator: 'bg-violet-300',
      }
    : { root: 'rounded-xl border border-border bg-background p-2', subMenuContent: 'min-w-48' },
)
const partStyles = computed<MenuStyles | undefined>(() =>
  styled.value
    ? {
        root: { borderRadius: '16px' },
        item: { fontWeight: 500 },
        subMenuTrigger: { fontWeight: 600 },
      }
    : undefined,
)
const popup = computed<MenuPopoverProps | undefined>(() =>
  styled.value
    ? {
        classNames: {
          root: 'border-2 border-violet-300 bg-violet-50',
          content: 'rounded-lg bg-violet-100/50 p-2',
        },
        styles: { root: { borderRadius: '16px' }, content: { gap: '8px' } },
      }
    : undefined,
)
function show(next: boolean) {
  styled.value = next
  open.value = ['workspace']
}
const items = computed<readonly MenuItemData[]>(() => [
  { value: 'overview', label: '概览' },
  {
    value: 'workspace',
    label: '工作空间',
    popoverProps: popup.value,
    children: [
      { value: 'members', label: '成员' },
      { value: 'roles', label: '角色' },
      { value: 'billing', label: '账单', disabled: true },
    ],
  },
  { type: 'separator', key: 'account-separator' },
  {
    type: 'group',
    key: 'account',
    label: '账户',
    children: [
      { value: 'profile', label: '个人资料' },
      { value: 'logout', label: '退出登录' },
    ],
  },
])
</script>
<template>
  <div class="grid min-h-80 w-full max-w-xl content-start gap-3">
    <div class="flex gap-2">
      <Button size="sm" @click="show(false)">默认样式</Button>
      <Button size="sm" @click="show(true)">整体定制</Button>
    </div>
    <Menu
      layout="vertical"
      :default-value="['overview']"
      v-model:open-values="open"
      class="w-44 max-w-full"
      :items="items"
      :class-names="names"
      :styles="partStyles"
    />
  </div>
</template>
