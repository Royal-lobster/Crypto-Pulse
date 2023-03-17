import * as z from "zod"
import { CompleteToken, RelatedTokenModel } from "./index"

export const StatisticsModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  dayLowestPrice: z.number(),
  dayHighestPrice: z.number(),
  dayVolume: z.number(),
  tokenId: z.string(),
})

export interface CompleteStatistics extends z.infer<typeof StatisticsModel> {
  Token?: CompleteToken | null
}

/**
 * RelatedStatisticsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedStatisticsModel: z.ZodSchema<CompleteStatistics> = z.lazy(() => StatisticsModel.extend({
  Token: RelatedTokenModel.nullish(),
}))
