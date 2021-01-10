const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.post("/exchangeKeys", controller.exchangeKeys);
router.post("/setPass", controller.setPass);
module.exports = router;
