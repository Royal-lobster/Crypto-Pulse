import * as z from "zod"
import { CompleteNews, RelatedNewsModel, CompleteUser, RelatedUserModel, CompleteStatistics, RelatedStatisticsModel } from "./index"

export const TokenModel = z.object({
  id: z.string(),
  name: z.string(),
  ticker: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  image: z.string(),
  statisticsId: z.string().nullish(),
  lastRefresh: z.date().nullish(),
})

export interface CompleteToken extends z.infer<typeof TokenModel> {
  news: CompleteNews[]
  users: CompleteUser[]
  Statistics?: CompleteStatistics | null
}

/**
 * RelatedTokenModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTokenModel: z.ZodSchema<CompleteToken> = z.lazy(() => TokenModel.extend({
  news: RelatedNewsModel.array(),
  users: RelatedUserModel.array(),
  Statistics: RelatedStatisticsModel.nullish(),
}))
