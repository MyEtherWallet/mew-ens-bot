import Twitter from "./Twitter";
import configs from "./configs";
import middleware from "./middleware";
import { parseTweet } from "./helpers";
import subdomainRegistrar from "./subdomainRegistrar";
const ethTx = require("ethereumjs-tx");
import {
  valid_age,
  valid_followers,
  valid_reply,
  not_retweet,
  max_names,
  not_processed,
  name_available
} from "./rules";
import { config } from "dotenv";

const stream = Twitter.stream("statuses/filter", {
  track: configs.Rules.reply_to
});
function postTweet(tweet: string, reply_id: string | undefined) {
  const objtweet = {
    status: tweet,
    in_reply_to_status_id: reply_id ? reply_id : null
  };
  Twitter.post("statuses/update", objtweet, (err, data) => {
    if (err) console.error(err);
    else console.log(tweet, "tweeted");
  });
}
stream.on("tweet", tweet => {
  const processTweet = new middleware();
  processTweet.use(valid_reply);
  processTweet.use(valid_followers);
  processTweet.use(valid_age);
  processTweet.use(not_retweet);
  processTweet.use(not_processed);
  processTweet.use(max_names);
  processTweet.use(name_available);
  processTweet
    .run(tweet)
    .then(async () => {
      const parsed = parseTweet(tweet.text);
      console.log(parsed);
      const nonce = await subdomainRegistrar.web3.eth.getTransactionCount(
        configs.Wallet.ADDRESS
      );
      const data = subdomainRegistrar.methods
        .register(
          parsed.labelHash,
          parsed.subName,
          parsed.owner,
          configs.Registrar.referrer,
          configs.Registrar.resolver
        )
        .encodeABI();
      const txParams = {
        nonce,
        data,
        gasPrice: configs.Wallet.GAS_PRICE,
        gasLimit: configs.Wallet.GAS_LIMIT,
        to: configs.Registrar.address,
        value: "0x00",
        chainId: configs.Node.chainID
      };
      const tx = new ethTx(txParams);
      tx.sign(new Buffer(configs.Wallet.PRIV_KEY.replace("0x", ""), "hex"));
      subdomainRegistrar.web3.eth
        .sendSignedTransaction(`0x${tx.serialize().toString("hex")}`)
        .on("transactionHash", (hash: string) => {
          console.log(hash);
          postTweet(
            `Hey @${tweet.user.screen_name}! ${
              parsed.fullName
            } successfully registered for ${
              parsed.owner
            } https://etherscan.io/tx/${hash}`,
            tweet.id_str
          );
        });
    })
    .catch(e => {
      console.error(e.message);
    });
});
