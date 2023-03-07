import * as z from "zod"
import { CompleteNews, RelatedNewsModel, CompleteStatistics, RelatedStatisticsModel, CompleteUser, RelatedUserModel } from "./index"

export const TokenModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string().nullish(),
})

export interface CompleteToken extends z.infer<typeof TokenModel> {
  news: CompleteNews[]
  statistics: CompleteStatistics[]
  User?: CompleteUser | null
}

/**
 * RelatedTokenModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTokenModel: z.ZodSchema<CompleteToken> = z.lazy(() => TokenModel.extend({
  news: RelatedNewsModel.array(),
  statistics: RelatedStatisticsModel.array(),
  User: RelatedUserModel.nullish(),
}))
