import { config } from "dotenv";
config();

export default {
  TwitterAuth: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY || "",
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET || "",
    access_token: process.env.TWITTER_ACCESS_TOKEN || "",
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || ""
  },
  Rules: {
    min_followers: 0,
    min_account_age: 0, // 60 * 60 * 24 * 365.25, // 1 year
    reply_to: ["mewensbot"],
    max_names_per_account: 5,
    valid_subdomains: ["etherbase.eth", "wantsome.eth"]
  },
  DB: {
    path: "ens-bot.json"
  },
  Registrar: {
    address: "0xc32659651d137a18b79925449722855aa327231d"
  },
  Node: "https://api.myetherwallet.com/eth"
};
