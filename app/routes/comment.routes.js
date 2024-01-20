module.exports = (app) => {
  const comment = require("../controllers/comment.controller");

  var router = require("express").Router();

  router.post("/", comment.create);

  router.get("/", comment.findAll);

  router.get("/:id", comment.findOne);

  router.put("/:id", comment.update);

  router.delete("/:id", comment.delete);

  app.use("/api/comment", router);
};
