import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import configs from "./configs";
import * as crypto from "crypto";
const adapter = new FileSync(configs.DB.path);
const db = lowdb(adapter);
db.defaults({ nameCount: {}, processed: {}, nonce: 0 }).write();

const getHash = (value: Number) => {
  return crypto
    .createHash("sha256")
    .update(value.toString())
    .digest("hex");
};
export default {
  async increaseCount(id: Number) {
    const idHash = getHash(id);
    return db
      .update(`nameCount.${idHash}`, n => {
        if (n) return n + 1;
        return 1;
      })
      .write();
  },
  async getCount(id: Number) {
    const idHash = getHash(id);
    const count = db.get(`nameCount.${idHash}`).value();
    if (typeof count !== "undefined") return count;
    return 0;
  },
  async getNonce() {
    return db.get("nonce").value();
  },
  async setNonce(nonce: Number) {
    return db.set("nonce", nonce).write();
  },
  async increaseNonce() {
    return db
      .update("nonce", n => {
        if (n) return n + 1;
        return 1;
      })
      .write();
  },
  async isProcessed(id: Number) {
    const idHash = getHash(id);
    const isProcessed = db.get(`processed.${idHash}`).value();
    if (typeof isProcessed === "undefined") return false;
    return isProcessed;
  },
  async setProcessed(id: Number, value: boolean) {
    const idHash = getHash(id);
    return db.set(`processed.${idHash}`, value).write();
  }
};
