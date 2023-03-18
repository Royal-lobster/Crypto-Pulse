import * as z from "zod"
import { CompleteToken, RelatedTokenModel, CompleteUser, RelatedUserModel } from "./index"

export const TokenUserModel = z.object({
  id: z.string(),
  tokenId: z.string(),
  userId: z.string(),
})

export interface CompleteTokenUser extends z.infer<typeof TokenUserModel> {
  token: CompleteToken
  user: CompleteUser
}

/**
 * RelatedTokenUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTokenUserModel: z.ZodSchema<CompleteTokenUser> = z.lazy(() => TokenUserModel.extend({
  token: RelatedTokenModel,
  user: RelatedUserModel,
}))
