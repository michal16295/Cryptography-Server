class ServerKeys {
  keys = {};

  static setKeys(keys) {
    this.keys = keys;
  }
  static getKeys() {
    return this.keys;
  }
}
module.exports = ServerKeys;
