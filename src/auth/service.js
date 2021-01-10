const RSA = require("../security/rsa");
const ServerKeys = require("../security/keys");
const keyModel = require("./model");
const Cryptr = require("cryptr");
const logger = require("../common/logger")(__filename);
const {
  responseSuccess,
  responseError,
  SERVER_ERROR,
} = require("../common/response");

module.exports.exchangeKeys = async (clientKey) => {
  logger.info(`exchangeKeys service`);
  let response;
  try {
    RSA.setClientPublicKey(clientKey);
    const keys = RSA.generate(250);
    ServerKeys.setKeys(keys);
    console.log(ServerKeys.getKeys());
    response = {
      publicKey: keys.pubKey,
      publicExp: keys.pubExp,
    };
  } catch (e) {
    logger.error(e.message);
    return responseError(500, SERVER_ERROR);
  }
  return responseSuccess(response);
};

module.exports.setPass = async (data) => {
  const { encryptedPass } = data;
  logger.info(`encrypted password: ${encryptedPass}`);
  let response;
  try {
    const serverKeys = ServerKeys.getKeys();
    const decryptedPass = RSA.decryptMessage(
      encryptedPass,
      serverKeys.priKey,
      serverKeys.pubKey
    );
    logger.info(`decrypted password: ${decryptedPass}`);
    const cryptr = new Cryptr(decryptedPass);
    let encryptedKey = await keyModel.findById("5ff89b5818dd880b70947850");
    encryptedKey = encryptedKey.key;
    const decryptedKey = cryptr.decrypt(encryptedKey);
    logger.info(`decrypted key: ${decryptedKey}`);
    const clientKeys = RSA.getClientPublicKey();
    const rsaEncryptedKey = RSA.encryptMessage(
      decryptedKey,
      clientKeys.pubKey,
      clientKeys.pubExp
    );
    logger.info(`rsa Encrypted Key: ${rsaEncryptedKey}`);
    response = JSON.stringify(rsaEncryptedKey);
  } catch (e) {
    logger.error(e.message);
    return responseError(500, "Not Authorize!");
  }
  return responseSuccess(response);
};
