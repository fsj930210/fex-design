# Dropdown Primitive

Dropdown 组合 Popover 和 Menu：根浮层由 Popover 管理，菜单项注册、选择、键盘导航和子菜单由 Menu 管理。Content 同时承担根浮层和菜单容器，带默认样式。MenuItem、SubMenu 等部件从同框架的 Menu Primitive 入口导入。

## Root 配置

| 配置                   | 说明                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `open` / `defaultOpen` | 根浮层的受控状态 / 非受控初始状态；未提供 `open` 时保持非受控。                                                          |
| `onOpenChange`         | 请求改变根浮层时通知调用方；Vue 使用 `update:open` / `openChange`，Angular 使用 `openChange` / `openChangeInfo`。        |
| `onActivate`           | 叶子菜单项激活前调用；调用 `preventDefault()` 取消选择和默认关闭。Vue、Angular 使用 `activate` 事件。                    |
| `disabled`             | 禁用根触发交互和菜单项，并向触发器传递 `aria-disabled`；受控打开值仍由调用方决定。                                       |
| `closeOnSelect`        | 成功激活叶子项后请求关闭根浮层，默认 `true`。                                                                            |
| `popoverProps`         | 定位、容器、触发方式、挂载和关闭配置；根打开状态、禁用及回调直接由 Root 提供。触发方式仅支持 `click`、`hover`、`focus`。 |
| `menuProps`            | 选择值、尺寸、方向、子菜单展开与回调；布局固定为垂直，禁用和激活回调由 Root 提供。                                       |

受控状态由调用方更新；配置同步不应产生用户变更事件。子菜单受控展开值由调用方持有，根浮层关闭期间子菜单不显示。

当前限制：受控模式下，如果方向键发出的打开请求经过一次未接受该请求的配置同步后才被接受，焦点可能落在首项而非 ArrowUp 请求的末项。调用方可通过 `popoverProps.onOpenAutoFocus` 接管焦点；这项限制不改变目标交互契约。

## 部件与交互

- `DropdownTrigger` 连接调用方的真实元素，提供打开状态和菜单语义；方向键打开后进入首项或末项。
- `DropdownPortal` 使用默认容器，也可以传入本框架支持的容器；`DropdownContent` 承担根菜单语义和浮层定位，接受原生属性、事件及样式。 触发器提供 `data-dropdown-trigger` 标记，内容提供 `data-slot="dropdown-content"`。 根 Portal 的容器只作用于根内容；子菜单通过自身的 `popoverProps` 或内容容器配置单独指定挂载位置。
- 菜单项、分组、分隔线和多级子菜单直接组合 Menu Primitive。选择叶子项默认关闭，`closeOnSelect=false` 可保持打开；禁用项不可激活。
- Escape、外部点击和 Tab 使用共享浮层与菜单逻辑；焦点返回取决于关闭原因。详细契约见仓库的 Dropdown Primitive 设计文档。

## 独立逻辑

框架入口还公开 `useDropdown` 或 `createDropdown`。独立适配器接收 `{ popoverProps, menuProps, closeOnSelect }`，返回共享 controller 与响应式快照；自定义宿主可通过 controller 的 `bindTrigger`、`bindFloatingContent` 连接真实 DOM，通过 `dom.bindItem` 注册菜单项，并在宿主移除时执行返回的清理函数。业务需要自行连接原生事件和适用的 ARIA 属性；可使用 `triggerKeyDown`、`overlay.trigger` 和 `overlay` 的打开/关闭方法。

## 基础组合

以下源码与当前框架的 `examples/basic` 文件一致：

```ts
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/angular/primitive/dropdown'
import { MenuItem, type MenuActivateInfo } from '@fex-design/angular/primitive/menu'
import { Button } from '@fex-design/angular/primitive/button'

@Component({
  selector: 'dropdown-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownRoot, DropdownTrigger, DropdownPortal, DropdownContent, MenuItem, Button],
  template: `
    <div class="flex min-h-48 flex-col items-start gap-4 p-6">
      <div dropdownRoot (activate)="select($event)">
        <button button dropdownTrigger>操作</button>
        <ng-template dropdownPortal
          ><div dropdownContent>
            <button menuItem value="rename">重命名</button>
            <button menuItem value="duplicate">复制</button>
            <button menuItem value="archive" disabled>归档</button>
          </div></ng-template
        >
      </div>
      <output>最近操作：{{ value() }}</output>
    </div>
  `,
})
export class DropdownBasicExample {
  readonly value = signal('尚未选择')
  select(info: MenuActivateInfo) {
    this.value.set(info.value)
  }
}
```
