const { Router } = require("express");

module.exports = function (Controller, options) {
  const router = Router();

  router.post("/", Controller.post);
  router.get("/", Controller.getAll);
  router.get("/:id", Controller.get);
  router.post("/:id/operation/pay", Controller.postPSP);
  return router;
};