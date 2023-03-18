import * as z from "zod"
<<<<<<< HEAD
import { CompleteNews, RelatedNewsModel, CompleteUser, RelatedUserModel, CompleteTokenNews, RelatedTokenNewsModel, CompleteStatistics, RelatedStatisticsModel } from "./index"
=======
import { CompleteNews, RelatedNewsModel, CompleteUser, RelatedUserModel, CompleteTokenNews, RelatedTokenNewsModel, CompleteStatistics, RelatedStatisticsModel, CompleteTokenUser, RelatedTokenUserModel } from "./index"
>>>>>>> 62de6b904e7a7cf4acc7703d3e6986af3043bf1b

export const TokenModel = z.object({
  id: z.string(),
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
  TokenNews: CompleteTokenNews[]
  Statistics?: CompleteStatistics | null
<<<<<<< HEAD
=======
  TokenUser: CompleteTokenUser[]
>>>>>>> 62de6b904e7a7cf4acc7703d3e6986af3043bf1b
}

/**
 * RelatedTokenModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTokenModel: z.ZodSchema<CompleteToken> = z.lazy(() => TokenModel.extend({
  news: RelatedNewsModel.array(),
  users: RelatedUserModel.array(),
  TokenNews: RelatedTokenNewsModel.array(),
  Statistics: RelatedStatisticsModel.nullish(),
<<<<<<< HEAD
=======
  TokenUser: RelatedTokenUserModel.array(),
>>>>>>> 62de6b904e7a7cf4acc7703d3e6986af3043bf1b
}))
