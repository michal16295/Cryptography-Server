const msgService = require("./service");
const logger = require("../common/logger")(__filename);

module.exports.sendMsg = async (req, res, next) => {
  logger.info("send message");
  const data = req.body;
  let response = await msgService.sendMsg(data);
  res.status(response.status).send(response.data);
};
module.exports.getMessages = async (req, res, next) => {
  logger.info("get messages");
  let response = await msgService.getMessages();
  res.status(response.status).send(response.data);
};
