const uts46 = require("idna-uts46");
const web3 = require("web3");

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
const parseName = (name: string) => {
  const normalised = normalise(name);
  const names = normalised.split(".");
  if (names.length !== 3) throw new Error("invalid subdomain");
  const rootName = names
    .reverse()
    .splice(0, 2)
    .reverse()
    .join(".");
  const subName = names[0];
  const labelHash = web3.utils.sha3(subName);
  return {
    rootName,
    subName,
    labelHash
  };
};

export { normalise, isAddress, parseName };
