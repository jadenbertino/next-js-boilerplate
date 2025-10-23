/**
 * Custom ESLint plugin for project-specific rules
 */

import requireHandleErrorsImport from './api/require-handle-errors-import.js'
import routeDefaultImportsOnly from './api/route-default-imports-only.js'

export default {
  rules: {
    'require-handle-errors-import': requireHandleErrorsImport,
    'route-default-imports-only': routeDefaultImportsOnly,
  },
}
