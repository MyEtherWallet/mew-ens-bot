import configs from "../configs";
import messages from "../messages";
export default async (
  tweet: TwitStatus,
  res: typeResponse,
  next: typeCallback
) => {
  if (
    tweet.entities.user_mentions.length === 1 &&
    configs.Rules.reply_to.includes(tweet.in_reply_to_screen_name || "")
  ) {
    return next();
  }
  if (configs.Rules.reply_to.includes(tweet.in_reply_to_screen_name || "")) {
    return res(new Error(messages.ERRORS.not_valid));
  }
  res(new Error(messages.ERRORS.not_applicable));
};
