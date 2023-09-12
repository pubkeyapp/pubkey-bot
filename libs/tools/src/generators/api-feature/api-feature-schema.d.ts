export type ApiFeatureGeneratorSchema = Partial<NormalizedApiFeatureSchema>

export interface NormalizedApiFeatureSchema {
  app: string
  name: string
  label: string
  modelName: string
  npmScope: string
  skipAdminCrud: boolean
  skipDataAccess: boolean
  skipFeature: boolean
  skipSdk: boolean
  skipUtil: boolean
}
