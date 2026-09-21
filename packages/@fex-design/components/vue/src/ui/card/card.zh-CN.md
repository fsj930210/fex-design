# Vue UI Card

基于 Card Primitive 的快捷容器，提供结构化内容与语义区域样式入口。

## 导入

    import { Card, CardHeader, CardTitle, CardDescription, CardExtra, CardContent, CardFooter } from '@fex-design/vue/ui/card'

## 组件

| 组件            | 元素 | 说明                                                              |
| --------------- | ---- | ----------------------------------------------------------------- |
| Card            | div  | 继承原生 div，原生 div 的所有属性和事件均可透传；信息容器根节点。 |
| CardHeader      | div  | 继承原生 div，原生 div 的所有属性和事件均可透传；头部布局。       |
| CardTitle       | div  | 继承原生 div，原生 div 的所有属性和事件均可透传；标题。           |
| CardDescription | div  | 继承原生 div，原生 div 的所有属性和事件均可透传；辅助说明。       |
| CardExtra       | div  | 继承原生 div，原生 div 的所有属性和事件均可透传；标题区补充内容。 |
| CardContent     | div  | 继承原生 div，原生 div 的所有属性和事件均可透传；主体内容。       |
| CardFooter      | div  | 继承原生 div，原生 div 的所有属性和事件均可透传；底部内容。       |

## 示例

示例保存在 `examples/<name>`，作为官网预览源码。

| 名称          | 覆盖内容             |
| ------------- | -------------------- |
| basic         | 完整信息卡片。       |
| extra         | 标题区额外内容。     |
| custom-header | 自定义 Header。      |
| surface       | 区域 surface。       |
| css-variables | 实例 CSS Variables。 |

## API

| 名称       | 类型           | 默认值 | 说明                                                                     |
| ---------- | -------------- | ------ | ------------------------------------------------------------------------ |
| classNames | CardClassNames | —      | 按 root、header、title、description、extra、content、footer 追加 class。 |
| styles     | CardStyles     | —      | 按语义区域追加内联样式。                                                 |
