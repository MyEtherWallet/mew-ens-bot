import Twitter from "./Twitter";
import configs from "./configs";
import middleware from "./middleware";
import { valid_age, valid_followers, valid_reply, not_retweet } from "./rules";

const stream = Twitter.stream("statuses/filter", {
  track: configs.Rules.reply_to
});
stream.on("tweet", tweet => {
  const processTweet = new middleware();
  processTweet.use(valid_reply);
  processTweet.use(valid_followers);
  processTweet.use(valid_age);
  processTweet.use(not_retweet);
  processTweet
    .run(tweet)
    .then(() => {
      console.log(tweet.text, "Processed");
    })
    .catch(e => {
      console.error(e.message);
    });
});
// function tweeter() {
//   const tweet = `Here's a random number between 0 and 100: ${Math.floor(
//     Math.random() * 100
//   )}`;
//   Twitter.post("statuses/update", { status: tweet }, tweeted);
//   function tweeted(err: Error, data: any) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(`Success: ${data.text}`);
//     }
//   }
// }

// // tweeter();
