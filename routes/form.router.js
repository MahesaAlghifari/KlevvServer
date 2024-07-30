const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const formController = require('../controllers/formController');

// Setup Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes with file upload handling
router.get("/", formController.getAll);
router.post("/", formController.getAll);
router.get("/:id", formController.getById);
router.post("/", upload.single('invoice'), formController.create); // Handle file upload
router.put("/:id", upload.single('invoice'), formController.updateById); // Handle file upload
router.delete("/:id", formController.deleteById);

module.exports = router;
