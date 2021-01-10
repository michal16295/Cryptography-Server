const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.post("/sendMsg", controller.sendMsg);
router.get("/getMessages", controller.getMessages);
module.exports = router;
