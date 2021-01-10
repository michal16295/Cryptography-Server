const authServices = require("./service");
const logger = require("../common/logger")(__filename);

module.exports.exchangeKeys = async (req, res, next) => {
  logger.info("exchangeKeys");
  const data = req.body;
  let response = await authServices.exchangeKeys(data);
  res.status(response.status).send(response.data);
};
module.exports.setPass = async (req, res, next) => {
  logger.info("set password");
  const data = req.body;
  let response = await authServices.setPass(data);
  res.status(response.status).send(response.data);
};
