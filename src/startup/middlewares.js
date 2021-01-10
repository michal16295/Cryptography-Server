const morgan = require("morgan");
const logger = require("../common/logger");
const cors = require("cors");
const express = require("express");

// This will configure all middlewares
module.exports.configure = (app) => {
  app.use(cors());
  app.use(morgan("tiny", { stream: logger.stream }));
  app.use(express.json());
};
