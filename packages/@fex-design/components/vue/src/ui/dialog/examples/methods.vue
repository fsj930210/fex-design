<script setup lang="ts">
import { h, ref, onBeforeUnmount } from 'vue'
import { Dialog, type DialogRequestHandle } from '@fex-design/vue/ui/dialog'
import { Button } from '@fex-design/vue/ui/button'
type Mode = 'update' | 'destroy' | 'destroyAll'
const feedback = ref('请选择一个操作')
const active = new Set<DialogRequestHandle>()
onBeforeUnmount(() => {
  for (const handle of active) handle.destroy()
})
function show(mode: Mode) {
  for (const handle of active) handle.destroy()
  active.clear()
  const count = mode === 'destroyAll' ? 2 : 1
  for (let index = 0; index < count; index++) {
    let handle: DialogRequestHandle
    // Render functions supply framework-native content to the imperative instance.
    const content = () =>
      h('div', { class: 'grid gap-3' }, [
        h(
          'p',
          mode === 'update'
            ? '更新标题、正文和确定按钮。'
            : mode === 'destroy'
              ? '点击按钮销毁当前实例。'
              : '当前同时打开两个弹窗，点击按钮全部销毁。',
        ),
        h('div', { class: 'flex flex-wrap gap-2' }, [
          ...(mode === 'update'
            ? [
                h(
                  Button,
                  {
                    onClick: () =>
                      handle.update({
                        title: '更新后的标题',
                        content: '正文和确定按钮已更新。',
                        okBtnProps: { content: '完成' },
                      }),
                  },
                  () => '对象更新',
                ),
                h(
                  Button,
                  {
                    onClick: () =>
                      handle.update((previous) => ({
                        title:
                          (typeof previous.title === 'string' ? previous.title : '实例') +
                          '（函数更新）',
                        content: '通过前一次配置更新完成。',
                        okBtnProps: { ...previous.okBtnProps, content: '完成' },
                      })),
                  },
                  () => '函数更新',
                ),
              ]
            : []),
          h(
            Button,
            { onClick: () => (mode === 'destroyAll' ? Dialog.destroyAll() : handle.destroy()) },
            () => (mode === 'destroyAll' ? '销毁全部' : '销毁当前'),
          ),
        ]),
      ])
    handle = Dialog.confirm({ title: '实例 ' + (index + 1), content })
    active.add(handle)
    void handle.result.then(() => {
      active.delete(handle)
      feedback.value = '剩余弹窗：' + active.size
    })
  }
  feedback.value = '已打开 ' + count + ' 个弹窗'
}
</script>
<template>
  <div class="flex flex-wrap justify-center gap-2">
    <Button @click="show('update')">演示 update</Button
    ><Button @click="show('destroy')">演示 destroy</Button
    ><Button @click="show('destroyAll')">演示 destroyAll（两个弹窗）</Button>
  </div>
  <p role="status">{{ feedback }}</p>
</template>
