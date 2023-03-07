import * as z from "zod"
import { CompleteToken, RelatedTokenModel } from "./index"

export const NewsModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  title: z.string(),
  content: z.string(),
  image: z.string(),
  category: z.string(),
  tokenId: z.string(),
})

export interface CompleteNews extends z.infer<typeof NewsModel> {
  Token: CompleteToken
}

/**
 * RelatedNewsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedNewsModel: z.ZodSchema<CompleteNews> = z.lazy(() => NewsModel.extend({
  Token: RelatedTokenModel,
}))
