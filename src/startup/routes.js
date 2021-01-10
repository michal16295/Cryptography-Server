const auth = require("../auth/route");
const message = require("../message/route");
// This configs all routes
module.exports = function (app) {
  // All the APIs will go here
  app.use("/auth", auth);
  app.use("/chat", message);
  app.use((req, res, next) => {
    res.status(404).send({ error: "Not found", data: null });
  });
};
