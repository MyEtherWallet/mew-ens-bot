import Twitter from "./Twitter";
import configs from "./configs";
import middleware from "./middleware";
import { parseTweet } from "./helpers";
import subdomainRegistrar from "./subdomainRegistrar";
import db from "./db";
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

const stream = Twitter.stream("statuses/filter", {
  track: configs.Rules.reply_to
});
function postTweet(tweet: string, replyId: string | undefined) {
  const objtweet = {
    status: tweet,
    in_reply_to_status_id: replyId ? replyId : null
  };
  Twitter.post("statuses/update", objtweet, (err, data) => {
    if (err) console.error(err);
    else console.log(tweet, "tweeted");
  });
}
stream.on("tweet", tweet => {
  if (configs.Rules.reply_to.includes(tweet.user.screen_name)) {
    return;
  }
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
      let nonce = await db.getNonce();
      if (!nonce) {
        nonce = await subdomainRegistrar.web3.eth.getTransactionCount(
          configs.Wallet.ADDRESS
        );
        await db.setNonce(nonce);
      }
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
        .on("transactionHash", async (hash: string) => {
          await db.increaseNonce();
          console.log(hash);
          postTweet(
            `Hey @${tweet.user.screen_name}! ${
              parsed.fullName
            } successfully registered for ${
              parsed.owner
            } https://etherscan.io/tx/${hash} Powered by @myetherwallet`,
            tweet.id_str
          );
          await db.increaseCount(tweet.user.id);
          await db.setProcessed(tweet.id, true);
        });
    })
    .catch(async e => {
      postTweet(
        `oopsie daisy, @${tweet.user.screen_name} Something went wrong :( (${
          e.message
        })`,
        tweet.id_str
      );
      await db.setProcessed(tweet.id, true);
      console.error(e.message);
    });
});
