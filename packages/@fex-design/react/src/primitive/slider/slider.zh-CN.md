# React Primitive Slider

用于从连续值或刻度值中选择单值、范围或可编辑节点。

## 导入

    import { SliderRoot, SliderTrack, SliderRange, SliderThumb, SliderMark } from '@fex-design/react/primitive/slider'

## API

Root 支持 value、defaultValue、min、max、step、marks、minStepsBetweenThumbs、orientation、reverse、disabled、keyboard、draggableRange、editable、minCount、maxCount、size、onChange 和 onEnd。Thumb 支持 index、disabled；Mark 支持 value。

## 示例

示例覆盖基础与受控值、权重分配、范围与多 Thumb、禁用 Thumb、范围拖拽、动态节点、动态 Marks/Dots/step=null、LTR/RTL/Reverse/垂直、尺寸和 CSS Variables。

## CSS Variables

--slider-track-height、--slider-track-background、--slider-range-background、--slider-thumb-size、--slider-thumb-background、--slider-thumb-border-color。

## 可访问性

每个 Thumb 都需要可访问名称；垂直 Thumb 暴露 aria-orientation；显示含义不同于原始数值时使用 aria-valuetext。
