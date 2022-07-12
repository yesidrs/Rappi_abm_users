module.exports = (app) => {
  const users = require("../controllers/users.controller.js");

  let router = require("express").Router();

  router.post("/add", users.create);
  router.get("/add", (req, res) => {
    res.render("add");
  });

  router.get("/", users.findAll);

  router.get("/edit/:id", users.findOne);
  router.post("/edit/:id", users.update);
  // router.put("/edit/:id", users.update);

  router.get("/delete/:id", users.delete);
  // router.delete("/delete/:id", users.delete);

  app.use(router);
};
