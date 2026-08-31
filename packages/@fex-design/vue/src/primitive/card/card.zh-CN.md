# Vue Primitive Card

由七个语义区域组成的可组合信息容器。

## 导入

    import { Card, CardHeader, CardTitle, CardDescription, CardExtra, CardContent, CardFooter } from '@fex-design/vue/primitive/card'

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

该组件族不增加额外状态属性；内容、class、style、ARIA 和原生事件按对应元素透传。
