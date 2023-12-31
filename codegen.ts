import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: './api-schema.graphql',
  documents: ['libs/sdk/src/graphql/**/*.graphql'],
  generates: {
    'libs/sdk/src/generated/graphql-sdk.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
        {
          add: {
            content: '// @ts-nocheck',
          },
        },
      ],
      config: {
        rawRequest: true,
        scalars: {
          DateTime: 'Date',
        },
      },
    },
  },
  hooks: {
    afterOneFileWrite: ['prettier --write'],
  },
}

export default config
