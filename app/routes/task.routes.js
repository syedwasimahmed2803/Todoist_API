module.exports = (app) => {
  const task = require("../controllers/task.controller");

  var router = require("express").Router();

  router.get("/", task.findAll);

  router.get("/:id", task.findOne);

  router.post("/", task.create);

  router.put("/:id", task.update);

  router.put("/close/:id", task.close);

  router.delete("/:id", task.delete);

  app.use("/api/task", router);
};
