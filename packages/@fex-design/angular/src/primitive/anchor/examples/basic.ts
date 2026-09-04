import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core'
import { AnchorIndicator, AnchorItem, AnchorLink, AnchorList, AnchorRail, AnchorRoot } from '../anchor'
@Component({ selector:'anchor-basic-example', standalone:true, imports:[AnchorRoot,AnchorRail,AnchorIndicator,AnchorList,AnchorItem,AnchorLink], changeDetection:ChangeDetectionStrategy.OnPush, templateUrl:'./basic.html' })
export class AnchorBasicExample { private readonly containerRef=viewChild.required<ElementRef<HTMLElement>>('container'); protected readonly container=()=>this.containerRef().nativeElement }
