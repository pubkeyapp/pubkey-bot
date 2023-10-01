import { Resolver } from '@nestjs/graphql'
import { ApiCollectionService } from '@pubkey-bot/api/collection/data-access'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-bot/api/auth/data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateCollectionInput,
  AdminFindManyCollectionInput,
  Collection,
  CollectionPaging,
  AdminUpdateCollectionInput,
} from '@pubkey-bot/api/collection/data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiCollectionAdminResolver {
  constructor(private readonly service: ApiCollectionService) {}

  @Mutation(() => Collection, { nullable: true })
  adminCreateCollection(@Args('input') input: AdminCreateCollectionInput) {
    return this.service.admin.createCollection(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteCollection(@Args('collectionId') collectionId: string) {
    return this.service.admin.deleteCollection(collectionId)
  }

  @Query(() => CollectionPaging, { nullable: true })
  adminFindManyCollection(@Args('input') input: AdminFindManyCollectionInput) {
    return this.service.admin.findManyCollection(input)
  }

  @Query(() => Collection, { nullable: true })
  adminFindOneCollection(@Args('collectionId') collectionId: string) {
    return this.service.admin.findOneCollection(collectionId)
  }

  @Mutation(() => Collection, { nullable: true })
  adminUpdateCollection(@Args('collectionId') collectionId: string, @Args('input') input: AdminUpdateCollectionInput) {
    return this.service.admin.updateCollection(collectionId, input)
  }
}
