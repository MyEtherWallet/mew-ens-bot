import * as Twitter from "twit";
import configs from "./configs";
const client = new Twitter(configs.TwitterAuth);
export default client;
