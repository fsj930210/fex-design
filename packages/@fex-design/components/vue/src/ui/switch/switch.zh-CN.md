# Vue UI Switch

用于立即切换布尔状态。可选择 rounded 或 pill 形状。

## 导入

    import { Switch } from '@fex-design/vue/ui/switch'

## API

| 名称                              | 类型                     | 默认值    | 说明                           |
| --------------------------------- | ------------------------ | --------- | ------------------------------ |
| checked                           | boolean                  | —         | 受控开启状态。                 |
| defaultChecked                    | boolean                  | false     | 非受控初始状态。               |
| onChange / change                 | (checked, event)         | —         | 用户请求切换时触发。           |
| size                              | 'sm' \| 'md' \| 'lg'     | 'md'      | 开关尺寸。                     |
| shape                             | 'rounded' \| 'pill'      | 'rounded' | 轨道和滑块形状。               |
| loading                           | boolean                  | false     | 显示加载反馈并阻止交互。       |
| disabled                          | boolean                  | false     | 阻止交互。                     |
| checkedContent / uncheckedContent | 框架原生内容             | —         | 开启或关闭时显示的文字或图标。 |
| classNames                        | root/content/thumb class | —         | 按语义部位设置 class。         |
| styles                            | root/content/thumb style | —         | 按语义部位设置行内样式。       |

## CSS Variables

| 名称                                | 说明                 |
| ----------------------------------- | -------------------- |
| --switch-track-height               | 当前尺寸的轨道高度。 |
| --switch-track-background           | 关闭状态的轨道背景。 |
| --switch-track-checked-background   | 开启状态的轨道背景。 |
| --switch-track-border-color         | 关闭状态的轨道边框。 |
| --switch-track-checked-border-color | 开启状态的轨道边框。 |
| --switch-color                      | 关闭状态的内容颜色。 |
| --switch-checked-color              | 开启状态的内容颜色。 |
| --switch-thumb-background           | 滑块背景。           |
| --switch-thumb-color                | 滑块内容颜色。       |
| --switch-thumb-size                 | 当前尺寸的滑块边长。 |
| --switch-thumb-radius               | 当前形状的滑块圆角。 |

## 可访问性

根节点是带 role=switch 和 aria-checked 的原生按钮。每个开关都应提供可访问名称；校验失败使用 aria-invalid，并通过 aria-describedby 关联错误说明。
