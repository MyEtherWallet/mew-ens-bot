import configs from "../configs";
import messages from "../messages";
import { parseTweet } from "../helpers";
import subdomainRegistrar from "../subdomainRegistrar";

export default async (
  tweet: TwitStatus,
  reject: typeReject,
  resolve: typeCallback
) => {
  try {
    const parsed = parseTweet(tweet.text);
    if (!configs.Rules.valid_subdomains.includes(parsed.rootName)) {
      return reject(new Error(messages.ERRORS.invalid_name));
    }
    const status = await subdomainRegistrar.methods
      .query(parsed.labelHash, parsed.subName)
      .call();
    if (status.domain === "") {
      return reject(new Error(messages.ERRORS.name_not_available));
    }
    resolve();
  } catch (e) {
    return reject(new Error(messages.ERRORS.invalid_name));
  }
};
