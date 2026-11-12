import 'zone.js'
import { Component, type Type } from '@angular/core'
import { NgComponentOutlet } from '@angular/common'
import { bootstrapApplication } from '@angular/platform-browser'
const loaders: Record<string, () => Promise<Type<unknown>>> = {
  'primitive/complex-dynamic': () =>
    import('../../../../packages/@fex-design/components/angular/src/primitive/form/examples/complex-dynamic').then(
      (m) => m.ComplexDynamicExample,
    ),
  'ui/complex-dynamic': () =>
    import('../../../../packages/@fex-design/components/angular/src/ui/form/examples/complex-dynamic').then(
      (m) => m.ComplexDynamicExample,
    ),
  'primitive/nested-validation': () =>
    import('../../../../packages/@fex-design/components/angular/src/primitive/form/examples/nested-validation').then(
      (m) => m.NestedValidationExample,
    ),
  'ui/nested-validation': () =>
    import('../../../../packages/@fex-design/components/angular/src/ui/form/examples/nested-validation').then(
      (m) => m.NestedValidationExample,
    ),
  'primitive/nested-fields': () =>
    import('../../../../packages/@fex-design/components/angular/src/primitive/form/examples/nested-fields').then(
      (m) => m.NestedFieldsExample,
    ),
  'ui/nested-fields': () =>
    import('../../../../packages/@fex-design/components/angular/src/ui/form/examples/nested-fields').then(
      (m) => m.NestedFieldsExample,
    ),
  'primitive/field-prefix': () =>
    import('../../../../packages/@fex-design/components/angular/src/primitive/form/examples/field-prefix').then(
      (m) => m.FieldPrefixExample,
    ),
  'ui/field-prefix': () =>
    import('../../../../packages/@fex-design/components/angular/src/ui/form/examples/field-prefix').then(
      (m) => m.FieldPrefixExample,
    ),
  'primitive/semantic-styles': () =>
    import('../../../../packages/@fex-design/components/angular/src/primitive/form/examples/semantic-styles').then(
      (m) => m.SemanticStylesExample,
    ),
  'ui/semantic-styles': () =>
    import('../../../../packages/@fex-design/components/angular/src/ui/form/examples/semantic-styles').then(
      (m) => m.SemanticStylesExample,
    ),
  'primitive/css-variables': () =>
    import('../../../../packages/@fex-design/components/angular/src/primitive/form/examples/css-variables').then(
      (m) => m.CssVariablesExample,
    ),
  'ui/css-variables': () =>
    import('../../../../packages/@fex-design/components/angular/src/ui/form/examples/css-variables').then(
      (m) => m.CssVariablesExample,
    ),
  'primitive/direction': () =>
    import('../../../../packages/@fex-design/components/angular/src/primitive/form/examples/direction').then(
      (m) => m.DirectionExample,
    ),
  'ui/direction': () =>
    import('../../../../packages/@fex-design/components/angular/src/ui/form/examples/direction').then(
      (m) => m.DirectionExample,
    ),
  'primitive/custom-control': () =>
    import('../../../../packages/@fex-design/components/angular/src/primitive/form/examples/custom-control').then(
      (m) => m.CustomControlExample,
    ),
  'ui/custom-control': () =>
    import('../../../../packages/@fex-design/components/angular/src/ui/form/examples/custom-control').then(
      (m) => m.CustomControlExample,
    ),
  'primitive/context-only': () =>
    import('../../../../packages/@fex-design/components/angular/src/primitive/form/examples/context-only').then(
      (m) => m.ContextOnlyExample,
    ),
  'ui/context-only': () =>
    import('../../../../packages/@fex-design/components/angular/src/ui/form/examples/context-only').then(
      (m) => m.ContextOnlyExample,
    ),
  'primitive/scroll': () =>
    import('../../../../packages/@fex-design/components/angular/src/primitive/form/examples/scroll').then(
      (m) => m.ScrollExample,
    ),
  'ui/scroll': () =>
    import('../../../../packages/@fex-design/components/angular/src/ui/form/examples/scroll').then(
      (m) => m.ScrollExample,
    ),
  'primitive/nested-array': () =>
    import('../../../../packages/@fex-design/components/angular/src/primitive/form/examples/nested-array').then(
      (m) => m.NestedArrayExample,
    ),
  'ui/nested-array': () =>
    import('../../../../packages/@fex-design/components/angular/src/ui/form/examples/nested-array').then(
      (m) => m.NestedArrayExample,
    ),
  'primitive/linked-fields': () =>
    import('../../../../packages/@fex-design/components/angular/src/primitive/form/examples/linked-fields').then(
      (m) => m.LinkedFieldsExample,
    ),
  'ui/linked-fields': () =>
    import('../../../../packages/@fex-design/components/angular/src/ui/form/examples/linked-fields').then(
      (m) => m.LinkedFieldsExample,
    ),
  'primitive/dirty-state': () =>
    import('../../../../packages/@fex-design/components/angular/src/primitive/form/examples/dirty-state').then(
      (m) => m.DirtyStateExample,
    ),
  'ui/dirty-state': () =>
    import('../../../../packages/@fex-design/components/angular/src/ui/form/examples/dirty-state').then(
      (m) => m.DirtyStateExample,
    ),
  'primitive/events': () =>
    import('../../../../packages/@fex-design/components/angular/src/primitive/form/examples/events').then(
      (m) => m.EventsExample,
    ),
  'ui/events': () =>
    import('../../../../packages/@fex-design/components/angular/src/ui/form/examples/events').then(
      (m) => m.EventsExample,
    ),
  'primitive/schema-validation': () =>
    import('../../../../packages/@fex-design/components/angular/src/primitive/form/examples/schema-validation').then(
      (m) => m.SchemaValidationExample,
    ),
  'ui/schema-validation': () =>
    import('../../../../packages/@fex-design/components/angular/src/ui/form/examples/schema-validation').then(
      (m) => m.SchemaValidationExample,
    ),
  'primitive/reset': () =>
    import('../../../../packages/@fex-design/components/angular/src/primitive/form/examples/reset').then(
      (m) => m.ResetExample,
    ),
  'ui/reset': () =>
    import('../../../../packages/@fex-design/components/angular/src/ui/form/examples/reset').then(
      (m) => m.ResetExample,
    ),
  'primitive/validation-feedback': () =>
    import('../../../../packages/@fex-design/components/angular/src/primitive/form/examples/validation-feedback').then(
      (m) => m.ValidationFeedbackExample,
    ),
  'primitive/submit': () =>
    import('../../../../packages/@fex-design/components/angular/src/primitive/form/examples/submit').then(
      (m) => m.SubmitExample,
    ),
  'primitive/layout': () =>
    import('../../../../packages/@fex-design/components/angular/src/primitive/form/examples/layout').then(
      (m) => m.LayoutExample,
    ),
  'ui/validation-feedback': () =>
    import('../../../../packages/@fex-design/components/angular/src/ui/form/examples/validation-feedback').then(
      (m) => m.ValidationFeedbackExample,
    ),
  'ui/submit': () =>
    import('../../../../packages/@fex-design/components/angular/src/ui/form/examples/submit').then(
      (m) => m.SubmitExample,
    ),
  'ui/layout': () =>
    import('../../../../packages/@fex-design/components/angular/src/ui/form/examples/layout').then(
      (m) => m.LayoutExample,
    ),
}
const query = new URLSearchParams(location.search)
const loader =
  loaders[(query.get('layer') ?? 'ui') + '/' + (query.get('demo') ?? 'validation-feedback')]
if (!loader) throw new Error('Unknown Form example')
const selected = await loader()
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgComponentOutlet],
  template:
    '<div class="runtime box-border grid min-h-screen place-items-center p-8"><ng-container [ngComponentOutlet]="example" /></div>',
})
class PreviewApp {
  readonly example = selected
}
void bootstrapApplication(PreviewApp)
