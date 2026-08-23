import { Link } from 'react-router'
import { ClearDemo } from './clear-demo'
import { ChangeMetaDemo } from './change-meta-demo'
import { CustomRenderDemo } from './custom-render-demo'
import { CustomSearchDemo } from './custom-search-demo'
import { CustomTagDemo } from './custom-tag-demo'
import { EmptyDemo } from './empty-demo'
import { FormStatusDemo } from './form-status-demo'
import { GroupDemo } from './group-demo'
import { LocalSearchDemo } from './local-search-demo'
import { MaxCountDemo } from './max-count-demo'
import { MultiFieldSearchDemo } from './multi-field-search-demo'
import { MultipleDemo } from './multiple-demo'
import { PrefixSuffixDemo } from './prefix-suffix-demo'
import { PopupRenderDemo } from './popup-render-demo'
import { RemoteSearchDemo } from './remote-search-demo'
import { SingleDemo } from './single-demo'
import { TagsDemo } from './tags-demo'
import { VirtualDemo } from './virtual-demo'

export function SelectPage() {
  return (
    <main className="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <header className="space-y-2">
          <Link className="text-sm text-muted-foreground hover:text-foreground" to="/">
            Back home
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Select</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Single, multiple and tags selection with local or remote search, grouping and optional
              virtualization.
            </p>
          </div>
        </header>
        <div className="grid gap-4">
          <SingleDemo />
          <MultipleDemo />
          <TagsDemo />
          <ClearDemo />
          <MaxCountDemo />
          <ChangeMetaDemo />
          <CustomTagDemo />
          <PrefixSuffixDemo />
          <FormStatusDemo />
          <PopupRenderDemo />
          <GroupDemo />
          <CustomRenderDemo />
          <LocalSearchDemo />
          <MultiFieldSearchDemo />
          <CustomSearchDemo />
          <RemoteSearchDemo />
          <EmptyDemo />
          <VirtualDemo />
        </div>
      </div>
    </main>
  )
}
