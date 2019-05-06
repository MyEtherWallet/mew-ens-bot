import * as Twitter from "twit";
declare global {
  type TwitStatus = Twitter.Twitter.Status;

  type typeMiddlewareFunc = (
    tweet: Twitter.Twitter.Status,
    res: Function,
    next?: Function
  ) => void;

  type typeResponse = (error: Error, msg?: String) => void;

  type typeCallback = () => void;
}
