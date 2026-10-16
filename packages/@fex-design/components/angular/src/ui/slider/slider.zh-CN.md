# Angular UI Slider

用于从连续值或刻度值中选择单值、范围或可编辑节点。

## 导入

    import { Slider } from '@fex-design/angular/ui/slider'

## API

Root 支持 value、defaultValue、min、max、step、marks、minStepsBetweenThumbs、orientation、reverse、disabled、keyboard、draggableRange、editable、minCount、maxCount、size、onChange 和 onEnd。UI Slider 另支持 dots、included、classNames、styles，以及 boolean[] 形式的 disabled。

## CSS Variables

--slider-track-height、--slider-track-background、--slider-range-background、--slider-thumb-size、--slider-thumb-background、--slider-thumb-border-color。

## 可访问性

每个 Thumb 都需要可访问名称；垂直 Thumb 暴露 aria-orientation；显示含义不同于原始数值时使用 aria-valuetext。
