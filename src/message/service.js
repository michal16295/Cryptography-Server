const msgModel = require("./model");
const logger = require("../common/logger")(__filename);
const {
  responseSuccess,
  responseError,
  SERVER_ERROR,
} = require("../common/response");

module.exports.sendMsg = async (msg) => {
  logger.info(`encrypted message: ${msg.text}`);
  let response;
  try {
    let message = await msgModel.create(msg);
    if (!message) {
      logger.error("Error creating the message");
      return responseError(500, "Error creating the message");
    }
    response = message;
  } catch (e) {
    logger.error(e.message);
    return responseError(500, SERVER_ERROR);
  }
  return responseSuccess(response);
};
module.exports.getMessages = async () => {
  logger.info(`get messages`);
  let response;
  try {
    const messages = await msgModel.find();
    logger.info(`encrypted messages: ${messages}`);
    response = messages;
  } catch (e) {
    logger.error(e.message);
    return responseError(500, SERVER_ERROR);
  }
  return responseSuccess(response);
};
