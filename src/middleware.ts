class Middleware {
  middlewares: typeMiddlewareFunc[];
  constructor() {
    this.middlewares = [];
  }
  use(fn: typeMiddlewareFunc) {
    this.middlewares.push(fn);
  }
  executeMiddleware(
    tweet: TwitStatus,
    res: (res: typeResponse) => void,
    done: () => void
  ): void {
    this.middlewares.reduceRight(
      (done, next) => () => next(tweet, res, done),
      done
    )(tweet, res);
  }
  run(tweet: TwitStatus, res: (res: typeResponse) => void): Promise<String> {
    return new Promise(resolve => {
      this.executeMiddleware(tweet, res, resolve);
    });
  }
}
export default Middleware;
