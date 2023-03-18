import * as z from "zod"
import { CompleteToken, RelatedTokenModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  hiIQ: z.number(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  tokens: CompleteToken[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  tokens: RelatedTokenModel.array(),
}))
