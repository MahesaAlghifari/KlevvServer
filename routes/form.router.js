const express = require("express");
const router = express.Router();

const formController = require('../controllers/form.Controller');

router.get("/", formController.getAll);
router.get("/:id", formController.getById);
router.post("/", formController.create);
router.put("/:id", formController.updateById);
router.delete("/:id", formController.deleteById);

module.exports = router;
