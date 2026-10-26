# Tree primitive

Angular Tree 是 `@fex-design/core` controller 的 Signal-first primitive。它不隐式安装 feature；完整默认组合通过 `@fex-design/angular/ui/tree` 提供。

## 导入

```ts
import { expansionFeature } from '@fex-design/core/tree/features/expansion'
import { selectionFeature } from '@fex-design/core/tree/features/selection'
import {
  TreeItem,
  TreeRoot,
  TreeTitle,
  TreeTrigger,
  TreeViewport,
  createTreeSignals,
} from '@fex-design/angular/primitive/tree'
```

DnD directive 也可以从组件族入口具名导入；需要独立使用时可使用文件级入口：

```ts
import { TreeDndItem } from '@fex-design/angular/primitive/tree'
```

## 基本组合

```html
<div treeRoot [options]="options">
  <div treeViewport>
    <ng-template let-item>
      <div [treeItem]="item.key">
        <button treeTrigger></button>
        <span treeTitle>{{ item.data.name }}</span>
      </div>
    </ng-template>
  </div>
</div>
```

## TreeRoot inputs

| 参数         | 类型                    | 默认值 | 必填               | 说明                          |
| ------------ | ----------------------- | ------ | ------------------ | ----------------------------- |
| `options`    | `TreeOptions<TNode>`    | -      | 无 controller 时是 | 创建或更新内部 controller。   |
| `controller` | `TreeController<TNode>` | -      | 否                 | 使用外部 controller。         |
| `indent`     | `number`                | `16`   | 否                 | 每层缩进与 DnD 计算基准。     |
| `rowHeight`  | `number`                | `32`   | 否                 | 行高与虚拟尺寸估算。          |
| `class`      | 原生 class              | -      | 否                 | 自动与根元素默认 class 合并。 |

## 逻辑层与部件

| API                                          | 说明                                                                         |
| -------------------------------------------- | ---------------------------------------------------------------------------- |
| `createTreeSignals(getOptions, controller?)` | 返回 controller、snapshot signal 和 visibleItems signal，供自定义 DOM 使用。 |
| `TreeViewport`                               | 通过 `ng-template` 输出普通可见列表。                                        |
| `TreeVirtualViewport`                        | 使用 `@tanstack/angular-virtual`，实例方法支持 `scrollTo`。                  |
| `TreeItem`                                   | 节点级订阅，提供 ARIA、状态 signal 和 actions。                              |
| `TreeTrigger`                                | 事件驱动的异步加载、展开和折叠。                                             |
| `TreeTitle`                                  | 最小 title 样式协议。                                                        |
| `TreeDndItem`                                | 可选拖拽、预览与深度指示器。                                                 |

## 受控状态与回调

| 受控值         | 非受控初值            | 回调                   |
| -------------- | --------------------- | ---------------------- |
| `expandedKeys` | `defaultExpandedKeys` | `onExpandedKeysChange` |
| `selectedKeys` | `defaultSelectedKeys` | `onSelectedKeysChange` |
| `checkedKeys`  | `defaultCheckedKeys`  | `onCheckedKeysChange`  |
| `focusedKey`   | `defaultFocusedKey`   | `onFocusedKeyChange`   |

选择默认单选；多选必须显式注册 selection feature 的 multiple 配置。展开、选择、勾选、焦点、键盘、异步加载、搜索和 DnD 都由调用方加入 `features`，core 会校验依赖与冲突。

`treeData` 是调用方维护的唯一数据源。拖拽只回传放置意图；`loadChildren` 返回 `Promise<void>`，由调用方请求并写回 children。新增、修改、删除和移动由业务处理，成功后可重新获取整棵树并传入；组件不修改源数据。

## 注意事项

- key 必须稳定唯一。
- `createTreeSignals` 应在 Angular 注入上下文中调用，以便自动清理 core subscription。
- 虚拟列表不进入 core；core 只暴露可见列表和索引。
- checkbox、spinner、搜索输入和 title 模板由 UI 组合层负责。
