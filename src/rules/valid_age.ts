import configs from "../configs";
import messages from "../messages";
export default async (
  tweet: TwitStatus,
  reject: typeReject,
  resolve: typeCallback
) => {
  const accountDate = new Date(tweet.user.created_at);
  if (
    accountDate.getTime() + configs.Rules.min_account_age <
    new Date().getTime()
  ) {
    return resolve();
  }
  reject(new Error(messages.ERRORS.too_new));
};
