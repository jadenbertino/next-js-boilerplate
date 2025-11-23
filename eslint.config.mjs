import pluginQuery from '@tanstack/eslint-plugin-query'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'
import customRulesPlugin from './eslint-custom-rules/index.js'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...pluginQuery.configs['flat/recommended'],
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'eslint-custom-rules/**', // don't lint the custom rules folder itself
  ]),
  // Custom rules
  {
    plugins: {
      'custom-rules': customRulesPlugin,
    },
    rules: {
      // auto set all custom plugin rules to error
      ...Object.keys(customRulesPlugin.rules).reduce((acc, ruleName) => {
        acc[`custom-rules/${ruleName}`] = 'error'
        return acc
      }, {}),
    },
  },
  prettier,
])

export default eslintConfig
