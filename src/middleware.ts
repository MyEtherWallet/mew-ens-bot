class Middleware {
  middlewares: typeMiddlewareFunc[];
  constructor() {
    this.middlewares = [];
  }
  use(fn: typeMiddlewareFunc): void {
    this.middlewares.push(fn);
  }
  executeMiddleware(tweet: TwitStatus, reject: typeReject, resolve: any): void {
    this.middlewares.reduceRight(
      (resolve, next) => () => next(tweet, reject, resolve),
      resolve
    )(tweet, reject);
  }
  run(tweet: TwitStatus): Promise<String> {
    return new Promise((resolve, reject) => {
      this.executeMiddleware(tweet, reject, resolve);
    });
  }
}
export default Middleware;
