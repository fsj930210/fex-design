# Select

Select Primitive 公开 `SelectRoot`、`SelectTrigger`、`SelectValue`、`SelectContent`、`SelectItem`、`SelectGroup`、`SelectLabel` 和 `SelectSeparator`。

`SelectRoot` 接收动态 `items`，Item 挂载时不注册。搜索值保持内部状态；`showSearch` 让共享 Input Trigger 可输入，`filterOption` 用于本地过滤，远程搜索则在 `onSearch` 后替换 `items`。`virtual` 在 Content 内执行真正的窗口化渲染。

Select 只支持单选和多选已有项目；自由标签创建属于独立的 TagsInput。

