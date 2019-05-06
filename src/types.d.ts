import * as Twitter from "twit";
declare global {
  type TwitStatus = Twitter.Twitter.Status;

  type typeMiddlewareFunc = (
    tweet: Twitter.Twitter.Status,
    reject: typeReject,
    resolve: typeCallback
  ) => void;

  type typeCallback = () => void;

  type typeReject = (err: Error) => void;
}
