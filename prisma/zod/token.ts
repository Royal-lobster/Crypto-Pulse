import * as z from "zod"
import { CompleteNews, RelatedNewsModel, CompleteStatistics, RelatedStatisticsModel, CompleteUser, RelatedUserModel, CompleteTokenNews, RelatedTokenNewsModel } from "./index"

export const TokenModel = z.object({
  id: z.string(),
  ticker: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  image: z.string(),
})

export interface CompleteToken extends z.infer<typeof TokenModel> {
  news: CompleteNews[]
  statistics: CompleteStatistics[]
  users: CompleteUser[]
  TokenNews: CompleteTokenNews[]
}

/**
 * RelatedTokenModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTokenModel: z.ZodSchema<CompleteToken> = z.lazy(() => TokenModel.extend({
  news: RelatedNewsModel.array(),
  statistics: RelatedStatisticsModel.array(),
  users: RelatedUserModel.array(),
  TokenNews: RelatedTokenNewsModel.array(),
}))
