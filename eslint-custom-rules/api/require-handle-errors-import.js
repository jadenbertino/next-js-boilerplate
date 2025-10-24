/**
 * Custom ESLint rule to enforce handleErrors import in API route handlers
 * Only applies to GET.ts, POST.ts, DELETE.ts, PUT.ts, PATCH.ts files in src/app/api/**
 */

import path from 'path'

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require handleErrors import in API route handler files (GET.ts, POST.ts, etc.)',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      missingHandleErrorsImport:
        'API route handler files must import handleErrors from "@/lib/api/handleErrors" or "@/lib/api"',
    },
    schema: [],
  },

  create(context) {
    const filename = context.getFilename()
    const basename = path.basename(filename)
    const dirname = path.dirname(filename)

    // Only apply to specific filenames
    const validFilenames = [
      'GET.ts',
      'POST.ts',
      'DELETE.ts',
      'PUT.ts',
      'PATCH.ts',
    ]
    if (!validFilenames.includes(basename)) {
      return {}
    }

    // Only apply to files in src/app/api directory (with any subdirectories)
    const normalizedPath = dirname.replace(/\\/g, '/')
    if (!normalizedPath.includes('/src/app/api/')) {
      return {}
    }

    let hasHandleErrorsImport = false

    return {
      ImportDeclaration(node) {
        // Check if this is an import from '@/lib/api/handleErrors' or '@/lib/api'
        const validSources = ['@/lib/api/handleErrors', '@/lib/api']
        if (validSources.includes(node.source.value)) {
          // Check if 'handleErrors' is in the imported specifiers
          const hasHandleErrors = node.specifiers.some(
            (specifier) =>
              specifier.type === 'ImportSpecifier' &&
              specifier.imported.name === 'handleErrors',
          )
          if (hasHandleErrors) {
            hasHandleErrorsImport = true
          }
        }
      },

      'Program:exit'(node) {
        if (!hasHandleErrorsImport) {
          context.report({
            node,
            messageId: 'missingHandleErrorsImport',
          })
        }
      },
    }
  },
}
