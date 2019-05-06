import configs from "../configs";
import messages from "../messages";
export default async (
  tweet: TwitStatus,
  reject: typeReject,
  resolve: typeCallback
) => {
  if (!tweet.retweeted) {
    return resolve();
  }
  reject(new Error(messages.ERRORS.not_applicable));
};
