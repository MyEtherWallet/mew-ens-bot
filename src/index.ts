import Twitter from "./Twitter";

// const stream = Twitter.stream("statuses/filter", {
//   track: ["katyperry"]
// });
// stream.on("tweet", tweet => {
//   if (
//     tweet.in_reply_to_screen_name === "katyperry" ||
//     tweet.in_reply_to_screen_name === "KatyActivity"
//   ) {
//     console.log(
//       tweet.user.screen_name,
//       tweet.text,
//       tweet.entities.user_mentions,
//       tweet.retweeted
//     );
//   }
// });
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
