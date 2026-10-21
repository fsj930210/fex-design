<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useMenu, type MenuBranch } from '@fex-design/vue/primitive/menu'
import { menuCustomItemClass, menuCustomActionClass } from '@fex-design/docs-shared/menu-demo'
const { controller, dom, snapshot } = useMenu({
  layout: 'inline',
  defaultValue: ['overview'],
  defaultOpenValues: ['workspace'],
})
const branch: MenuBranch = { value: () => 'workspace', parent: undefined }
const content = ref<HTMLElement>()
const overview = ref<HTMLElement>()
const workspace = ref<HTMLElement>()
const nested = ref<HTMLElement>()
const members = ref<HTMLElement>()
const roles = ref<HTMLElement>()
const billing = ref<HTMLElement>()
const profile = ref<HTMLElement>()
const stops: (() => void)[] = []
onMounted(() => {
  // All hosts are unconditional template nodes and are available after mount.
  stops.push(
    dom.bindContent(content.value!),
    dom.bindItem(overview.value!, () => ({ value: 'overview' })),
    dom.bindItem(workspace.value!, () => ({ value: 'workspace' }), undefined, branch),
    dom.bindContent(nested.value!, branch),
    dom.bindItem(members.value!, () => ({ value: 'members' }), branch),
    dom.bindItem(roles.value!, () => ({ value: 'roles' }), branch),
    dom.bindItem(billing.value!, () => ({ value: 'billing', disabled: true }), branch),
    dom.bindItem(profile.value!, () => ({ value: 'profile' })),
  )
})
onBeforeUnmount(() => stops.forEach((stop) => stop()))
function selectRoles() {
  controller.setValue(['roles'])
  controller.setOpen('workspace', true)
}
function clear() {
  controller.setValue([])
  controller.closeAll()
}
</script>
<template>
  <div class="grid w-full max-w-lg gap-3">
    <div class="flex flex-wrap gap-2">
      <button type="button" :class="menuCustomActionClass" @click="selectRoles">
        通过 controller 选择角色并展开
      </button>
      <button type="button" :class="menuCustomActionClass" @click="clear">清空并收起</button>
    </div>
    <div
      ref="content"
      aria-label="手写 Menu"
      class="w-full max-w-xs rounded-xl border border-border bg-background p-2 shadow-sm"
    >
      <p aria-hidden="true" class="px-3 py-2 text-xs font-medium text-muted-foreground">
        自定义工作台
      </p>
      <a ref="overview" :class="menuCustomItemClass" href="#overview">概览</a>
      <button ref="workspace" type="button" :class="menuCustomItemClass">
        <span>工作空间</span
        ><span aria-hidden="true">{{ snapshot.openValues.includes('workspace') ? '−' : '+' }}</span>
      </button>
      <div ref="nested" class="ms-3 border-s border-border ps-2">
        <button ref="members" type="button" :class="menuCustomItemClass">成员</button>
        <button ref="roles" type="button" :class="menuCustomItemClass">角色</button>
        <button ref="billing" type="button" :class="menuCustomItemClass" disabled>
          账单（禁用）
        </button>
      </div>
      <div role="separator" class="my-2 h-px bg-border"></div>
      <div role="group" aria-label="账户">
        <a ref="profile" :class="menuCustomItemClass" href="#profile">个人资料</a>
      </div>
    </div>
    <output class="break-all rounded-md bg-muted-background p-3 text-xs">
      选择：{{ JSON.stringify(snapshot.value) }}；展开：{{ JSON.stringify(snapshot.openValues) }}
    </output>
  </div>
</template>
