import { z } from "zod";

/**
 * Specify your server-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars.
 */
const server = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  DATABASE_URL: z.string().url(),
  BANANA_API_KEY: z.string().min(1),
  BANANA_MODEL_KEY: z.string().min(1),
  CRYPTOPANIC_API_KEY: z.string().min(1),
  ROTATING_PROXY_HOST: z.string().min(1),
  ROTATING_PROXY_PORT: z.string().min(1),
  ROTATING_PROXY_USER: z.string().min(1),
  ROTATING_PROXY_PASSWORD: z.string().min(1),
  LINK_PREVIEW_API_KEY: z.string().min(1),
  PROXY_API_KEY: z.string().min(1),
});

/**
 * Specify your client-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars. To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
const client = z.object({
  NEXT_PUBLIC_ALCHEMY_API_KEY: z.string().min(1),
  NEXT_PUBLIC_HiIQ_CONTRACT_ADDRESS: z.string().startsWith("0x").length(42),
  NEXT_PUBLIC_NODE_ENV: z.enum(["development", "test", "production"]),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
 * middlewares) or client-side so we need to destruct manually.
 *
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
  // CLIENT-SIDE ================
  NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
  NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  NEXT_PUBLIC_HiIQ_CONTRACT_ADDRESS:
    process.env.NEXT_PUBLIC_HiIQ_CONTRACT_ADDRESS,

  // SERVER-SIDE ================
  NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  BANANA_API_KEY: process.env.BANANA_API_KEY,
  BANANA_MODEL_KEY: process.env.BANANA_MODEL_KEY,
  CRYPTOPANIC_API_KEY: process.env.CRYPTOPANIC_API_KEY,
  ROTATING_PROXY_HOST: process.env.ROTATING_PROXY_HOST,
  ROTATING_PROXY_PORT: process.env.ROTATING_PROXY_PORT,
  ROTATING_PROXY_USER: process.env.ROTATING_PROXY_USER,
  ROTATING_PROXY_PASSWORD: process.env.ROTATING_PROXY_PASSWORD,
  PROXY_API_KEY: process.env.PROXY_API_KEY,
  LINK_PREVIEW_API_KEY: process.env.LINK_PREVIEW_API_KEY,
};

// --------------------------
// Don't touch the part below
// --------------------------

const merged = server.merge(client);

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ (process.env);

if (!!process.env.SKIP_ENV_VALIDATION == false) {
  const isServer = typeof window === "undefined";

  const parsed = /** @type {MergedSafeParseReturn} */ (
    isServer
      ? merged.safeParse(processEnv) // on server we can validate all env vars
      : client.safeParse(processEnv) // on client we can only validate the ones that are exposed
  );

  if (parsed.success === false) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors
    );
    throw new Error("Invalid environment variables");
  }

  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== "string") return undefined;
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
        throw new Error(
          process.env.NODE_ENV === "production"
            ? "❌ Attempted to access a server-side environment variable on the client"
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`
        );
      return target[/** @type {keyof typeof target} */ (prop)];
    },
  });
}

export { env };
