import base from '@fex/config-oxc/oxlint/base'

export default {
  ...base,
  ignorePatterns: [
    '**/dist/**',
    '**/.turbo/**',
    '**/node_modules/**',
    'apps/*/public/mockServiceWorker.js',
  ],
}
