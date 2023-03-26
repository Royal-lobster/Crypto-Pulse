import axios from "axios";
import { type ProxyListResponse } from "types/proxyList";
import { env } from "~/env.mjs";

export const getProxy = async () => {
  const url = new URL("https://proxy.webshare.io/api/v2/proxy/list/");
  url.searchParams.append("mode", "direct");
  url.searchParams.append("page", "1");
  url.searchParams.append("page_size", "25");

  const { data } = await axios.get<ProxyListResponse>(url.toString(), {
    headers: {
      Authorization: env.PROXY_API_KEY,
    },
  });

  const proxy = data.results[Math.floor(Math.random() * data.results.length)];

  console.log(
    `🛞 Using Proxy ${proxy?.proxy_address || env.ROTATING_PROXY_HOST}`
  );

  return {
    host: proxy?.proxy_address || env.ROTATING_PROXY_HOST,
    port: proxy?.port || Number(env.ROTATING_PROXY_PORT),
    auth: {
      username: env.ROTATING_PROXY_USER,
      password: env.ROTATING_PROXY_PASSWORD,
    },
    protocol: "http",
  };
};
