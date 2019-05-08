const uts46 = require("idna-uts46");
const web3 = require("web3");
import messages from "../messages";

const normalise = (str: string) => {
  return uts46.toUnicode(str, {
    useStd3ASCII: true,
    transitional: false
  });
};

const isAddress = (address: string) => {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return false;
  }
  if (
    /^(0x|0X)?[0-9a-f]{40}$/.test(address) ||
    /^(0x|0X)?[0-9A-F]{40}$/.test(address)
  ) {
    return true;
  }
  return web3.utils.checkAddressChecksum(address);
};
const parseTweet = (tweet: string | undefined) => {
  const items = tweet
    ? tweet.split(/(\s+)/).filter(e => {
        return e.trim().length > 0;
      })
    : [];
  if (items.length !== 3) {
    throw new Error(messages.ERRORS.not_valid);
  }
  if (!isAddress(items[1])) {
    throw new Error(messages.ERRORS.invalid_address);
  }
  let normalised = "";
  try {
    normalised = normalise(items[2]);
  } catch (e) {
    throw new Error(messages.ERRORS.not_valid);
  }
  const names = normalised.split(".");
  const owner = items[1];
  const rootName = names
    .reverse()
    .splice(0, 2)
    .reverse()
    .join(".");
  const subName = names[0];
  const labelHash = web3.utils.sha3(rootName.split(".")[0]);
  return {
    rootName,
    subName,
    labelHash,
    owner,
    fullName: normalised
  };
};

export { normalise, isAddress, parseTweet };
