import configs from "../configs";
import messages from "../messages";
export default async (
  tweet: TwitStatus,
  res: typeResponse,
  next: typeCallback
) => {
  if (tweet.user.followers_count >= configs.Rules.min_followers) {
    return next();
  }
  return res(new Error(messages.ERRORS.not_enough_followers));
};
