const { Router } = require("express");

module.exports = function (Controller, options) {
  const router = Router();

  router.post("/", Controller.post);
  router.get("/", Controller.getAll);
  router.get("/:transactionId", Controller.getTransactionByTransactionId);
  router.get("/:id", Controller.get);
  router.post("/:id/operation/pay", Controller.postPSP);
  router.post("/:id/operation/cancel", Controller.cancel);
  router.post("/:id/operation/refund", Controller.refund);
  router.get('/:merchantId/stats', Controller.getKPIsForMerchant);

  return router;
};