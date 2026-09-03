import { Directive, TemplateRef, inject } from '@angular/core'
@Directive({ selector: 'ng-template[skeletonPlaceholder]', standalone: true })
export class SkeletonPlaceholder { readonly template = inject<TemplateRef<unknown>>(TemplateRef) }
