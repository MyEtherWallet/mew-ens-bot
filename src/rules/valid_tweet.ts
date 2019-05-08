import configs from "../configs";
import messages from "../messages";
import { parseName, isAddress } from "../helpers";
import subdomainRegistrar from "../subdomainRegistrar";

export default async (
  tweet: TwitStatus,
  reject: typeReject,
  resolve: typeCallback
) => {
  const items = tweet.text
    ? tweet.text.split(/(\s+)/).filter(e => {
        return e.trim().length > 0;
      })
    : [];
  console.log("1", items);
  if (items.length !== 3) {
    return reject(new Error(messages.ERRORS.not_valid));
  }
  if (!isAddress(items[1])) {
    return reject(new Error(messages.ERRORS.invalid_address));
  }
  try {
    const parsed = parseName(items[2]);
    console.log("2", parsed);
    if (!configs.Rules.valid_subdomains.includes(parsed.rootName)) {
      return reject(new Error(messages.ERRORS.invalid_name));
    }
    const status = await subdomainRegistrar.methods
      .query(parsed.labelHash, parsed.subName)
      .call();
    console.log(status);
    if (status.domain === "") {
      return reject(new Error(messages.ERRORS.name_not_available));
    }
    resolve();
  } catch (e) {
    return reject(new Error(messages.ERRORS.invalid_name));
  }
};
