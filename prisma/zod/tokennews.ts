import * as z from "zod"
import { CompleteToken, RelatedTokenModel, CompleteNews, RelatedNewsModel } from "./index"

export const TokenNewsModel = z.object({
  id: z.string(),
  tokenId: z.string(),
  newsId: z.string(),
})

export interface CompleteTokenNews extends z.infer<typeof TokenNewsModel> {
  token: CompleteToken
  news: CompleteNews
}

/**
 * RelatedTokenNewsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTokenNewsModel: z.ZodSchema<CompleteTokenNews> = z.lazy(() => TokenNewsModel.extend({
  token: RelatedTokenModel,
  news: RelatedNewsModel,
}))
