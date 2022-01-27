const express = require("express");

const { ctrlWrapper, validation, authenticate } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");
const { schemas } = require("../../models");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:id", authenticate, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validation(schemas.contactCreate),
  ctrlWrapper(ctrl.add)
);

router.delete("/:id", authenticate, ctrlWrapper(ctrl.removeById));

router.put(
  "/:id",
  authenticate,
  validation(schemas.contactUpdate),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  authenticate,
  validation(schemas.statusUpdate),
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;
