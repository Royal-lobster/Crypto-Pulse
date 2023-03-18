import * as z from "zod"
import { CompleteToken, RelatedTokenModel, CompleteTokenNews, RelatedTokenNewsModel } from "./index"

export const NewsModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  title: z.string(),
  rawContent: z.string().nullish(),
  description: z.string().nullish(),
  content: z.string().nullish(),
  image: z.string().nullish(),
  tokenId: z.string(),
})

export interface CompleteNews extends z.infer<typeof NewsModel> {
  tokens: CompleteToken
  TokenNews: CompleteTokenNews[]
}

/**
 * RelatedNewsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedNewsModel: z.ZodSchema<CompleteNews> = z.lazy(() => NewsModel.extend({
  tokens: RelatedTokenModel,
  TokenNews: RelatedTokenNewsModel.array(),
}))
