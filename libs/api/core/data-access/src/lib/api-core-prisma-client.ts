import { PrismaClient } from '@prisma/client'
import { fieldEncryptionExtension } from 'prisma-field-encryption'
import pagination from 'prisma-extension-pagination'

export const prismaClient = new PrismaClient()
  .$extends(
    fieldEncryptionExtension({
      encryptionKey: process.env['CLOAK_MASTER_KEY'],
    }),
  )
  .$extends(
    pagination({
      pages: {
        includePageCount: true,
        limit: 10,
      },
    }),
  )

export type ApiCorePrismaClient = typeof prismaClient
