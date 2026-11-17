<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@fex-design/vue/primitive/button'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogActions,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
} from '@fex-design/vue/primitive/dialog'
import { dialogMessageClassName } from '@fex-design/components-styles/dialog'
const ids = ['first', 'second'] as const
type Id = (typeof ids)[number]
type Mode = 'update' | 'destroy' | 'destroyAll'
type Slot = { open: boolean; title: string; content: string; updated: boolean }
const initial = (): Record<Id, Slot> => ({
  first: { open: false, title: '实例 1', content: '', updated: false },
  second: { open: false, title: '实例 2', content: '', updated: false },
})
const slots = ref(initial())
const mode = ref<Mode>('update')
const feedback = ref('请选择一个操作')
function show(next: Mode) {
  mode.value = next
  const value = initial()
  value.first.open = true
  value.second.open = next === 'destroyAll'
  slots.value = value
  feedback.value = '已打开 ' + (next === 'destroyAll' ? 2 : 1) + ' 个弹窗'
}
function update(id: Id, functional = false) {
  const previous = slots.value[id]
  slots.value = {
    ...slots.value,
    [id]: {
      ...previous,
      title: functional ? previous.title + '（函数更新）' : '更新后的标题',
      content: functional ? '通过前一次配置更新完成。' : '正文和确定按钮已更新。',
      updated: true,
    },
  }
}
function destroy(id: Id, all = false) {
  const next = { ...slots.value }
  for (const key of ids) if (all || key === id) next[key] = { ...next[key], open: false }
  slots.value = next
  feedback.value = '剩余弹窗：' + ids.filter((key) => next[key].open).length
}
</script>
<template>
  <div class="flex flex-wrap justify-center gap-2">
    <Button @click="show('update')">演示 update</Button
    ><Button @click="show('destroy')">演示 destroy</Button
    ><Button @click="show('destroyAll')">演示 destroyAll（两个弹窗）</Button>
  </div>
  <p role="status">{{ feedback }}</p>
  <template v-for="id in ids" :key="id"
    ><DialogRoot
      :open="slots[id].open"
      @open-change="
        (value) => {
          if (!value) destroy(id)
        }
      "
      :close-on-escape="false"
      :close-on-overlay-click="false"
      ><DialogPortal
        ><DialogOverlay /><DialogContent :class="dialogMessageClassName"
          ><DialogHeader
            ><DialogTitle>{{ slots[id].title }}</DialogTitle></DialogHeader
          ><DialogActions><DialogClose /></DialogActions
          ><DialogBody
            ><p v-if="slots[id].updated">{{ slots[id].content }}</p>
            <div v-else class="grid gap-3">
              <p>
                {{
                  mode === 'update'
                    ? '更新标题、正文和确定按钮。'
                    : mode === 'destroy'
                      ? '点击按钮销毁当前实例。'
                      : '当前同时打开两个弹窗，点击按钮全部销毁。'
                }}
              </p>
              <div class="flex flex-wrap gap-2">
                <template v-if="mode === 'update'"
                  ><Button @click="update(id)">对象更新</Button
                  ><Button @click="update(id, true)">函数更新</Button></template
                ><Button @click="destroy(id, mode === 'destroyAll')">{{
                  mode === 'destroyAll' ? '销毁全部' : '销毁当前'
                }}</Button>
              </div>
            </div></DialogBody
          ><DialogFooter
            ><Button @click="destroy(id)">取消</Button
            ><Button variant="solid" color="primary" @click="destroy(id)">{{
              slots[id].updated ? '完成' : '确定'
            }}</Button></DialogFooter
          ></DialogContent
        ></DialogPortal
      ></DialogRoot
    ></template
  >
</template>
