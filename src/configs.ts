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
    min_followers: 50,
    min_account_age: 60 * 60 * 24 * 182.625, // 6 months
    reply_to: ["mewensbot"],
    max_names_per_account: 3,
    valid_subdomains: ["etherbase.eth", "wantsome.eth", "gimmethe.eth"]
  },
  DB: {
    path: "ens-bot.json"
  },
  Registrar: {
    address: "0xe65d8AAF34CB91087D1598e0A15B582F57F217d9",
    resolver: "0xDaaF96c344f63131acadD0Ea35170E7892d3dfBA",
    referrer: "0xDECAF9CD2367cdbb726E904cD6397eDFcAe6068D"
  },
  Node: {
    host: "https://api.myetherwallet.com/eth",
    chainID: 1
  },
  Wallet: {
    PRIV_KEY: process.env.WALLET_PRIV_KEY || "",
    ADDRESS: process.env.WALLET_ADDRESS || "",
    GAS_PRICE: "0x012a05f200",
    GAS_LIMIT: "0x030d40"
  }
};
