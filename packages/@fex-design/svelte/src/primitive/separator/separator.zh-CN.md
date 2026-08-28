# Svelte Primitive Separator

提供语义分隔和原生 `div` 属性透传的底层 Separator。

## 导入

    import Separator from '@fex-design/svelte/primitive/separator'

## Separator API

| 名称        | 类型                         | 默认值       | 说明                 |
| ----------- | ---------------------------- | ------------ | -------------------- |
| orientation | `'horizontal' \| 'vertical'` | `horizontal` | 分隔线方向。         |
| 原生属性    | Svelte div attrs             | —            | 透传原生属性与事件。 |

## 无障碍

Separator 始终输出 `role="separator"`，并通过 `aria-orientation` 暴露方向。
