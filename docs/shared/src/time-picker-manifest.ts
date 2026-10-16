export const timePickerExamples = {
  primitive: [
    { id: "basic", title: "基本用法", description: "默认输入和时间列。", height: 480 },
    { id: "controlled", title: "受控与非受控", description: "外部按钮设置、清空 value 和控制 open；对照仅初始化读取 defaultValue 的非受控输入。", height: 780 },
    { id: "format", title: "格式与步长", description: "对照 format 自动显示时分秒、时分、分秒、仅小时及 12 小时时段列，并演示步长。", height: 820 },
    { id: "disabled", title: "禁用与只读", description: "禁用阻止打开与修改，只读允许查看。", height: 480 },
    { id: "disabled-time", title: "禁用时间", description: "输入和列选择共用依赖时间约束。", height: 480 },
    { id: "trigger", title: "自定义触发元素", description: "替换默认 Input，保留原生触发绑定。", height: 480 },
    { id: "item", title: "自定义列内容", description: "修改选项内容，保留按钮语义和交互。", height: 480 },
    { id: "direction", title: "阅读方向", description: "LTR 与 RTL 使用相同组合。", height: 480 },
    { id: "logic", title: "独立逻辑", description: "无需内置 Root 或 Context 创建时间状态。", height: 480 },
  ],
  ui: [
    { id: "basic", title: "基本用法", description: "默认输入和时间列。", height: 480 },
    { id: "controlled", title: "受控与非受控", description: "外部按钮设置、清空 value 和控制 open；对照仅初始化读取 defaultValue 的非受控输入。", height: 780 },
    { id: "format", title: "格式与步长", description: "对照 format 自动显示时分秒、时分、分秒、仅小时及 12 小时时段列，并演示步长。", height: 820 },
    { id: "disabled", title: "禁用与只读", description: "禁用阻止打开与修改，只读允许查看。", height: 480 },
    { id: "disabled-time", title: "禁用时间", description: "输入和列选择共用依赖时间约束。", height: 480 },
    { id: "trigger", title: "自定义触发元素", description: "替换默认 Input，保留原生触发绑定。", height: 480 },
    { id: "item", title: "自定义列内容", description: "修改选项内容，保留按钮语义和交互。", height: 480 },
    { id: "direction", title: "阅读方向", description: "LTR 与 RTL 使用相同组合。", height: 480 },
    { id: "logic", title: "独立逻辑", description: "无需内置 Root 或 Context 创建时间状态。", height: 480 },
  ],
} as const
