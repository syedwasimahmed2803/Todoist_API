module.exports = (app) => {
  const label = require("../controllers/label.controller");

  var router = require("express").Router();

  router.post("/", label.create);

  router.get("/", label.findAll);

  router.get("/:id", label.findOne);

  router.put("/:id", label.update);

  router.delete("/:id", label.delete);

  app.use("/api/label", router);
};
