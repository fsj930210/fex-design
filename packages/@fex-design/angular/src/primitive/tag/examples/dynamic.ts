import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Tag, TagAction } from '@fex-design/angular/primitive/tag'
@Component({ selector: 'tag-dynamic-example', standalone: true, imports: [Tag, TagAction], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './dynamic.html' })
export class Dynamic { protected readonly tags = signal([{ id: 1, label: '设计' }, { id: 2, label: '开发' }, { id: 3, label: '测试' }]); protected addTag(input: HTMLInputElement) { const label = input.value.trim(); if (!label) return; this.tags.update((items) => [...items, { id: Date.now(), label }]); input.value = '' } protected removeTag(id: number) { this.tags.update((items) => items.filter((item) => item.id !== id)) } }
