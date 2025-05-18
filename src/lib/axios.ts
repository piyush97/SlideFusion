import axios from "axios";

export const lemonSqueezyClient = (lemonSqeezyApiKey?: string) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_API_URL,
    headers: {
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${
        lemonSqeezyApiKey
          ? lemonSqeezyApiKey
          : process.env.LEMON_SQUEEZY_API_KEY
      }`,
    },
  });
};
