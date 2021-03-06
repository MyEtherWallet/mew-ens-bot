import configs from "../configs";
import messages from "../messages";
export default async (
  tweet: TwitStatus,
  reject: typeReject,
  resolve: typeCallback
) => {
  if (
    tweet.entities.user_mentions.length === 1 &&
    configs.Rules.reply_to.includes(tweet.in_reply_to_screen_name || "")
  ) {
    return resolve();
  }
  if (configs.Rules.reply_to.includes(tweet.in_reply_to_screen_name || "")) {
    reject(new Error(messages.ERRORS.not_valid));
  }
  reject(new Error(messages.ERRORS.not_applicable));
};
