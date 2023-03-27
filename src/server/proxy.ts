import { env } from "~/env.mjs";

export const proxy = {
  host: env.ROTATING_PROXY_HOST,
  port: Number(env.ROTATING_PROXY_PORT),
  auth: {
    username: env.ROTATING_PROXY_USER,
    password: env.ROTATING_PROXY_PASSWORD,
  },
  protocol: "http",
};
