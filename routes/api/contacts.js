const express = require("express");

const { ctrlWrapper, validation } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");
const { schemas } = require("../../models");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.contactCreate), ctrlWrapper(ctrl.add));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

router.put(
  "/:id",
  validation(schemas.contactUpdate),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  validation(schemas.statusUpdate),
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;
