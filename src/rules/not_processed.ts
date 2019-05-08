import db from "../db";
import messages from "../messages";
export default async (
  tweet: TwitStatus,
  reject: typeReject,
  resolve: typeCallback
) => {
  const isProcessed = await db.isProcessed(tweet.id);
  if (!isProcessed) {
    return resolve();
  }
  reject(new Error(messages.ERRORS.already_processed));
};
