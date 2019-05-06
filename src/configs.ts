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
    min_followers: 200,
    min_account_age: 60 * 60 * 24 * 365.25, //1 year
    reply_to: ["myetherwallet, mewensbot", "ensdomains"]
  }
};
