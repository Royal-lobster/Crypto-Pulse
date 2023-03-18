import axios, { type AxiosResponse } from "axios";
import { env } from "~/env.mjs";
import { type ResponseData as BananaResponseData } from "~/types/banana";

export const getBananaSummary = async (rawContent: string) => {
  console.time("⏱️ Summary generation");
  const AIRes: AxiosResponse<BananaResponseData> = await axios.post(
    "https://api.banana.dev/start/v4/",
    {
      apiKey: env.BANANA_API_KEY,
      modelKey: env.BANANA_MODEL_KEY,
      modelInputs: {
        prompt: rawContent,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.timeEnd("⏱️ Summary generation");

  const aiGeneratedContent =
    AIRes.data.modelOutputs &&
    AIRes.data.modelOutputs[0] &&
    AIRes.data.modelOutputs[0][0]?.summary_text;

  if (aiGeneratedContent)
    console.log("🪵 GOT AI CONTENT: ", aiGeneratedContent);
  else {
    console.log("❌ Failed to generate summary", AIRes.data);
  }

  return aiGeneratedContent;
};
