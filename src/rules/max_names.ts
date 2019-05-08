import configs from "../configs";
import db from "../db";
import messages from "../messages";
export default async (
  tweet: TwitStatus,
  reject: typeReject,
  resolve: typeCallback
) => {
  const count = await db.getCount(tweet.user.id);
  if (count < configs.Rules.max_names_per_account) {
    resolve();
  }
  reject(new Error(messages.ERRORS.too_many_registrations));
};
